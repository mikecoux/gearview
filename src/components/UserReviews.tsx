'use client'

import ReviewCard from "./ReviewCard"

interface ReviewObj {
    _id: string
    email?: string
    username?: string
    rating: string
    description: string
    product_id: string
}

export default function UserReviews (
    { data }: { data:ReviewObj[] }
) {
    const reviewTags = ["running", "scrambling"]

    const allReviews = data.map(review => 
        <ReviewCard 
            key={review._id} 
            data={review} 
            tags={reviewTags} 
            canEdit={true}
        />)


    return (
        <div>
            <h3 className="text-2xl">Reviews:</h3>
            {allReviews}
        </div>
    )
}