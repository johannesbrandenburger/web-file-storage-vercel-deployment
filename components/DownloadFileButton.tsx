"use client"
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function DownloadFileButton({ fileUuid, filename }: { fileUuid: string, filename: string }) {
    return (
        <Button href={`/api/download/${fileUuid}`} download={filename} as={Link}>
            Download {filename}
        </Button>
    )
}