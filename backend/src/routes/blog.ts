import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@tanmaydagur/medium-common/dist/blog";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();



blogRouter.use("/", async(c, next) => {
  const header = c.req.header('Authorization') || " ";

  try{
  const response = await verify(header, c.env.JWT_SECRET);
  const userId  = String(response.id);
  if(response){
    c.set('userId', userId);   
    return next();
  }
  else {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
  
}catch(e){
    c.status(403);
    return c.json({ error: "not login " });
    }
}
)




blogRouter.post('/', async(c) => {
    const body = await c.req.json();
    const authId = c.get('userId');
    const { success } = createBlogInput.safeParse(body);

    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    if(!success){
        c.status(403);
        return c.json({
            message: "invalid input"
        })
    }

    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId: authId,
        }
    })

    return c.json({
        message : "blog has been created",
        id: blog.id,
    })
})





blogRouter.put('/', async(c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);

    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    if(!success){
        c.status(403);
        return c.json({
            message: "invalid input"
        })
    }

    await prisma.post.update({
        where:{
            id:body.id,
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })
    return c.json({
        message : "blog has been updated",
        id: body.id,
    })
})




//Todo: add pagination
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            published:true,
            author:{
                select:{
                    name:true,
                }
            }
        }
    });

    return c.json({
        blogs
    });
});




blogRouter.get('/:id', async(c) => {
    const id =  c.req.param("id");
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    
    try{
        const blog = await prisma.post.findFirst({
            where:{
                id:id,
            },
            select:{
                id:true,
                title:true,
                content:true,
                published:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            }
        })
        return c.json({
            blog
        });
    }catch(e){
        c.status(404);
        return c.json({ error: "blog not found" });
    }

})


