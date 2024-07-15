import { useEffect } from 'react'

export default function useComponentWillUnMount(unloadCallback){
    useEffect(() => {
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
};