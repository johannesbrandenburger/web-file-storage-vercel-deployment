"use client"

import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

export default function DownloadFileButton({ search }: { search: string | undefined }) {
    const router = useRouter();
    let timeout: NodeJS.Timeout;

    return (
        <>
            <Input
                label="Search"
                isClearable
                radius="lg"
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-xl",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focused=true]:bg-default-200/50",
                        "dark:group-data-[focused=true]:bg-default/60",
                        "!cursor-text",
                    ],
                }}
                placeholder="Type to search..."
                defaultValue={search}
                onChange={e => {
                    timeout && clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        const search = e.target.value.trim();
                        if (search.length > 0) {
                            router.push(`/?search=${search}`);
                        } else {
                            router.push(`/`);
                        }
                    }, 500);
                }}
                onClear={() => {router.push(`/`)}}
            />
        </>
    )
}