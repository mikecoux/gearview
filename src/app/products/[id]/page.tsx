import ProductDetail from "@/components/ProductDetail";

async function getProduct(id:string) {
    // Include '{ cache: 'no-store' }' in the fetch to get fresh data with each request
    const res = await fetch(`http://localhost:5050/products/${id}`)

    if (!res.ok) {
        throw new Error('Failed to fetch products.');
    }

    return res.json();
}

export default async function DetailPage ({ params }: { params: { id: string } }) {
    const productData = await getProduct(params.id)

    return (
        <div className="flex justify-center">
            <ProductDetail data={productData}/>
        </div>
    )
}