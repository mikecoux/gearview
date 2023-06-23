'use client'

import ReviewCard from "./ReviewCard"
import ReviewForm from "./ReviewForm"
import { useState } from "react"

interface ReviewObj {
    _id: string
    username: string
    rating: number
    description: string
    product_id: string
}

export default function ProductReviews({ data }:{ data:ReviewObj[] }) {
    const [showForm, setShowForm] = useState<boolean>(false)

    const reviewTags = ["running", "scrambling"]

    const allReviews = data.map(review => <ReviewCard key={review._id} data={review} tags={reviewTags} />)

    return ( 
        <>
            <div className="flex flex-row space-x-8">
                <h3 className="text-2xl">Reviews:</h3>
                {!showForm ? 
                    <button 
                    className="rounded bg-slate-900 py-1 px-2 text-white"
                    onClick={() => setShowForm(!showForm)}
                    >
                    Add Review
                    </button> 
                : null }
            </div>
            <div className="space-y-4">
                {showForm ? <ReviewForm showForm={showForm} setShowForm={setShowForm} /> : null}
                {allReviews}
            </div>
        </>
    )
}