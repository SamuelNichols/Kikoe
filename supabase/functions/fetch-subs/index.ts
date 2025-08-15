// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

// return string version of response.text()
const getYtcfg = async (videoId: string): Promise<string> => {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const response = await fetch(url, {
    headers: {
      "user-agent": UA,
      "accept-language": "en",
    },
  });

  const data = await response.text();

  const match = data.match(/ytcfg\.set\(({.+?})\);/s);
  if (!match) throw new Error("ytcfg not found!");

  let key, clientName, clientVersion;
  if (match) {
    try {
      const cfg = JSON.parse(match[1]);
      key = cfg.INNERTUBE_API_KEY || key;
      clientName = cfg.INNERTUBE_CONTEXT_CLIENT_NAME || cfg.CLIENT_NAME;
      clientVersion = cfg.INNERTUBE_CONTEXT_CLIENT_VERSION || cfg.CLIENT_VERSION;
    } catch (_error) {
      throw new Error("ytcfg not found!");
    }
  }
  if (!key) throw new Error("key not found");



  return JSON.stringify({ key, clientName, clientVersion });
}

export type fetchSubsRequestBody = {
  videoId: string;
}

export type fetchSubsResponseBody = {
  videoId: string;
  ytcfg: string | null;
  error: string | null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }
  const { videoId } = await req.json() as fetchSubsRequestBody;

  const res: fetchSubsResponseBody = await getYtcfg(videoId)
  .then(ytcfg => {
    return {
      videoId,
      ytcfg,
      error: null
    }
  })
  .catch(error => {
    return {
      videoId,
      ytcfg: null,
      error: error
    }
  });

  return new Response(
    JSON.stringify(res),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  )
})
