// fetch functions live here
// Include '{ cache: 'no-store' }' in the fetch to get fresh data with each request
// domain prefix not necessary if called from client component

import { Session } from "next-auth";

// Get all products from Mongo
export async function getAllProducts() {
    const res = await fetch("http://localhost:3000/api/products")
    if (!res.ok) {
        throw new Error('Failed to fetch products.');
    }
    return res.json();
}

// Get a specific product from Mongo
export async function getProduct(id:string) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch product.');
    }
    return res.json();
}

// Get all reviews for a given product from Mongo
export async function getProductReviews(productId:string) {
    const res = await fetch(`http://localhost:3000/api/reviews/products/${productId}`)
    if (!res.ok) {
        throw new Error('Failed to fetch product reviews.')
    }
    return res.json()
}

// Get all reviews for a given user from Mongo
export async function getUserReviews (userId:string | null | undefined) {
    const res = await fetch (`http://localhost:3000/api/reviews/users/${userId}`)
    if (!res.ok) {
      throw new Error('Failed to fetch user reviews.');
    }
    return res.json()
}

// Get results for a given query from Algolia
export async function getSearchResults(query:string) {
    const res = await fetch(`http://localhost:3000/api/search/${query}`)
    if (!res.ok) {
        throw new Error("Failed to fetch search results.")
    }
    return res.json()
}

// Post a product review to Mongo
export async function postReview(productId:string, user:Session["user"] | undefined, review:userReviewData) {
    const res = await fetch(`/api/reviews/products/${productId}`, {
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

// Attempt to log in a user with credentials from NextAuth
export async function userLogin(data:LoginData) {
    const res = await fetch('http://localhost:3000/api/login', {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    })

    if (!res.ok) {
        throw new Error("Failed to log in user.")
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

// Check if a user is logged in and has an active session
// Unsure why this only works in the browser
export async function getSession() {
    const res = await fetch('http://localhost:3000/api/session')
    if (!res.ok) {
        throw new Error("Failed to fetch session.")
    }
    return res.json()
}

