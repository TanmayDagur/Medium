import { AppBar } from "../components/AppBar"
import { BlogsCard } from "../components/BlogsCard"
import { BlogsSkeleton } from "../components/skeletons/BlogsSkeleton";
import { useBlogs } from "../hooks/useBlogs"


export interface Blog {
    id : string;
    title: string;
    content: string;
    published: string;
    author:{
        name:string;
    }
};

export const Blogs = ()=>{
    
    const {skeleton, blogs} = useBlogs() as { skeleton: boolean; blogs: Blog[] };
    if(skeleton){
        return(
        <div>
            <AppBar />
            <div className="flex justify-center ">
                <div>
                    <BlogsSkeleton />      
                    <BlogsSkeleton />      
                    <BlogsSkeleton />      
                    <BlogsSkeleton />      
                </div>      
            </div>
       </div>
        )
    }


    return <div >
        <AppBar />
        <div className="flex justify-center ">
            <div className="pl-8">
                {blogs.map(blog =><BlogsCard 
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.published.slice(0, 10)}
                />)}
                
                
            </div>
        </div>
    </div>
}

