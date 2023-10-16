"use client"

import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

export default async function DownloadFileButton({ search }: { search: string | undefined }) {
    const router = useRouter();
    let timeout: NodeJS.Timeout;

    return (
        <input type="text" placeholder="Search..." defaultValue={ search } onChange={ e => {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => {
                const search = e.target.value.trim();
                if (search.length > 0) {
                    router.push(`/?search=${search}`);
                } else {
                    router.push(`/`);
                }
            }, 500);
        }}/>
    )
}