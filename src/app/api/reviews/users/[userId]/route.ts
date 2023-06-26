import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Get reviews for a specific user via their userId

export async function GET (
    request: Request,
    { params }: { params: { userId: string } }
) {
    const client = await clientPromise;
    const coll = client.db('gearview-db').collection('reviews')
    const query = { user_id: params.userId }

    const results = await coll.find(query)
        .toArray();

    return NextResponse.json(results)

}