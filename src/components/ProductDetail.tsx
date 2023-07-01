import Image from "next/image"
import TagsList from "./TagsList"
import ProductReviews from "./ProductReviews"

export default function ProductDetail(
    { data, reviews, session }:{ data:ProductObj, reviews:ReviewObj[], session:any }
){
    const { brand, title, gender, price, rei_avg_rating, rei_images, rei_href } = data

    // Serialize the value of _id before passing to client component
    const newReviews = reviews.map(review => ({
        ...review,
        _id: review._id.toString()
    }))

    const productTags = ["trail", "rock plate", "sturdy", "heavy"]

    return (
        <div className="flex flex-col items-center p-8 space-y-4 h-full lg:w-1/2 md:w-2/3 w-11/12">
            <h1 className="text-4xl font-bold">{brand}</h1>
            <h3 className="text-2xl text-center">{title}</h3>
            <Image 
                src={rei_images[0]} 
                alt={`${title} product image`}
                width={500}
                height={500}
                className="m-2"
            />
            <p>{gender} | {price}</p>
            <div>
                <TagsList data={productTags} />
            </div>
            <h5>REI Rating: {rei_avg_rating}</h5>
            <hr className="h-1 w-full"/>
            <div className="flex flex-col items-start space-y-4 w-full">
                <ProductReviews reviews={newReviews} session={session}/>
            </div>
        </div>
    )

}