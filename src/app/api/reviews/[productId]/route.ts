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