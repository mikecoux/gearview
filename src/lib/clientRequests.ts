'use client'

import { Session } from "next-auth";

// Post a review to Mongo via Data API
export async function postReview(productId:string, user:Session["user"] | undefined, review:ReviewObj) {
    const prod = await fetch(`/api/products/${productId}`)

    if (!prod.ok) {
        throw new Error("Failed to fetching matching product.")
    }

    const prodData = await prod.json()

    const res = await fetch(`/api/reviews/${productId}`, {
        credentials: "include",
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            id: user?.id,
            email: user?.email,
            username: user?.username,
            rating: review.rating,
            description: review.description,
            product_brand: prodData.document.brand,
            product_title: prodData.document.title,
            voting_users: [],
            num_votes: 0
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

// update a review after a user votes or modifies
export async function updateReview(reviewId:string, review:EditReviewData) {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            rating: review.rating,
            description: review.description,
            num_votes: review.num_votes,
            voting_users: review.voting_users
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

// Find a user by id
export async function userLoginById(userId:string) {
    const res = await fetch (`/api/login/${userId}`)

    if (!res.ok) {
        throw new Error("Failed to get user.")
    }

    return res.json()
}