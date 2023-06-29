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

export async function deleteReview(reviewId:string) {
    console.log(reviewId)
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {"Content-Type":"application/json"}
    })

    if (!res.ok) {
        throw new Error("Failed to delete review.")
    }
    return res.json()
}

export async function updateReview(reviewId:string, review:any) {
    console.log(reviewId)
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            rating: review.rating,
            description: review.description,
            votes: review.votes
        })
    })

    if (!res.ok) {
        throw new Error("Failed to delete review.")
    }
    return res.json()
}

// Attempt to sign up a new user
export async function userSignup(data:SignupData) {
    const res = await fetch('/api/signup', {
        credentials: "include",
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password
        })
    })

    if (!res.ok) {
        throw new Error("Failed to sign up user.")
    }

    return res.json()
}