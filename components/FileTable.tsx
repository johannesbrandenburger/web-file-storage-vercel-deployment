"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/table";
import DownloadFileButton from "./DownloadFileButton";

export default function FileTable({ files }: { files: any[] }) {

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
                {files?.map((file: any) => (
                    <TableRow key={file.uuid}>
                        <TableCell>{file.name}</TableCell>
                        <TableCell>{file.description}</TableCell>
                        <TableCell>{file.tags.join(", ")}</TableCell>
                        <TableCell>{file.creationDate.toString()}</TableCell>
                        <TableCell>
                            <DownloadFileButton fileUuid={file.fileUuid} filename={file.filename} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}