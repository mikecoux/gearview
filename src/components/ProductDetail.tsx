import Image from "next/image"

export default function ProductDetail(
    { data }:{ data: any }){

    const { brand, title, gender, price, rei_avg_rating, rei_images, rei_href } = data

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

    const featuredImgId = rei_images[0].match(/(?<=media\/)(.*)(?=\.jpg)/)
    let featuredImgURL = ''

    if (featuredImgId){
        featuredImgURL = process.env.CLOUDINARY_DOMAIN + featuredImgId[0] + '.jpg'
    }

    const tagsList = 
    (tags:string[]):any => {
        return (
            tags.map((tag) =>
                <span 
                    key={tag} 
                    className="bg-neutral-200 mr-2 text-sm rounded text-neutral-600 px-1"
                >
                    {tag}
                </span>
            )
        )
    }

    const allReviews =
    sampleProduct.reviews
    .map(review =>
        <div>
            <h3 className="font-bold">{review.username}</h3>
            <h5>{review.rating}</h5>
            <div>
                {tagsList(review.tags)}
            </div>
            <p>{review.description}</p>
        </div>
    )

    return (
        <div className="flex flex-col items-center p-8 space-y-8 h-full lg:w-1/2 md:w-2/3 w-5/6">
            <h1 className="text-4xl">{brand}</h1>
            <h3 className="text-2xl text-center">{title}</h3>
            <Image 
                src={featuredImgURL} 
                alt={`${title} product image`}
                width={500}
                height={500}
                className="m-2"
            />
            <p>{gender} | {price}</p>
            {/* <div>
                {tagsList(sampleProduct.tags)}
            </div> */}
            <h5>Rating: {rei_avg_rating}</h5>
            <hr className="h-1 w-full"/>
            <div className="flex flex-col items-start space-y-4 w-full">
                <h3 className="text-2xl">Reviews:</h3>
                {allReviews}
            </div>
        </div>
    )

}