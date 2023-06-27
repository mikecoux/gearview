import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/requests";

export default async function Browse(){
    const allProducts:any = await getAllProducts()

    const allProductCards = allProducts.map((product:ProductObj) => {
        return <ProductCard
            key={product._id}
            id={product._id}
            brand={product.brand}
            images={product.rei_images}
            title={product.title}
            gender={product.gender}
            price={product.price}
            rating={product.rei_avg_rating}
        />
    })

    return(
        <div className="flex flex-row flex-wrap justify-center">
            {allProductCards}
        </div>
    )
}