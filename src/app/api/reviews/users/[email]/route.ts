import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Get reviews for a specific user via their email

export async function GET (
    request: Request,
    { params }: { params: { email: string } }
) {
    const client = await clientPromise;
    const coll = client.db('gearview-db').collection('reviews')
    const query = { email: params.email }

    const results = await coll.find(query)
        .toArray();

    return NextResponse.json(results)

}