import { Link } from "react-router-dom"

export const AuthHeader = ({type}:{type:"signup" | "signin"})=>{
    return <div>
            <div className="px-20">
                <div className="text-3xl font-extrabold text-center">
                    {type === "signup"? "Sign Up" : "Login"} 
                </div>
                <div className="text-gray-500 pl-10 ">
                    {type === "signup" ? "Already have an account" : "Create an New Account"}
                    <Link to={type === "signup" ? "/Signin" : "/Signup"} className="underline pl-2">{type === "signup" ? "Sign in" : "Sign up"}</Link>
                </div>
            </div>
        </div>
}