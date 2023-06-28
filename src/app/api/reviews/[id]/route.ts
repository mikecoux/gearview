import { NextResponse } from "next/server";

const dataUrl = process.env.BASE_DATA_API_URL
const dataKey = process.env.DATA_API_KEY ?? ""

export async function GET (
    req: Request,
    { params }: { params: { id: string } }
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
                product_id: params.id
            }
        })
    })

    const reviews = await res.json()
    return NextResponse.json(reviews)
}

export async function POST (
    req: Request,
    { params }: { params: { id: string } }
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
                product_id: params.id
            }
        })
    })

    const newPost = await res.json()
    return NextResponse.json(newPost)
}

export async function DELETE (
    req: Request,
    { params }: { params: { id: string } }
) {
    const revId = { $oid: params.id }

    const res = await fetch(`${dataUrl}/action/deleteOne`, {
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
                _id: revId
            }
        })
    })
    
    const deleted = await res.json()
    return NextResponse.json(deleted.deletedCount)
}

export async function PATCH (
    req: Request,
    { params }: { params: { id: string } }
) {
    const { rating, description, votes } = (await req.json()) as {
        rating: string,
        description: string,
        votes: string
    }

    const revId = { $oid: params.id }
    const query = { $set: { rating: rating, description: description, votes: votes }}

    const res = await fetch(`${dataUrl}/action/updateOne`, {
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
                _id: revId
            },
            update: query,
            upsert: false
        })
    })
    
    const updated = await res.json()
    return NextResponse.json(updated.modifiedCount)
}