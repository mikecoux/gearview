import ProductDetail from "@/components/ProductDetail";

async function getProduct(id:string) {
    // Include '{ cache: 'no-store' }' in the fetch to get fresh data with each request
    const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch products.');
    }
    return res.json();
}

async function getReviews(productId:string) {
    const res = await fetch(`http://localhost:3000/api/reviews/${productId}`)
    if (!res.ok) {
        throw new Error('Failed to fetch reviews.')
    }
    return res.json()
}

export default async function DetailPage ({ params }: { params: { id: string } }) {
    const productData = await getProduct(params.id)
    const reviewData = await getReviews(params.id)

    return (
        <div className="flex justify-center">
            <ProductDetail data={productData} reviews={reviewData} />
        </div>
    )
}