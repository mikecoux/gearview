import Link from "next/link"
import Image from "next/image"

export default function ProductCard(){
    const sampleProduct = {
        id: 1,
        brand: "La Sportiva",
        name: "Bushido 2",
        rating: 4,
        price: 100.00,
        size_us: 9,
        gender: "Men's",
        description: "This shoe can conquer technical trails, muddy terrain, but is not necessarily built for the long haul.",
        tags: ["trail", "rock plate", "sturdy", "heavy"],
        img: "/assets/fillerimg.png",
        reviews: [
            {
                id: 1,
                username: "mikecoux",
                rating: 3.5,
                description: "Scrambles well, but not comfortable on longer outings.",
                tags: ["running", "scrambling"],
                featured: true,
            },
            {
                id: 2,
                username: "peetah",
                rating: 4,
                description: "My go to trail runner. Fits my narrow foot well.",
                tags: ["daily driver", "trail running", "running"],
                featured: false
            }
        ]
    }

    const tagsList = 
    (tags:string[]):any => {
        tags.map((tag) =>
            <span 
                key={tag} 
                className="bg-neutral-200 mr-2 text-sm rounded text-neutral-600 px-1"
            >
                {tag}
            </span>
        )
    }

    const featuredReview =
    sampleProduct.reviews
    .filter(review => review.featured === true)
    .map(review =>
        <div>
            <h3>{review.username}</h3>
            <div>
                {tagsList(review.tags)}
            </div>
            <p>{review.description}</p>
        </div>
    )

    return(
        <Link href={`/products/${sampleProduct.id}`}>
            <div>
                <h3>{sampleProduct.brand}</h3>
                <h5>{sampleProduct.name}</h5>
                <Image src={'/assets/fillerimg.png'} alt="product image" height={200} width={200} />
                <p>{sampleProduct.gender} Size: {sampleProduct.size_us} ${sampleProduct.price}</p>
                <div>
                    {tagsList(sampleProduct.tags)}
                </div>
                <h5>Rating: {sampleProduct.rating}</h5>
                {featuredReview}
            </div>
        </Link>
    )
}