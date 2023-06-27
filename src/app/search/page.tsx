import ProductCard from "@/components/ProductCard";
import { getAllProducts, getSearchResults } from "@/lib/requests";
interface SearchResult {
    brand: string
    title: string
    objectID: string
    _highlightResult: any
}

export default async function Search({ 
    searchParams 
}: { searchParams: { [key: string]: string } 
}) {

    // Get a list of ordered product IDs from Algolia based on the search term
    const searchResults:any = await getSearchResults(searchParams.q)

    // Get all products from Mongo
    // Turn the Mongo id into a string
    const products:any = await getAllProducts()
    const newProducts = products.map((product:ProductObj) => ({
        ...product,
        _id: product._id.toString()
    }))

    // Iterate over each search result and find the corresponding product
    // Append the matched product to a new list
    const filteredProducts:ProductObj[] = []
    searchResults.forEach((result:SearchResult) => {
        const matchedProduct = newProducts.find((product:ProductObj) => {
            return result.objectID === product._id
        })
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
                { filteredProducts.length > 0 ? 
                    filteredProductCards
                : 
                    <p className="mt-4">No results found...</p>
                }
            </div>
        </div>
    )
}