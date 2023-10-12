"use client"

import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

export default function DownloadFileButton() {
    const router = useRouter();

    return (
        <input type="text" placeholder="Search..." onChange={ e => {
            router.push(`/?search=${e.target.value}`);
        }}/>
    )
}