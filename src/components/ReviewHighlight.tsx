import TagsList from "./TagsList"

export default function ReviewHighlight(
    { review }: { review:ReviewObj }
) {
    const reviewTags = ["running", "scrambling"]

    if (!review) {
        return null
    }

    return (
        <div className="flex flex-col mr-auto">
            <h3 className="font-bold">{review.username}</h3>
            <h5 className="text-2xl">{review.rating}</h5>
            <div>
                <TagsList data={reviewTags} />
            </div>
            <p>{review.description}</p>
        </div>
    )
}