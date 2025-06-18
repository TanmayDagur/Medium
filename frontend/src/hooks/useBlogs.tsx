import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import type { Blog } from "../pages/Blogs";


export const useBlog = (id : {id: string})=>{
    const [skeleton , setSkeleton] = useState(true);
    const[blog , setBlog] = useState<Blog | null>(null);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id.id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
            .then(response=>{
                setBlog(response.data.blog);    
                console.log(response.data);
                setSkeleton(false)
            })
    },[id])
    return {
        blog,
        skeleton,
    }


}



export const useBlogs =()=>{
    const [skeleton, setSkeleton] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setBlogs(response.data.blogs);
            setSkeleton(false);        
        })
    },[]);

    return {
        skeleton,
        blogs,
    }

}