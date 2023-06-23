import TagsList from "./TagsList"

interface ReviewObj {
    _id: string
    username: string
    rating: number
    description: string
    product_id: string
}

export default function ReviewCard(
    { data, tags }: { data:ReviewObj, tags:string[] }
) {
    return (
        <div>
            <h3 className="font-bold">{data.username}</h3>
            <h5>{data.rating}</h5>
            <div>
                <TagsList data={tags} />
            </div>
            <p>{data.description}</p>
        </div>
    )
}