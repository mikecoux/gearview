import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const dataUrl = process.env.CUSTOM_DATA_API_URL ?? ""
const dataKey = process.env.DATA_API_KEY ?? ""

export async function POST (req:Request) {
    // read the request as json
    const { username, email, password } = (await req.json()) as {
        username: string,
        email: string,
        password: string
    }
    
    // hash the password and create a new user obj
    const hashedPassword = await hash(password, 12)
    const user = {
        e: email.toLowerCase(),
        u: username,
        p: hashedPassword
    }

    // post the user using custom Mongo endpoint
    const res = await fetch(dataUrl, {
        method: "POST",
        headers: {
            "api-key": dataKey,
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify(user)
    })

    if (!res.ok) {
        return NextResponse.json(await res.json())
    }

    return NextResponse.json(await res.json())

}