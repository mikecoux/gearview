import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/requests";
interface ProductObj {
    _id: string
    brand: string
    title: string
    gender: string
    price: string
    rei_avg_rating: string
    rei_images: string[]
    rei_href: string
}

export default async function Browse(){
    const allProducts = await getAllProducts()

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