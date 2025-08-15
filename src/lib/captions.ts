import { supabase } from "./supabaseClient";
import type { fetchSubsRequestBody } from "../../supabase/functions/fetch-subs/index";
import type { fetchSubsResponseBody } from "../../supabase/functions/fetch-subs/index";

export async function getCaptions(videoId: string) {
  const body: fetchSubsRequestBody = { videoId };
  const { data, error } = await supabase.functions.invoke("fetch-subs", {
    body,
  });

  if (error) {
    throw error;
  }

  return data as fetchSubsResponseBody;
}