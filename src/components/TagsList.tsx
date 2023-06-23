export default function TagsList (
    { data }: { data:string[] }
) {
    return (
        data.map((tag) =>
                <span 
                    key={tag} 
                    className="bg-neutral-200 mr-2 text-sm rounded text-neutral-600 px-1"
                >
                    {tag}
                </span>
            )
    )
}