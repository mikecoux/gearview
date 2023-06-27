import ProductDetail from "@/components/ProductDetail";
import { getProduct, getProductReviews } from "@/lib/serverRequests";

export default async function DetailPage ({ params }: { params: { id: string } }) {
    const productData:any = await getProduct(params.id)
    const reviewData:any = await getProductReviews(params.id)

    return (
        <div className="flex justify-center">
            <ProductDetail data={productData} reviews={reviewData} />
        </div>
    )
}