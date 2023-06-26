import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Get reviews for a specific productId
export async function GET (
    request: Request,
    { params }: { params: { productId: string } }
) {
    const client = await clientPromise;
    const coll = client.db('gearview-db').collection('reviews')
    const query = { product_id: params.productId }

    const results = await coll.find(query)
        .toArray();

    return NextResponse.json(results)
}

// Post reviews to a product
export async function POST (
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        // destructure the request and assign types
        const { id, email, username, rating, description } = (await req.json()) as {
            id: string | null | undefined,
            email: string | null | undefined,
            username: string | null | undefined,
            rating: string,
            description: string
        }

        const client = await clientPromise;
        const coll = client.db('gearview-db').collection('reviews')
        
        const result = await coll.insertOne({
            username: username,
            rating: rating,
            description: description,
            email: email,
            user_id: id,
            product_id: params.productId
        });

        return NextResponse.json({
            connected: result.acknowledged,
            review: result.insertedId
        })
    
    } catch (e:any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: e.message
            }),
            { status: 500 }
        )
    }

}