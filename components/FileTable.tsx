"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/table";
import DownloadFileButton from "./DownloadFileButton";

export default function FileTable({ files }: { files: {
    fileUuid: string,
    name: string,
    description: string,
    tags: string[],
    creationDate: Date,
    filename: string
}[] }) {

    return (
        <Table>
            <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Tags</TableColumn>
                <TableColumn>Creation Date</TableColumn>
                <TableColumn>Download</TableColumn>
            </TableHeader>
            <TableBody>
                {files?.map((file) => (
                    <TableRow key={file.fileUuid}>
                        <TableCell>{file.name}</TableCell>
                        <TableCell>{file.description}</TableCell>
                        <TableCell>{file.tags.join(", ")}</TableCell>
                        <TableCell>
                            <div suppressHydrationWarning>
                                {file.creationDate.toString()}
                            </div>
                        </TableCell>
                        <TableCell>
                            <DownloadFileButton fileUuid={file.fileUuid} filename={file.filename} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}