import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET (request:Request) {
    const client = await clientPromise;
    const coll = client.db("gearview-db").collection('users')
    
    await coll.createIndex('email', { unique: true })

    const password = await hash("password123", 12)
    const user = {
        email: "admin@gearview.com",
        username: "admin",
        password
    }

    try{
        const result = await coll.insertOne(user)

        return NextResponse.json({
            connected: result.acknowledged,
            user: result.insertedId
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json("Admin user already created.")
    }

}