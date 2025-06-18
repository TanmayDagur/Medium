import { AppBar } from "./AppBar"
import type { Blog } from "../pages/Blogs"
import { Avatar } from "./Avatar"


export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        
        <AppBar />
        <div className="flex justify-center ">
            <div className="grid grid-cols-12 px-20 pt-12 max-w-screen-2xl ">
                <div className="col-span-8 ">
                    <div className="text-5xl font-extrabold underline decoration-2">
                        {blog.title.toUpperCase()}
                    </div>
                    <div className="text-sm  text-gray-500 pt-2">
                        Posted on {blog.published.slice(0,10)}
                    </div>
                    <div className="text-gray-800 pt-8">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 max-w-xs pl-10">
                    <div className="text-gray-900 text-lg">
                        Author
                    </div>
                    <div className="flex ">
                        <div className="pr-4 flex justify-center flex-col">
                            <Avatar size="big" name={blog.author.name} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name}
                            </div>
                            <div className="text-gray-500">
                                Random catch phrase about the audtor ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}