import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Get one product from Mongo

export async function GET (
    request: Request,
    { params }: { params: { id: string } }
    ) {
    const client = await clientPromise;
    const coll = client.db("gearview-db").collection('products')
    const query = { _id: new ObjectId(params.id) }
    
    const result = await coll.findOne(query)

    return NextResponse.json(result)
}