import { compare } from "bcryptjs";
import mongoClient from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST (req:Request) {
    try {
        // read the request as json
        const { email, password } = (await req.json()) as {
            email:string
            password:string
        }

        // connect to Mongo 'users' collection
        // lookup user by provided email
        const client = await mongoClient;
        const coll = client.db("gearview-db").collection('users')
        const query = { email: email }
        const userResult = await coll.findOne(query)

        // compare the provided pw with the hashed pw from the Mongo doc
        const checkPassword =  await compare(password, userResult?.password)

        if (userResult && checkPassword) {
            return NextResponse.json(userResult)
        } else {
            return new NextResponse(
                JSON.stringify({
                    status: "error",
                    message: "User doesn't exist with those credentials."
                }),
                { status: 401 }
            )
        }
    } catch(e:any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: e.message
            }),
            { status: 500 }
        )
    }
}