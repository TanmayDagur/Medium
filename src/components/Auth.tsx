import { LabeledInput } from "./LabelInput"
import { useState } from "react"
import { type SigninInput, type SignupInput } from "@tanmaydagur/medium-common/dist/user";
import { AuthHeader } from "./AuthHeader";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Auth = ({ type }:{type: "signup" | "signin"}) =>{
    const Navigate = useNavigate();
    const [ signupvariable , setSignup ] = useState<SignupInput>({
        name:"",
        email:"",
        password:"",
    })

    const [ signinvariable , setSignin ] = useState<SigninInput>({
        email:"",
        password:"",
    })

    async function handleSignup(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupvariable);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            Navigate("/blogs")

        }catch(e){
            return{
                error: "An error occurred in handleSignup function",
            }
        }
    }


    async function handleSignin(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinvariable);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            Navigate("/blogs")
        }catch(e){
            return{
                error: "An error occurred in handleSignin function",
            }
        }
    }




    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="ph-10 ">
                <AuthHeader type={type=== "signup"?"signup":"signin"} />
            <div className="px-2">
                    {type === "signup"? <LabeledInput label="Name" placeholder="Enter your username" onChange={(e)=>{
                        setSignup({
                            ...signupvariable,
                            name: e.target.value
                        })
                    }}/> :null}
                    
                    {type === "signup"? <LabeledInput label="Email"  placeholder="Enter your email" onChange={(e)=>{
                        setSignup({
                            ...signupvariable,
                            email: e.target.value
                        })
                    }}/>:null}

                    {type === "signup"? <LabeledInput label="Password" type="password" placeholder="Enter your password" onChange={(e)=>{
                        setSignup({
                            ...signupvariable,
                            password: e.target.value
                        })
                    }}/>:null}

                    

                    {type === "signin"? <LabeledInput label="Email" type="email" placeholder="Enter your email" onChange={(e)=>{
                        setSignin({
                            ...signinvariable,
                            email: e.target.value
                        })
                    }}/>:null}

                    {type === "signin"? <LabeledInput label="Password" type="password" placeholder="Enter your password" onChange={(e)=>{
                        setSignin({
                            ...signinvariable,
                            password: e.target.value
                        })
                    }}/>:null}


                    <button onClick={type === "signup" ? handleSignup : handleSignin} type="button" className="w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>

                </div>
            </div>
        </div>
        
    </div>
}
