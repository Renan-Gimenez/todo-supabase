"use client"

import { useEffect, useState } from "react";

import { getTasks, removeTaskById, supabase } from "@/services/taskService";

import { FileCheck } from "lucide-react";

import { useToast } from '@chakra-ui/react'
import { Skeleton } from '@/components/Skeleton'

import Form from "../components/Form";
import Task from "../components/Task";
import ClearAllTasks from "@/components/ClearAllTasks";
import Header from "@/components/Header";

export default function Home() {
  const [isStarting, setIsStarting] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [taskInProcess, setTaskInProcess] = useState<number | null>(null);
  const [tasks, setTasks] = useState<TTask[]>([]);
  const toast = useToast();

  const subscribeTasks = supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'tasks' },
      (payload:any) => {
        getTasksEffect();
        console.log('Change received!', payload)
      }
    )
    .subscribe()

  const doRemoveTask = async (id:number) => {
    try {
      setTaskInProcess(id);
      await removeTaskById(id);
      getTasksEffect();
  
      toast({
        title: 'Task deleted!',
        position: 'top',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error);
    }
  }

  const doRemoveAllTasks = async () => {
    const { data, error } = await supabase.from("tasks").delete().not("task", "eq", "");

    if (data) console.log(data);
    if (error) console.log(error);
    
    toast({
      title: error ? "Error" : "All tasks deleted!",
      position: 'top',
      status: error ? 'error' : "success",
      duration: 2000,
      isClosable: true,
    })
  }

  async function getTasksEffect() {
    setIsLoadingTasks(true);
    const data = await getTasks();
    setIsLoadingTasks(false);
    setTasks(data);
  }

  const renderButton = () => {
    if (!tasks.length) {
      return null;
    } 

    return (
      <ClearAllTasks onClick={() => doRemoveAllTasks()} />
    )
  }

  useEffect(() => {
    getTasksEffect();
    setIsStarting(false);
  }, []);

  return (
    <main className="flex min-h-screen dark:bg-gray-900 flex-col items-center justify-start px-6 py-24">
      <div className="max-w-md">
        <Header />

        <Form />
        
        {isStarting &&
          <Skeleton />
        }

        {!isLoadingTasks && !tasks.length && 
          <div className="w-full flex flex-col items-center gap-2 my-8 text-white">
            <FileCheck className="h-16 w-auto" /> 
            <span className="font-bold">There are no Tasks</span>
          </div>
        } 

        <div className="flex flex-col gap-2">
          {tasks.map((item:TTask, index) => {
            return(
              <Task key={index} title={item.task} inProcess={taskInProcess === item.id} onClick={() => doRemoveTask(item.id)} />
            );
          })}
        </div>

        {renderButton()}

      </div>
    </main>
  )
}
