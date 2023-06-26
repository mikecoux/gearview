// I would like these interfaces to be used for form submit data
// Won't accept anything but 'any' for some reason

interface userReviewData {
    rating:string
    description:string
}

interface LoginData {
    email: string
    password: string
}

interface SignupData {
    username: string
    email: string
    password: string
}

// Global interfaces

interface ReviewObj {
    _id: string
    email?: string
    username?: string
    rating: string
    description: string
    product_id: string
}

interface ProductObj {
    _id: string
    brand: string
    title: string
    gender: string
    price: string
    rei_avg_rating: string
    rei_images: string[]
    rei_href: string
}