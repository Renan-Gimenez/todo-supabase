"use client";

import { useEffect, useState } from "react";

import useGetTasks, {
  removeTaskById,
  toggleTaskDone,
  supabase,
} from "@/services/taskService";

import { FileCheck } from "lucide-react";

import { useToast } from "@chakra-ui/react";
import { Skeleton } from "@/components/Skeleton";

import Form from "../components/Form";
import Task from "../components/Task";
import ClearAllTasks from "@/components/ClearAllTasks";
import Header from "@/components/Header";

export default function Home() {
  const { tasks, getTasks } = useGetTasks();
  const toast = useToast();

  const [isStarting, setIsStarting] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [taskInProcess, setTaskInProcess] = useState<number | null>(null);

  const subscribeTasks = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "tasks" },
      (payload: any) => {
        getTasksEffect();
        console.log("Change received!", payload);
      }
    )
    .subscribe();

  const doRemoveTask = async (id: number) => {
    try {
      setTaskInProcess(id);
      await removeTaskById(id);

      toast({
        title: "Task deleted!",
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const doToggleTaskDone = async (id: number, done: boolean) => {
    try {
      await toggleTaskDone(id, done);
    } catch (error) {
      console.log(error);
    }
  };

  const doRemoveAllTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .not("task", "eq", "");

    if (data) console.log(data);
    if (error) console.log(error);

    toast({
      title: error ? "Error" : "All tasks deleted!",
      position: "top",
      status: error ? "error" : "success",
      duration: 2000,
      isClosable: true,
    });
  };

  async function getTasksEffect() {
    try {
      setIsLoadingTasks(true);

      const user = supabase.auth.getUser();
      const userId = (await user).data.user?.id;

      if (userId) {
        await getTasks(userId);
      } else {
        console.log("UNDEFINED USER");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoadingTasks(false);
    }
  }

  const renderButton = () => {
    if (!tasks.length) {
      return null;
    }

    return <ClearAllTasks onClick={() => doRemoveAllTasks()} />;
  };

  useEffect(() => {
    getTasksEffect();
    setIsStarting(false);
  }, []);

  return (
    <main className="flex min-h-screen bg-bg-primary flex-col items-center justify-start px-6 py-24">
      <div className="max-w-md">
        <Header />

        <Form />

        {isStarting && <Skeleton />}

        {!isLoadingTasks && !tasks.length && (
          <div className="w-full flex flex-col items-center gap-2 my-8 text-white">
            <FileCheck className="h-16 w-auto text-zinc-800 dark:text-white" />
            <span className="font-bold text-zinc-800 dark:text-white">
              There are no Tasks
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {tasks.map((item: TTask, index) => {
            return (
              <Task
                key={index}
                id={item.id}
                uid={item.uid}
                done={item.done}
                title={item.task}
                inProcess={taskInProcess === item.id}
                removeTask={() => doRemoveTask(item.id)}
                toggleTaskDone={doToggleTaskDone}
              />
            );
          })}
        </div>

        {renderButton()}
      </div>
    </main>
  );
}
