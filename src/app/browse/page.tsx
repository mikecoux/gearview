import ProductCard from "@/components/ProductCard";
interface ProductObj {
    _id: string
    brand: string
    title: string
    gender: string
    price: string
    rei_average_rating: string
    rei_images: string[]
    rei_href: string
}

async function getProducts() {
    // Not sure why this doesn't work...
    // const res = await fetch("/api/products");
    const res = await fetch("http://localhost:5050/products")

    if (!res.ok) {
        throw new Error('Failed to fetch products.');
    }

    return res.json();
}

export default async function Browse(){
    const allProducts = await getProducts()

    const allProductCards = allProducts.map((product:ProductObj) => {
        return <ProductCard
            key={product._id}
            id={product._id}
            brand={product.brand}
            images={product.rei_images}
        />
    })

    return(
        <div className="flex flex-row flex-wrap justify-center">
            {allProductCards}
        </div>
    )
}