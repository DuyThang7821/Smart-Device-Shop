import React, { useEffect, useState } from "react";

const useDebounce = (value, ms) =>{

    const [decounceValue, setDecounceValue] = useState('');
    useEffect(()=>{
    const setTimeOutId = setTimeout(() =>{
            setDecounceValue(value)
        }, ms)
        return () =>{
            clearTimeout(setTimeOutId);
        }
    }, [value, ms])

        return decounceValue
    
}
export default useDebounce