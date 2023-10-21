import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function addTask(item:TTask){
    const data = await supabase.from('tasks').insert(item);
    console.log(data);
}

export async function getTasks(): Promise<TTask[]> {
    const data = await supabase.from('tasks').select("*");
    console.log("TASKS:\n", data);    
    
    if (!data.data) {
        return [];
    }

    return data.data;
}

export async function removeTaskById(id:number) {
    const data = await supabase.from("tasks").delete().eq("id", id);
    console.log("REMOVE TASK BY ID:\n", data);
}
