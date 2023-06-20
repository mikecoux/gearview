import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Get all products

export async function GET () {
    const client = await clientPromise;
    const coll = client.db("gearview-db").collection('products')
    
    const results = await coll.find({})
        .toArray();

    return NextResponse.json(results)
}