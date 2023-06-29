import ProductDetail from "@/components/ProductDetail";
import { getProduct, getProductReviews } from "@/lib/serverRequests";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"


export default async function DetailPage ({ params }: { params: { id: string } }) {
    const productData:any = await getProduct(params.id)
    const reviewData:any = await getProductReviews(params.id)
    const session = await getServerSession(authOptions)

    return (
        <div className="flex justify-center">
            <ProductDetail data={productData} reviews={reviewData} session={session}/>
        </div>
    )
}