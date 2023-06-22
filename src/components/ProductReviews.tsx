'use client'

interface ReviewObj {
    _id: string
    username: string
    product_id: string
    rating: string
    description: string
    img: string
    tags: string[]
    featured: boolean
}

export default function ProductReviews({ data }:{ data:ReviewObj[] }) {
    return (
        <div></div>
    )
}