import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const AppBar = ()=>{
    const[name , setName] = useState("");

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/user/me`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
            .then(response=>{
                setName(response.data.name);
            })
    },[])

    return <div className="border-b flex justify-between px-10 py-4 border-b-gray-400">
        <Link to={`/blogs`}  className="flex justify-center flex-col cursor-pointer font-bold text-2xl italic">
            Medium
        </Link>
        <div>
            <Link to={"/publish"}>
                <button type="button" className="cursor-pointer mr-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New +</button>
            </Link>
            <Avatar name={name} size={"big"} />
        </div>
    </div>
}