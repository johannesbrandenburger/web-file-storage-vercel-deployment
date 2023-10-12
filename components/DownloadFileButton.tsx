"use client"
import { Button } from "@nextui-org/button";

export default function DownloadFileButton({ fileUuid, filename }: { fileUuid: string, filename: string }) {
    return (
        <Button
            onClick={async () => {
                let downloadResponse = await fetch(`/${fileUuid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'Content-Disposition': 'attachment; filename=' + filename
                    }
                });
                let blob = await downloadResponse.blob();
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
            }}
        >
            Download {filename}
        </Button>

    )
}