import { supabase } from "./supabaseClient";

export async function callHelloWorld(name: string): Promise<{ message: string }> {
    const { data, error } = await supabase.functions.invoke('hello-world', {
      body: { name },
    })
  
    if (error) {
      throw error
    }
  
    return data as { message: string }
  }