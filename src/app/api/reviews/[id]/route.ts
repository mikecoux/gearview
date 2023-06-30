import { NextResponse } from "next/server";

const dataUrl = process.env.BASE_DATA_API_URL
const dataKey = process.env.DATA_API_KEY ?? ""

export async function GET (
    req: Request,
    { params }: { params: { id: string }}
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
    const { id, username, rating, description, num_votes, voting_users, product_brand, product_title } = (await req.json()) as {
        id: string | null | undefined,
        username: string | null | undefined,
        rating: string,
        description: string,
        num_votes: number,
        voting_users: ReviewObj["voting_users"]
        product_brand: string,
        product_title: string
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
                num_votes: num_votes,
                voting_users: voting_users,
                user_id: id,
                product_id: params.id,
                product_brand: product_brand,
                product_title: product_title
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
    const { rating, description, num_votes, voting_users } = (await req.json()) as {
        rating: number,
        description: string,
        num_votes: number,
        voting_users: ReviewObj["voting_users"]
    }

    const revId = { $oid: params.id }
    const query = { $set: { rating: rating, description: description, num_votes: num_votes, voting_users: voting_users }}

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