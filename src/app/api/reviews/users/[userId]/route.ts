import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Get reviews for a specific userId

export async function GET (
    request: Request,
    { params }: { params: { userId: string } }
) {
    const client = await clientPromise;
    const coll = client.db('gearview-db').collection('reviews')
    const query = { _id: new ObjectId(params.userId) }

    const results = await coll.find(query)
        .toArray();

    return NextResponse.json(results)

}