import ProductCard from "@/components/ProductCard";

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

interface SearchResult {
    brand: string
    title: string
    objectID: string
    _highlightResult: any
}

async function getSearchResults(query:string) {
    const res = await fetch(`http://localhost:3000/api/search/${query}`)
    if (!res.ok) {
        throw new Error("Failed to fetch products.")
    }
    return res.json()
}

async function getAllProducts() {
    const res = await fetch("http://localhost:3000/api/products")
    if (!res.ok) {
        throw new Error('Failed to fetch products.');
    }
    return res.json();
}

export default async function Search({ 
    searchParams 
}: { searchParams: { [key: string]: string } 
}) {

    // Get a list of ordered product IDs from Algolia based on the search term
    const searchResults = await getSearchResults(searchParams.q)
    // Get all products from Mongo
    const allProducts = await getAllProducts()

    // Iterate over each search result and find the corresponding product
    // Append the matched product to a new list
    const filteredProducts:ProductObj[] = []
    searchResults.forEach((result:SearchResult) => {
        const matchedProduct = allProducts.find((product:ProductObj) => result.objectID === product._id)
        filteredProducts.push(matchedProduct)
    })

    const filteredProductCards = filteredProducts.map((product:ProductObj) => {
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

    return (
        <div className="flex flex-col justify-center my-8">
            <h1 className="text-4xl text-center">Results for: {`${searchParams.q}`}</h1>
            <div className="flex flex-row flex-wrap justify-center">
                {filteredProductCards}
            </div>
        </div>
    )
}