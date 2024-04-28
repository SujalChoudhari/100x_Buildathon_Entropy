"use client"

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloudIcon } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
// import KanbanBoard from '@/components/KanbanBoard'
import { ControlledBoard, moveCard, KanbanBoard, OnDragEndNotification, Card } from '@caldwell619/react-kanban'
import '@caldwell619/react-kanban/dist/styles.css' // import here for "builtin" styles
import { useRouter } from 'next/navigation';
import { Spotlight } from '@/components/ui/Spotlight';


type Pdf = {
    id: string;
    pdf: string;
    size: number;
}

function PDF() {

    const initial: KanbanBoard<Card> = {
        columns: [
            {
                id: 0,
                title: 'All Files',
                cards: [
                ]
            },
            {
                id: 1,
                title: 'Selected PDFs',
                cards: [
                ]
            },
            {
                id: 2,
                title: 'View Proposals',
                cards: [
                ]
            },
        ]
    }
    const [newPDFs, setNewPDFs] = useState<File[]>([]);
    const [board, setBoard] = useState<KanbanBoard<Card>>(initial);
    const [allPdfs, setAllPdfs] = useState<string[]>([]);
    const [selectedPdfs, setSelectedPdfs] = useState<string[]>([]);
    const router = useRouter();
    const [loadedHTML, setLoadedHTML] = useState<any>(undefined);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files); // Get the files from the input
            setNewPDFs((prevPDFs) => [...prevPDFs, ...files]); // Add to the existing File array
        }
    };

    const loadHTML = async (name: string) => {
        if (name == "") return;
        const res = await axios.get("http://localhost:8000/admin/get_html_from_file?file_name=" + name, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        })

        setLoadedHTML(res.data)
        console.log(res.data)
    }

    const handleCardMove: OnDragEndNotification<Card> = (_card, source, destination) => {
        if (source?.fromColumnId == destination?.toColumnId) {
            return;
        }
        if (destination?.toColumnId == 2) {
            if (_card.title?.endsWith("html")) {
                loadHTML(_card.title || "");
            }
            return
        }
        if (_card.title?.endsWith(".pdf") && (destination?.toColumnId == 0 || destination?.toColumnId == 1)) {
            setBoard((currentBoard) => {
                return moveCard(currentBoard, source, destination)
            })

        }
        else {
            alert(`Only PDF files are allowed to be selected. ${_card.title} is not a PDF file.`);
        }
    }


    const uploadToCloud = async () => {
        if (!newPDFs.length) {
            console.warn("No PDF files to upload.");
            return;
        }

        for (const pdfFile of newPDFs) {
            // Create form data for this single PDF file
            const formData = new FormData();
            formData.append("pdf_file", pdfFile, pdfFile.name); // Append the File object with the correct key and filename

            try {
                // Send a POST request for each file
                const response = await axios.post("http://localhost:8000/admin/upload_pdf", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Ensure a valid token
                    },
                });

                console.log("File uploaded successfully:", response.data);
                updateAllDocs();
            } catch (error: any) {
                console.error("Error uploading PDF:", error.response ? error.response.data : error.message); // Improved error handling
            }
        }
    };

    const updateSelectedOnCloud = async (selectedPdfs: string[]) => {
        try {
            console.log(selectedPdfs);
            const response = await axios.post("http://localhost:8000/admin/update_selected_docs", selectedPdfs, {
                headers: {
                    "Content-Type": "application/json", // Proper content type for JSON
                    "Accept": "application/json", // Accepting JSON response
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Ensure a valid token
                },
            });

            console.log("Documents updated successfully:", response.data);
        } catch (error: any) {
            console.error("Error updating selected documents:", error.response ? error.response.data : error.message);
        }
    }




    // const handleDelete = (pdfId: string) => {
    //     const updatedPdfs = newPDFs.filter((pdf) => pdf.id !== pdfId);
    //     setNewPDFs(updatedPdfs);
    // };


    const updateAllDocs = async () => {
        try {
            const response = await axios.get("http://localhost:8000/admin/get_all_docs", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                }
            });
            setAllPdfs(response.data);
            console.log(response.data);
            // unauthorized error
        } catch (error: any) {
            if (error.response.status === 401) {
                console.log("Unauthorized error")
                router.push('/login')
            }
        }
    }

    const updateBoardBasedOnCards = () => {
        setBoard(currentBoard => {
            currentBoard.columns[1].cards = [

            ]
            selectedPdfs.map((file: any, index: number) => {
                currentBoard.columns[1].cards.push({
                    id: index,
                    title: file,
                    description: "Using file, Move to all Files to remove it"
                })

            })
            return currentBoard;
        });

        // all pdf
        setBoard(currentBoard => {
            currentBoard.columns[0].cards = [
            ]
            allPdfs.map((file: any, index: number) => {
                if (!selectedPdfs.includes(file)) {
                    currentBoard.columns[0].cards.push({
                        id: index,
                        title: file,
                        description: "Unused file, Move to selected to use it"
                    })
                }
            })
            return currentBoard;
        });
    }

    const ingest = async () => {
        try {
            const response = await axios.get("http://localhost:8000/admin/ingest", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                }
            });
            console.log(response.data);
            // unauthorized error
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.log("Unauthorized error")
                router.push('/login')
            }
        }
    }

    const updateSelectedDocs = async () => {
        try {
            const response = await axios.get("http://localhost:8000/admin/get_selected_docs", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                }
            });
            setSelectedPdfs(response.data);
            console.log(response.data);


        }
        // unauthorized error
        catch (error: any) {
            if (error.response.status === 401) {
                console.log("Unauthorized error")
                router.push('/login')
            }
        }
    }

    useEffect(() => {
        // get pdf names from backend

        updateAllDocs();
        updateSelectedDocs();
    }, [])

    useEffect(() => {
        console.log(board);
        const newList: string[] = []
        board.columns[1].cards.map((card: any) => {
            return newList.push(card.title)
        })
        console.log(newList)
        setSelectedPdfs(newList);
        updateSelectedOnCloud(newList);
    }, [board])


    useEffect(() => {
        updateBoardBasedOnCards();
    }, [allPdfs, selectedPdfs])

    return (
        <>
            <div className="flex select-none bg-background flex-col items-center rounded-xl justify-center max-w-[500px] w-full mx-auto m-10">
                <div className="max-w-[500px] w-full border border flex items-center bg-[#00000 ] flex-col p-5 rounded-xl">
                    <Label htmlFor="file-upload" className="bg-black rounded-xl relative flex flex-col items-center justify-center w-full p-6 cursor-pointer">
                        <div className="text-center text-white">
                            <div className="max-w-min rounded-xl  p-2 mx-auto border border-slate-300 ">
                                <UploadCloudIcon size={20} />
                                <p className='hidden'>
                                    {selectedPdfs}
                                </p>
                            </div>
                            <p className="mt-2 text-xs ">
                                <span className="font-semibold">Drag & Drop multiple Files</span>
                            </p>
                            <div className="mt-1 text-xs">
                                <p>Click to upload multiple files</p>
                                <p className="mt-2">
                                    {!!newPDFs.length && newPDFs.map((pdf) => pdf.name).join(", ")}
                                    {!newPDFs.length && "No files selected (Select Upto 10MB Files)"}
                                </p>
                            </div>
                        </div>
                    </Label>
                    <Input id="file-upload" className="hidden" type="file" accept="application/pdf" multiple onChange={handleFileChange} />


                    <button onClick={() => { uploadToCloud() }} className="mt-4 group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
                        <span className="absolute left-0 top-0 size-full rounded-md border border-dashed border-red-50 shadow-inner shadow-white/30 group-active:shadow-white/10"></span>
                        <span className="absolute left-0 top-0 size-full rotate-180 rounded-md border-red-50 shadow-inner shadow-black/30 group-active:shadow-black/10"></span>
                        Upload to Cloud
                    </button>
                </div>
            </div>


            <div id='kanban' className='w-[80vw] mt-24 select-none'>

                <h1 className=' ml-14 text-lg font-extrabold text-white'>Pdfs Board</h1>
                <h1 className=' ml-14 text-lg font-extrabold text-white'>Move HTML Proposals to (View Proposal) board to render below</h1>
                <button onClick={() => { ingest() }} className="mt-4 mx-auto text-center flex justify-center group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
                    {/* <span className="absolute left-0 top-0 size-full rounded-md border border-dashed border-red-50 shadow-inner shadow-white/30 group-active:shadow-white/10"></span> */}
                    {/* <span className="absolute left-0 top-0 size-full rotate-180 rounded-md border-red-50 shadow-inner shadow-black/30 group-active:shadow-black/10"></span> */}
                    Save Changes
                </button>
                {/* <KanbanBoard /> */}
                <ControlledBoard  onCardDragEnd={handleCardMove}>{board}</ControlledBoard>
                {/* Render the loaded html */}

                {loadedHTML && <>
                    <div className='w-[80vw] mt-24 flex justify-center items-center flex-col'>
                        <h1 className=' ml-14 text-3xl font-extrabold text-white'>Loaded Proposals (View Only)</h1>
                        <div id='content' className='w-[50vw] text-justify' dangerouslySetInnerHTML={{ __html: loadedHTML }} />
                    </div></>}

            </div>


        </>
    );
}

export default PDF;
