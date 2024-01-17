"use client";

import { useState } from "react";

import { supabase } from "@/services/taskService";
import { Loader2 } from "lucide-react";
import { useToast } from "@chakra-ui/react";
import useAuth from "@/services/useAuth";

export default function Form() {
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const toast = useToast();

  const maxLength = 200;
  const currentLength = newTask.length;
  const progress = `${currentLength} / ${maxLength}`;

  return (
    <form
      action=""
      className="flex gap-2 my-4"
      placeholder="Wash the dishes"
      onSubmit={async (e) => {
        e.preventDefault();

        if (newTask.trim() === "") {
          alert("Please, fill the input");
          return;
        }

        setIsLoading(true);
        await supabase.from("tasks").insert({ task: `${newTask}` });
        setIsLoading(false);

        toast({
          title: "Task added!",
          position: "top",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        setNewTask("");
      }}
    >
      <div className="w-full flex items-center gap-1 dark:bg-gray-800 dark:text-white rounded-lg shadow-md px-3 py-2 focus-within:ring focus-within:ring-violet-500">
        <input
          type="text"
          value={newTask}
          placeholder="Type a task..."
          className="w-full bg-transparent text-ellipsis outline-none"
          onChange={(e) => {
            const length = e.target.value.length;

            if (length <= maxLength) {
              setNewTask(e.target.value);
            } else {
              setNewTask(e.target.value.slice(0, maxLength));
            }
          }}
        />
        <span className="text-zinc-500 text-[10px] w-auto self-end whitespace-nowrap">
          {progress}
        </span>
      </div>

      <button className="w-44 flex justify-center shadow-md bg-violet-500 p-2 rounded-lg transition-all text-white hover:bg-violet-600 hover:tracking-wider">
        {isLoading ? <Loader2 className="animate-spin" /> : "Add Task"}
      </button>
    </form>
  );
}
