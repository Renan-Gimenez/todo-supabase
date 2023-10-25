import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props{
    onClick: () => void,
}

export default function ClearAllTasks({ onClick }:Props) {
    const [isLoading, setIsLoading] = useState(false);

    return(
        <button 
            className="block mx-auto my-4 shadow-md bg-red-500 px-4 py-2 text-white rounded-full transition-all hover:bg-red-600 hover:tracking-wider" 
            onClick={async () => {
                setIsLoading(true);
                await onClick();
                setIsLoading(false);
            }}
        >
            {isLoading
                ? <Loader2 className='animate-spin' />
                : "Clear Tasks"
            }
        </button>
    );
}
