"use client"

import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

export default function DownloadFileButton() {
    const router = useRouter();
    let timeout: NodeJS.Timeout;

    return (
        <input type="text" placeholder="Search..." onChange={ e => {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => {
                router.push(`/?search=${e.target.value}`);
            }, 500);
        }}/>
    )
}