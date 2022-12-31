import React, {useEffect, useContext} from 'react'
import { NavLink, useHistory } from "react-router-dom";

import { UserContext } from "../App"

const Signout = () => {

    const history = useHistory();

    useEffect(()=>{
        fetch('/signout',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then((res)=>{
            localStorage.removeItem("User")
            history.push('/signin', {replace: true})
            window.location.reload();
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

export default Signout
