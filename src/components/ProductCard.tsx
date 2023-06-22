import Link from "next/link"
import Image from "next/image"

export default function ProductCard(
    { brand, id, images, title, gender, price, rating }:
    { brand:string, id:string, images:string[], title:string, gender:string, price:string, rating:string }
){
    const productReviews = [
        {
            id: 1,
            username: "mikecoux",
            rating: 3.5,
            description: "Scrambles well, but not comfortable on longer outings.",
            tags: ["running", "scrambling"],
            featured: true,
        },
        {
            id: 2,
            username: "peetah",
            rating: 4,
            description: "My go to trail runner. Fits my narrow foot well.",
            tags: ["daily driver", "trail running", "running"],
            featured: false
        }
    ]

    const productTags = ["trail", "rock plate", "sturdy", "heavy"]

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

    const featuredReview = productReviews
    .filter(review => review.featured === true)
    .map(review =>
        <div>
            <h3 className="font-bold">{review.username}</h3>
            <h5>{review.rating}</h5>
            <div>
                {tagsList(review.tags)}
            </div>
            <p>{review.description}</p>
        </div>
    )

    const featuredImgId = images[0].match(/(?<=media\/)(.*)(?=\.jpg)/)
    let featuredImgURL = ''

    if (featuredImgId){
        featuredImgURL = process.env.CLOUDINARY_DOMAIN + featuredImgId[0] + '.jpg'
    }

    return(
        <Link href={`/products/${id}`} className="lg:w-1/4 md:w-1/3 w-5/6 m-4">
            <div className="flex flex-col items-center shadow-md p-8 space-y-2 h-full">
                <h3 className="text-lg">{brand}</h3>
                <h5>{title}</h5>
                    <Image 
                        src={featuredImgURL} 
                        alt="product image"
                        width={200}
                        height={200}
                        className="m-2"
                    />
                <p>{gender} | {price}</p>
                <div>
                    {tagsList(productTags)}
                </div>
                <h5>Rating: {rating}</h5>
                <hr className="h-1 w-full"/>
                {featuredReview}
            </div>
        </Link>
    )
}