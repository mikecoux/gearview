import algoliaClient from "@/lib/algolia";
import { NextResponse } from "next/server";

// Get search results from Algolia

export async function GET(
    req: Request,
    { params }: { params: { q: string } }
) {
    const index = algoliaClient.initIndex("gearview_products")
    const results = await index.search(params.q, {
        attributesToRetrieve: ['brand', 'title', 'objectID']
    })

    return NextResponse.json(results.hits)

}