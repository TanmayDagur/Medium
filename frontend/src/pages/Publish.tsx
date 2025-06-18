import { useState, type ChangeEvent } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Publish = ()=>{
    const[title , setTitle] = useState("");
    const[content , setContent] = useState("");
    const navigate = useNavigate();

    return <div>
        <AppBar />
        <div className="flex justify-center ">
            <div className="pt-4 max-w-screen-xl w-full">
                <div>
                    <TitleEditor onChange={(e)=>{setTitle(e.target.value)}} />                
                    <TextEditor onChange = {(e)=>{setContent(e.target.value)}} />
                    <div className="pt-4">
                        <button type="submit" onClick={async()=>{
                            const responce = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                                title,
                                content
                            },{
                                headers:{
                                    Authorization:localStorage.getItem("token")
                                }
                            });
                            navigate(`/blog/${responce.data.id}`)

                        }} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Publish post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


function TitleEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>)=> void}){
    return(
        <div className="">
            <textarea onChange={onChange} rows={3} className="outline-none block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-400 dark:placeholder-gray-500" placeholder="Title . . . . "></textarea>
        </div>
    )
}


function TextEditor ({onChange}:{onChange:(e: ChangeEvent<HTMLTextAreaElement>)=>void}){
    return(
        <div className="pt-4">
            <textarea onChange={onChange} rows={10} className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-400 placeholder-gray-500" placeholder="Write your thoughts here..."></textarea>
        </div>
    )
}


