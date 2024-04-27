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

type Pdf = {
    id: string;
    pdf: string;
    size: number;
}

function PDF() {
    const [newPDFs, setNewPDFs] = useState<File[]>([]);

    const [allPdfs, setAllPdfs] = useState<string[]>([]);
    const [selectedPdfs, setSelectedPdfs] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files); // Get the files from the input
            setNewPDFs((prevPDFs) => [...prevPDFs, ...files]); // Add to the existing File array
        }
    };


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

    const updateSelectedOnCloud = async () => {
        if (!selectedPdfs || selectedPdfs.length === 0) {
            console.warn("No documents to update.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/admin/update_selected_docs", selectedPdfs, {
                headers: {
                    "Content-Type": "application/json", // Proper content type for JSON
                    "Accept": "application/json", // Accepting JSON response
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Ensure a valid token
                },
            });

            console.log("Documents updated successfully:", response.data);
        } catch (error:any) {
            console.error("Error updating selected documents:", error.response ? error.response.data : error.message);
        }
    }




    // const handleDelete = (pdfId: string) => {
    //     const updatedPdfs = newPDFs.filter((pdf) => pdf.id !== pdfId);
    //     setNewPDFs(updatedPdfs);
    // };


    const updateAllDocs = async () => {
        const response = await axios.get("http://localhost:8000/admin/get_all_docs", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        });
        setAllPdfs(response.data);
        console.log(response.data);
    }

    const updateSelectedDocs = async () => {
        const response = await axios.get("http://localhost:8000/admin/get_selected_docs", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        });
        setSelectedPdfs(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        // get pdf names from backend

        updateAllDocs();
        updateSelectedDocs();
    }, [])

    return (
        <>
            <div className="flex bg-background flex-col items-center justify-center max-w-[500px] w-full mx-auto m-10">
                <div className="max-w-[500px] w-full border border-slate-500 flex items-center bg-[#f0f0f0] flex-col p-5 rounded-xl">
                    <Label htmlFor="file-upload" className="bg-white rounded-xl relative flex flex-col items-center justify-center w-full p-6 cursor-pointer">
                        <div className="text-center">
                            <div className="max-w-min rounded-xl p-2 mx-auto border border-slate-300 ">
                                <UploadCloudIcon size={20} />
                            </div>
                            <p className="mt-2 text-xs">
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

                    <Button className='mt-4' onClick={() => { uploadToCloud() }}>Upload to Cloud</Button>
                </div>
            </div>
            <Table>
                <TableCaption>A list of your Selected</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Pdfs</TableHead>
                        {/* <TableHead>Size</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selectedPdfs.map((pdf) => (
                        <TableRow key={pdf}>
                            <TableCell className="font-medium">{pdf}</TableCell>
                            {/* <TableCell>{pdf.size} bytes</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Table>
                <TableCaption>A list of your recent Pdfs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Pdfs</TableHead>
                        {/* <TableHead>Size</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allPdfs.map((pdf) => (
                        <TableRow key={pdf}>
                            <TableCell className="font-medium">{pdf}</TableCell>
                            {/* <TableCell>{pdf.size} bytes</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default PDF;
