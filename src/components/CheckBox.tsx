import * as CheckBoxPrimitive from "@radix-ui/react-checkbox";

import { Check } from "lucide-react";

interface Props {
  id: number;
  done: boolean;
  toggleTaskDone: (id: number, done: boolean) => void;
}

export default function CheckBox({ id, done, toggleTaskDone }: Props) {
  return (
    <CheckBoxPrimitive.Root
      className="h-5 w-5 bg-zinc-200 dark:bg-gray-800 rounded"
      checked={done}
      onClick={() => toggleTaskDone(id, done)}
    >
      <CheckBoxPrimitive.Indicator className="flex items-center justify-center dark:text-zinc-50">
        <Check className="h-4 w-4" />
      </CheckBoxPrimitive.Indicator>
    </CheckBoxPrimitive.Root>
  );
}
