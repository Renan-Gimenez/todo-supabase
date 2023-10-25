"use client"

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Props{
    title: string;
    onClick: () => void;
}

export default function Task({ title, onClick }:Props) {
    const [isLoading, setIsLoading] = useState(false);

    const doRemoveTask = async () => {
        setIsLoading(true);
        await onClick();
    }

    return(
        <div className="w-full flex items-center justify-between gap-2 p-3 rounded-lg shadow-lg dark:bg-gray-700">
            <span className="break-all dark:text-white" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {title}
            </span>
            <button 
                className="self-start p-2 rounded-full transition-all hover:bg-gray-800/30 dark:hover:bg-gray-800/70" 
                onClick={() => {
                    doRemoveTask();
                }}
            >
                {isLoading
                    ? <Loader2 className="animate-spin h-4 w-auto dark:text-white"/>
                    : <Trash2 className="h-4 w-auto dark:text-white"/>
                }
            </button>
        </div>
    )
}