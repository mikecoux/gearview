import ProductCard from "@/components/ProductCard";
import { getAllProducts, getAllReviews } from "@/lib/serverRequests";

export default async function Browse(){
    const allProducts:any = await getAllProducts()
    const allReviews:any = await getAllReviews()

    // allReviews.forEach((review:ReviewObj) => {
    //     console.log(typeof review.product_id)
    // })

    const allProductCards = allProducts.map((product:ProductObj) => {

        const sortedReviews = allReviews
            .filter((review:ReviewObj) => {
                return review.product_id === product._id.toString()
            })
            .sort((a:ReviewObj, b:ReviewObj) => b.num_votes - a.num_votes)

        return <ProductCard
            key={product._id}
            id={product._id}
            brand={product.brand}
            images={product.rei_images}
            title={product.title}
            gender={product.gender}
            price={product.price}
            rating={product.rei_avg_rating}
            highlight={sortedReviews[0]}
        />
    })

    return(
        <div className="flex flex-row flex-wrap justify-center">
            {allProductCards}
        </div>
    )
}