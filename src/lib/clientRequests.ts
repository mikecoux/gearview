'use client'

import { Session } from "next-auth";

// Post a review to Mongo via Data API
export async function postReview(productId:string, user:Session["user"] | undefined, review:userReviewData) {
    const res = await fetch(`/api/reviews/${productId}`, {
        credentials: "include",
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            id: user?.id,
            email: user?.email,
            username: user?.username,
            rating: review.rating,
            description: review.description
        })
    })
    if (!res.ok) {
        throw new Error("Failed to post review.")
    }
    return res.json()
}

// Fetch product reviews from Mongo via Data API
export async function getReviews(productId:string) {
    const res = await fetch(`/api/reviews/${productId}`)

    if (!res.ok) {
        throw new Error("Failed to get reviews.")
    }
    return res.json()
}