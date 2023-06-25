'use client'

import { useForm } from "react-hook-form"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react";

export default function ReviewForm(
    { showForm, setShowForm }:{ showForm:boolean, setShowForm:any }
) {
    const { register, handleSubmit } = useForm()
    const currentProduct = usePathname().split('/')[2]
    const { data: session } = useSession();

    console.log(session)
    console.log(currentProduct)

    const onSubmit = async (data:any) => {
        try {
            const res = await fetch(`/api/reviews/products/${currentProduct}`, {
                credentials: "include",
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    email: session?.user?.email,
                    username: session?.user?.name,
                    rating: data.rating,
                    description: data.description
                })
            })

            if (!res.ok) {
                alert((await res.json()).message);
                return;
            }

            setShowForm(!showForm)

        } catch (e:any) {
            console.error(e)
            alert(e.message)
        }
    }

    return (
        <div className="flex flex-col w-full md:w-2/3 lg:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex-col my-2 space-y-2">
                <input type="number" min="1" max="5" {...register('rating', {required: true, min: 1, max: 5})} 
                    placeholder="Rating" 
                    className="rounded text-black outline outline-slate-300 my-1 w-[100px] indent-2.5">
                </input>
                <input {...register('description', {required: true})} 
                    placeholder="Add a description" 
                    className="rounded text-black outline outline-slate-300 my-1 w-full indent-2.5">
                </input>
                <br />
                <div className="flex flex-row w-full space-x-2 mt-2">
                    <button 
                        type="submit" 
                        className="rounded hover:bg-neutral-200 outline outline-1 -outline-offset-1 py-1 px-2 w-1/2">
                            Add Review
                    </button>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        className="rounded bg-slate-900 py-1 px-2 text-white w-1/2">
                            Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}