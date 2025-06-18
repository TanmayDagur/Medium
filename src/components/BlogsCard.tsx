import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";


interface BlogsCardProps {
    id:string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogsCard = ({ authorName , title , content , publishedDate , id }:BlogsCardProps) =>{

    return <Link to={`/blog/${id}`}>
        <div className="border-b border-gray-200 pb-4 pt-4 w-screen max-w-screen-md cursor-pointer">    
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar name={authorName}/>
                </div>
                <div className="font-light px-2 ">
                    {authorName}
                </div>
                <div className="flex justify-center items-center">
                    <CircleDot />
                </div>
                <div className="pl-2 font-thin text-gray-500">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-bold pt-2">
                {title}
            </div>
            <div className="text-sm font-normal text-gray-700">
                {content.slice(0,100) + "..."}
            </div>
            <div className="text-sm font-thin text-gray-500 pt-4">
                {`${Math.ceil(content.length / 1000)} min read`}
            </div>

        </div>
    </Link>
}

export function CircleDot(){
    return <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
}

