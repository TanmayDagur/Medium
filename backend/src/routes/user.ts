import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import {signinInput, signupInput} from "@tanmaydagur/medium-common/dist/user";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signupInput.safeParse(body);
	console.log(body);
	if (!success) {
		c.status(403);
		return c.json({ 
			message: "invalid input"
		});
	}
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name : body.name
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})




userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if(!success){
		c.status(403);
		return c.json({
			message : "invalid input"
		})
	}


	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
     		password: body.password
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})



userRouter.get("/me",async(c)=>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	try{
		const token = c.req.header("Authorization") || "";
		console.log(token);
		const payload = await verify(token , c.env.JWT_SECRET);
		const user = await prisma.user.findUnique({
			where:{
				id: (payload as any).id,
			},
			select:{
				id:	  true,
				email:true,
				name: true,
			}
		});

		return c.json(user);
	}catch(e){
		c.status(403)
		return c.json({	error:"Invalid token" })
	}

});


