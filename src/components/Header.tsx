import { ClipboardList } from "lucide-react";

export default function Header() {
    return (
        <div className="flex items-center gap-2 px-4 py-4">
            <ClipboardList className="text-violet-500" />
            <h1 className="text-xl font-bold text-zinc-800 dark:text-white">ToDo List</h1>
        </div>
    );
} 