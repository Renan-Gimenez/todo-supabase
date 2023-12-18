import { Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Props {
  id: number;
  done: boolean;
  title: string;
  inProcess: boolean;
  removeTask: () => void;
  toggleTaskDone: (id: number, done: boolean) => void;
}

export default function Task({
  id,
  done,
  title,
  inProcess,
  removeTask,
  toggleTaskDone,
}: Props) {
  return (
    <div className="w-full flex items-center justify-between gap-2 p-3 rounded-lg shadow-lg dark:bg-gray-700">
      <div className="flex items-center gap-2">
        <input
          className="ring-1 ring-blue-500 form-checkbox m-1 text-indigo-600 self-start rounded-xl h-[16px] w-[16px] flex-1"
          type="checkbox"
          name="opa"
          checked={done}
          onChange={(e) => toggleTaskDone(id, e.target.checked)}
        />
        <span
          className={`break-all ring-1 ring-red-500 ${
            done ? "text-zinc-500 line-through" : "dark:text-white"
          }`}
        >
          {title}
        </span>
      </div>
      <button
        className="self-start p-2 rounded-full transition-all hover:bg-gray-800/30 dark:hover:bg-gray-800/70"
        onClick={removeTask}
      >
        {inProcess ? (
          <Loader2 className="animate-spin h-4 w-auto dark:text-white" />
        ) : (
          <Trash2 className="h-4 w-auto dark:text-white" />
        )}
      </button>
    </div>
  );
}
