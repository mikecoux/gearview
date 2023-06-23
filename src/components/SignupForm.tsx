'use client'

import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
// import { useState } from "react"
import Link from "next/link"

// interface SignupData {
//     username: string
//     email: string
//     password: string
// }

export default function SignupForm() {
    // const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data:any) => {
        try {
            const res = await fetch('/api/signup', {
                credentials: "include",
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password
                })
            })

            if (!res.ok) {
                alert((await res.json()).message);
                return;
            }

            signIn("credentials",{
                email: data.email,
                password: data.password,
                redirect: true,
                callbackUrl: '/'
            })

        } catch(e:any){
            console.error(e)
            alert(e.message)
        }
    }

    return (
        <div 
            className="flex flex-col fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4/6 md:w-1/3 lg:w-1/6">
            <h3 
                className="text-center font-medium text-2xl">
                    Sign up for Gearview
            </h3>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="flex-col my-2">
                <input {...register('username', {required: true})} 
                    placeholder="Username" 
                    className="rounded text-black outline outline-slate-300 my-1 w-full indent-2.5">
                </input>
                <input {...register('email', {required: true})} 
                    placeholder="Email" 
                    className="rounded text-black outline outline-slate-300 my-1 w-full indent-2.5">
                </input>
                <input {...register('password', {required: true})} 
                    placeholder="Password" 
                    className="rounded text-black outline outline-slate-300 my-1 w-full indent-2.5">
                </input>
                <br />
                <button 
                    type="submit" 
                    className="bg-slate-900 rounded text-white py-1 px-2 w-full my-1">
                        Sign Up
                </button>
            </form>
            <span className="text-right text-xs">
                Already on Gearview?
                <Link href={'/login'} className="text-slate-900 underline ml-1">Log In</Link>
            </span>
        </div>
    )

}