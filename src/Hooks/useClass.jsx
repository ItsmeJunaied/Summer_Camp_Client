import { useEffect, useState } from "react";

const useClass = () => {
    const [classList,setClassList]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        fetch('http://localhost:5001/class')
            .then(res=>res.json())
            .then(data=>{
                setClassList(data);
                setLoading(false);
            });
    },[])
    return [classList,loading]
};

export default useClass;