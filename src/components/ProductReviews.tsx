'use client'

import ReviewCard from "./ReviewCard"
import ReviewForm from "./ReviewForm"
import { useState } from "react"

export default function ProductReviews({ data }:{ data:ReviewObj[] }) {
    const [showForm, setShowForm] = useState<boolean>(false)
    const [reviewData, setReviewData] = useState(data)
    const reviewTags = ["running", "scrambling"]

    const allReviews = reviewData.map(review => 
        <ReviewCard 
            key={review._id} 
            data={review} 
            tags={reviewTags} 
            canEdit={false}
        />)

    return ( 
        <>
            <div className="flex flex-row space-x-8">
                <h3 className="text-2xl">Reviews:</h3>
                { !showForm ? 
                    <button 
                        className="rounded bg-slate-900 py-1 px-2 text-white"
                        onClick={() => setShowForm(!showForm)}
                    >
                        Add Review
                    </button> 
                : null }
            </div>
            <div className="space-y-4 w-full">
                { showForm ? 
                    <ReviewForm 
                        showForm={showForm} 
                        setShowForm={setShowForm}
                        setReviewData={setReviewData}
                    /> 
                : null }
                { allReviews }
            </div>
        </>
    )
}