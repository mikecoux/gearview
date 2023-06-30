'use client'

import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

export default function LoginForm() {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data:any) => {
        setLoading(true)

        try {
            const res = await signIn("credentials",{
                email: data.email,
                password: data.password,
                redirect: true,
                callbackUrl: '/profile'
            })

            if (res?.ok) {
                setLoading(false)
            }

        } catch(e:any){
            console.error(e)
            alert(e.message)
        }
    }

    return (
        <div 
            className="flex flex-col fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4/6 md:w-1/3 lg:w-1/6">
            { loading ?
                <p className="text-center text-2xl">Loading...</p>
            : 
            <>
                <h3 
                    className="text-center font-medium text-2xl">
                        Log in to Gearview
                </h3>
                <form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="flex-col my-2">
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
                            Log In
                    </button>
                </form>
                <span className="text-right text-xs">
                    New to Gearview?
                    <Link href={'/signup'} className="text-slate-900 underline ml-1">Sign Up</Link>
                </span>
            </>
            }
        </div>
    )

}