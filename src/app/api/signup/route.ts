import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST (req:Request) {
    try {
        // read the request as json
        const {username, email, password} = (await req.json()) as {
            username: string,
            email: string,
            password: string
        }
        
        // hash the password and create a new user obj
        const hashedPassword = await hash(password, 12)
        const user = {
            email: email.toLowerCase(),
            username: username,
            password: hashedPassword
        }

        // connect to the Mongo 'users' collection
        const client = await clientPromise;
        const coll = client.db("gearview-db").collection('users')
        
        // post the user to Mongo if the email is unique
        await coll.createIndex('email', { unique: true })
        const result = await coll.insertOne(user)

        return NextResponse.json({
            connected: result.acknowledged,
            user: result.insertedId
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