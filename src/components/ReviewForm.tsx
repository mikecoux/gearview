'use client'

import { useForm } from "react-hook-form"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react";
import { useState } from "react"
import { postReview, getReviews } from "@/lib/clientRequests";

export default function ReviewForm(
    { showForm, setShowForm, setReviewData }
    : { showForm:boolean, setShowForm:any, setReviewData:any }
) {
    const { register, handleSubmit } = useForm()
    const currentProduct = usePathname().split('/')[2]
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false)

    // Why can't I apply an interface to 'data'??
    const onSubmit = async (data:any) => {
        // set the loading state
        setIsLoading(true)

        // post review with productId, user, and review data as params
        const res = await postReview(currentProduct, session?.user, data)

        // Waits for response of successful review post
        // re-fetch product reviews
        // update state with new reviews
        // hide the form
        if (res.insertedId) {
            const newReviews = await getReviews(currentProduct)
            setReviewData(newReviews.documents)
            setShowForm(!showForm)
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col w-full md:w-2/3 lg:w-1/2">
            { isLoading ?
                <p>Loading...</p>
            : 
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
            }
        </div>
    )
}