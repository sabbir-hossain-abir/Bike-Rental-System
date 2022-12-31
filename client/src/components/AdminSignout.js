import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";



const AdminSignout = () => {



    const history = useHistory();

    useEffect(()=>{
        fetch('/adminsignout',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then((res)=>{
            localStorage.removeItem("Admin")
            history.push('/signin', {replace: true})
            if(res.status != 200){
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    })


    return (
        <>
            <h1>Log Out</h1>
        </>
    )
}

export default AdminSignout
