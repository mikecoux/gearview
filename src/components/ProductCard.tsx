import Link from "next/link"
import Image from "next/image"
import ReviewHighlight from "./ReviewHighlight"
import TagsList from "./TagsList"
import { getTopProductReview } from "@/lib/serverRequests"

export default async function ProductCard(
    { brand, id, images, title, gender, price, rating, highlight }:
    { brand:string, id:string, images:string[], title:string, gender:string, price:string, rating:string, highlight:ReviewObj }
){

    const productTags = ["trail", "rock plate", "sturdy", "heavy"]

    return(
        <Link href={`/products/${id}`} className="lg:w-1/4 md:w-1/3 w-5/6 m-4">
            <div className="flex flex-col items-center shadow-md p-8 space-y-2 h-full">
                <h3 className="text-lg font-bold">{brand}</h3>
                <h5>{title}</h5>
                    <Image 
                        src={images[0]} 
                        alt="product image"
                        width={200}
                        height={200}
                        className="m-2"
                    />
                <p>{gender} | {price}</p>
                <div>
                    <TagsList data={productTags} />
                </div>
                <h5>REI rating: {rating}</h5>
                <hr className="h-1 w-full"/>
                <ReviewHighlight review={highlight} />
            </div>
        </Link>
    )
}