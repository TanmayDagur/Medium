import z, { string } from "zod"

//  SIGNUP
export const signupInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional(),
})

//  SIGNIN

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})


//  ME


export const me = z.object({
    id: z.string(),
})

export type SignupInput = z.infer<typeof signupInput>;

export type SigninInput = z.infer<typeof signinInput>;

export type Me = z.infer< typeof me >;