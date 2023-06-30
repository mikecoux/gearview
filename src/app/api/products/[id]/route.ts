import { NextResponse } from "next/server";

const dataUrl = process.env.BASE_DATA_API_URL
const dataKey = process.env.DATA_API_KEY ?? ""

export async function GET (
    req: Request,
    { params }: { params: { id: string }}
) {
    const prodId = { $oid: params.id }

    const res = await fetch(`${dataUrl}/action/findOne`, {
        method: "POST",
        headers: {
            "api-key": dataKey,
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify({
            collection: 'products',
            database: 'gearview-db',
            dataSource: 'GearviewStarterCluster',
            filter: {
                _id: prodId
            }
        })
    })

    const product = await res.json()
    return NextResponse.json(product)
}