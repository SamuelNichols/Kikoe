import { useEffect, useState } from "react";
import { callHelloWorld } from "../lib/supabaseClient";

export const HelloWorld = () => {

    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const res = await callHelloWorld("Functions");
                if (isMounted) setMessage(res.message);
            } catch (err: any) {
                if (isMounted) setError(err?.message ?? "Unknown error");
            }
        })();
        return () => { isMounted = false };
    }, []);

    return(
        <div>
            <h1>Hello World</h1>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}