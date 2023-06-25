import TagsList from "./TagsList"

interface ReviewObj {
    _id: string
    email?: string
    username?: string
    rating: string
    description: string
    product_id: string
}

export default function ReviewCard(
    { data, tags, canEdit }: { data:ReviewObj, tags:string[], canEdit:boolean }
) {
    return (
        <div>
            {data.username ?
                <h3 className="font-bold">{data.username}</h3>
            :
                <h3 className="font-bold">&#40;anonymous&#41;</h3>
            }
            <h5>{data.rating}</h5>
            <div>
                <TagsList data={tags} />
            </div>
            <p>{data.description}</p>
        </div>
    )
}