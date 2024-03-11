import * as CheckBox from "@radix-ui/react-checkbox";

import { Check, Trash2, Loader2 } from "lucide-react";

interface Props {
  id: number;
  uid: string;
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
    <div className="w-full flex items-center justify-between gap-3 p-3 rounded-lg shadow-lg dark:bg-gray-700">
      <div className="h-full flex mt-1 self-start">
        <CheckBox.Root
          className="h-5 w-5 bg-zinc-200 dark:bg-gray-800 rounded"
          checked={done}
          onClick={() => toggleTaskDone(id, !done)}
        >
          <CheckBox.Indicator className="flex items-center justify-center dark:text-zinc-50">
            <Check className="h-4 w-4" />
          </CheckBox.Indicator>
        </CheckBox.Root>
      </div>
      <span
        className={`h-full w-full ${
          done ? "text-zinc-500 line-through" : "dark:text-zinc-50"
        }`}
      >
        {title}
      </span>
      <button
        className="self-start p-1.5 rounded-full transition-all hover:bg-gray-800/30 dark:hover:bg-gray-800/70"
        onClick={removeTask}
      >
        {inProcess ? (
          <Loader2 className="animate-spin h-4 w-auto dark:text-zinc-50" />
        ) : (
          <Trash2 className="h-4 w-auto dark:text-zinc-50" />
        )}
      </button>
    </div>
  );
}
