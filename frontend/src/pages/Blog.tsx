import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks/useBlogs"

export const Blog = ()=>{
    const { id } = useParams();
    const { skeleton, blog } = useBlog({
        id: id || ""
    });
    // Ensure blog is a single Blog object, not an array

    if(skeleton){
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
    }
    
    return (
        <div>
            {blog ? <FullBlog blog={blog} /> : null}
        </div>
    );
}