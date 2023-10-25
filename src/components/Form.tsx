"use client"

import { useState } from 'react';

import { supabase } from "@/services/taskService";
import { Loader2 } from 'lucide-react';
import { useToast } from '@chakra-ui/react';

export default function Form() {
    const [newTask, setNewTask] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    return(
        <form
            action=""
            className='flex gap-2 my-4' 
            placeholder='Wash the dishes'
            onSubmit={async (e) => {
                e.preventDefault();

                if (newTask.trim() === '') {
                    alert("Please, fill the input");
                    return;
                }

                setIsLoading(true);
                await supabase.from('tasks').insert({task: `${newTask}`});
                setIsLoading(false);

                toast({
                    title: 'Task added!',
                    position: 'top',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })

                setNewTask('');
            }}
        >
            <input 
                type="text" 
                value={newTask}
                placeholder='Wash the dishes'
                className='w-full text-black p-2 rounded-lg shadow-md'
                onChange={(e) => {
                    setNewTask(e.target.value);
                }} 
            />
            <button className='w-44 flex justify-center shadow-md bg-violet-500 p-2 rounded-lg transition-all text-white hover:bg-violet-600 hover:tracking-wider'>
                {isLoading
                    ? <Loader2 className='animate-spin' />
                    : "Add Task"
                }
            </button>
        </form>
    )
}
