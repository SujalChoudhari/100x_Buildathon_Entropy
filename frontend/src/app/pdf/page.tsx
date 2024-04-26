"use client"

import React, { useState } from 'react';
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

type Pdf = {
    id: string;
    pdf: string;
    size: number;
}

function PDF() {
    const [pdfs, setPdfs] = useState<Pdf[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newPdfs = files.map((file, index) => ({
                id: (pdfs.length + index + 1).toString(),
                pdf: file.name,
                size: file.size,
            }));

            setPdfs((prevPdfs) => [...prevPdfs, ...newPdfs]);
        }
    };

    const handleDelete = (pdfId: string) => {
        const updatedPdfs = pdfs.filter((pdf) => pdf.id !== pdfId);
        setPdfs(updatedPdfs);
    };

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
                                <p className="mt-2">(files should be less than 10 MB)</p>
                            </div>
                        </div>
                    </Label>
                    <Input id="file-upload" className="hidden" type="file" accept="application/pdf" multiple onChange={handleFileChange} />
                </div>
            </div>
            <Table>
                <TableCaption>A list of your recent Pdfs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Pdfs</TableHead>
                        <TableHead>Size</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pdfs.map((pdf) => (
                        <TableRow key={pdf.id}>
                            <TableCell className="font-medium">{pdf.pdf}</TableCell>
                            <TableCell>{pdf.size} bytes</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default PDF;
