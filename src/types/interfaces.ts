// I would like these interfaces to be used for form submit data
// Won't accept anything but 'any' for some reason

interface userReviewData {
    rating:number
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
    rating: number
    description: string
    product_id: string
    num_votes: number
    voting_users: {
        user_id: string
        vote: {
            up_vote: boolean
            down_vote: boolean
        }
    }[]
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

interface EditReviewData {
    rating: number
    description: string
    num_votes: number
    voting_users: {
        user_id: string
        vote: {
            up_vote: boolean
            down_vote: boolean
        }
    }[]
}