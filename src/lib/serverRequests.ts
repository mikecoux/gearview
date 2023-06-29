import mongoClient from "@/lib/mongodb";
import algoliaClient from "@/lib/algolia";
import { ObjectId } from "mongodb";

/**
 * Cannot make API calls to the server when building for production
 * ^ possibly b/c the server needs the data at build time
 * Cannot make calls to MongoDB from client components
 * when calling the function inside server component have to declare as type 'any'??
 */

// Get all products from Mongo
export async function getAllProducts() {
    try {
        const client = await mongoClient;
        const coll = client.db("gearview-db").collection('products')

        const results = await coll.find({})
            .sort({ rei_rating: -1 })
            .toArray();

        return results

    } catch (err) {
        throw new Error(
            "Failed to fetch all products.", 
            { cause: err }
        )
    }
}

// Get a specific product from Mongo
export async function getProduct(id:string) {
    try {
        const client = await mongoClient;
        const coll = client.db("gearview-db").collection('products')
        const query = { _id: new ObjectId(id) }
        
        const result = await coll.findOne(query)

        return result

    } catch (err) {
        throw new Error(
            "Failed to fetch product.", 
            { cause: err }
        )
    }
}

// Get all reviews for a given product from Mongo
export async function getProductReviews(productId:string) {
    try {
        const client = await mongoClient;
        const coll = client.db('gearview-db').collection('reviews')
        const query = { product_id: productId }

        const results = await coll.find(query)
            .toArray();

        return results

    } catch (err) {
        throw new Error(
            "Failed to fetch reviews for provided product.", 
            { cause: err }
        )
    }
}

// Get all reviews for a given user from Mongo
export async function getUserReviews (userId:string | null | undefined) {
    try {
        const client = await mongoClient;
        const coll = client.db('gearview-db').collection('reviews')
        const query = { user_id: userId }

        const results = await coll.find(query)
            .toArray();

        return results

    } catch (err) {
        throw new Error(
            "Failed to fetch reviews for provided user.", 
            { cause: err }
        )
    }
}

// Get results for a given query from Algolia
export async function getSearchResults(query:string) {
    try {
        const index = algoliaClient.initIndex("gearview_products")
        const results = await index.search(query, {
            attributesToRetrieve: ['brand', 'title', 'objectID']
        })

        return results.hits

    } catch (err) {
        throw new Error(
            "Failed to fetch search results.", 
            { cause: err }
        )
    }
}