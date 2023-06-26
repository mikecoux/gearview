import ProductDetail from "@/components/ProductDetail";
import { getProduct, getProductReviews } from "@/lib/requests";

export default async function DetailPage ({ params }: { params: { id: string } }) {
    const productData = await getProduct(params.id)
    const reviewData = await getProductReviews(params.id)

    return (
        <div className="flex justify-center">
            <ProductDetail data={productData} reviews={reviewData} />
        </div>
    )
}