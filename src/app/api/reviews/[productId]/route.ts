import { NextResponse } from "next/server";

const dataUrl = process.env.BASE_DATA_API_URL
const dataKey = process.env.DATA_API_KEY ?? ""

export async function GET (
    req: Request,
    { params }: { params: { productId: string } }
) {

    const res = await fetch(`${dataUrl}/action/find`, {
        method: "POST",
        headers: {
            "api-key": dataKey,
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify({
            collection: 'reviews',
            database: 'gearview-db',
            dataSource: 'GearviewStarterCluster',
            filter: {
                product_id: params.productId
            }
        })
    })

    const reviews = await res.json()

    return NextResponse.json(reviews)

}

export async function POST (
    req: Request,
    { params }: { params: { productId: string } }
) {

    const { id, email, username, rating, description } = (await req.json()) as {
        id: string | null | undefined,
        email: string | null | undefined,
        username: string | null | undefined,
        rating: string,
        description: string
    }

    const res = await fetch(`${dataUrl}/action/insertOne`, {
        method: "POST",
        headers: {
            "api-key": dataKey,
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify({
            collection: 'reviews',
            database: 'gearview-db',
            dataSource: 'GearviewStarterCluster',
            document: {
                username: username,
                rating: rating,
                description: description,
                email: email,
                user_id: id,
                product_id: params.productId
            }
        })
    })

    const newPost = await res.json()

    return NextResponse.json(newPost)

}