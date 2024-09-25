import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url,config){
    const response=await fetch(url,config);
    const resDData=await response.json()

    if(!response.ok){
        throw new Error(resDData.message || 'Something went wrong')
    }

    return resDData
}

export default function useHttp(url,config,initialData){
    const [data,setData]=useState(initialData)
    const [error,setError]=useState();
    const [isLoading,setIsLoading]=useState(false);

    function clearData(){
        setData(initialData)
    }

    const sendRequest=useCallback(async function sendRequest(data){
        setIsLoading(true)
        try{
            const resData=await sendHttpRequest(url,{...config,body:data})
            setData(resData)
        }catch(err){
            setError(err.message || 'Something went wrong')
        }
        setIsLoading(false)
    },[url,config])

    useEffect(()=>{
        if((config && (config.method==='GET' || !config.method)) || !config){
            sendRequest()
        }
    },[sendRequest,config])

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}