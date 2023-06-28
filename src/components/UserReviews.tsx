import ReviewCard from "./ReviewCard"

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
        <div className="w-5/6 md:w-2/3 lg:w-1/2 space-y-4">
            <h3 className="text-2xl">Your reviews...</h3>
            {allReviews}
        </div>
    )
}