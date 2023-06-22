import Image from "next/image"

interface DataObj {
    _id: string
    brand: string
    title: string
    gender: string
    price: string
    rei_avg_rating: string
    rei_images: string[]
    rei_href: string
}
interface ReviewObj {
    _id: string
    username: string
    rating: number
    description: string
    product_id: string
}

export default function ProductDetail(
    { data, reviews }:{ data:DataObj, reviews:ReviewObj[] }
){
    const { brand, title, gender, price, rei_avg_rating, rei_images, rei_href } = data

    const productTags = ["trail", "rock plate", "sturdy", "heavy"]
    const reviewTags = ["running", "scrambling"]

    const featuredImgId = rei_images[0].match(/(?<=media\/)(.*)(?=\.jpg)/)
    let featuredImgURL = ''

    if (featuredImgId){
        featuredImgURL = process.env.CLOUDINARY_DOMAIN + featuredImgId[0] + '.jpg'
    }

    const tagsList = 
    (tags:string[]):any => {
        return (
            tags.map((tag) =>
                <span 
                    key={tag} 
                    className="bg-neutral-200 mr-2 text-sm rounded text-neutral-600 px-1"
                >
                    {tag}
                </span>
            )
        )
    }

    const allReviews = reviews
    .map(review =>
        <div>
            <h3 className="font-bold">{review.username}</h3>
            <h5>{review.rating}</h5>
            <div>
                {tagsList(reviewTags)}
            </div>
            <p>{review.description}</p>
        </div>
    )

    return (
        <div className="flex flex-col items-center p-8 space-y-8 h-full lg:w-1/2 md:w-2/3 w-5/6">
            <h1 className="text-4xl">{brand}</h1>
            <h3 className="text-2xl text-center">{title}</h3>
            <Image 
                src={featuredImgURL} 
                alt={`${title} product image`}
                width={500}
                height={500}
                className="m-2"
            />
            <p>{gender} | {price}</p>
            <div>
                {tagsList(productTags)}
            </div>
            <h5>Rating: {rei_avg_rating}</h5>
            <hr className="h-1 w-full"/>
            <div className="flex flex-col items-start space-y-4 w-full">
                <h3 className="text-2xl">Reviews:</h3>
                {allReviews}
            </div>
        </div>
    )

}