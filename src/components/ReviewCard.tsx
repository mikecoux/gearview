'use client'

import TagsList from "./TagsList"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { deleteReview, updateReview } from "@/lib/clientRequests"
import { useSession } from "next-auth/react"
interface EditData {
    rating: string
    description: string
    votes?: string
}

/**
 * Need to:
 * add dynamic review tags
 * change username to the product reviewed
 * add voting - highlight review should have the most votes 
 * add loading states when patching
 */

// Returns either the static review component or a form that \
// defaults to the same values to appear as if you are editing the \
// fields directly.
export default function ReviewCard(
    { data, tags, canEdit, canVote }: { data:ReviewObj, tags:string[], canEdit:boolean, canVote:boolean }
) {
    const [showEditForm, setShowEditForm] = useState<number>(0);
    const [isHidden, setIsHidden] = useState(false);
    const [reviewData, setReviewData] = useState({
        rating: data.rating,
        description: data.description,
        votes: data.votes
    })

    if (isHidden) {
        return null
    }

    return (
        <div>
            {data.username ?
                <h3 className="font-bold">{data.username}</h3>
            :
                <h3 className="font-bold">&#40;anonymous&#41;</h3>
            }
            {
                {
                    0: <Review 
                            id={data._id}
                            reviewData={reviewData} 
                            setReviewData={setReviewData}
                            tags={tags} 
                            canEdit={canEdit}
                            canVote={canVote} 
                            setShowEditForm={setShowEditForm}
                            setIsHidden={setIsHidden}
                        />,
                    1: <ReviewEditForm 
                            id={data._id}
                            reviewData={reviewData} 
                            setReviewData={setReviewData}
                            tags={tags} 
                            setShowEditForm={setShowEditForm}
                        />
                } [showEditForm]
            }
        </div>
        
    )
}

// Returns the core review component
// Shows edit/delete buttons when rendered on profile page
// Shows voting buttons when rendered on product detail page
function Review (
    { id, reviewData, setReviewData, tags, canEdit, canVote, setShowEditForm, setIsHidden }: 
    { id:string, reviewData:EditData, setReviewData:any, tags:string[], canEdit:boolean, canVote:boolean, setShowEditForm:any, setIsHidden:any }
) {
    // Only logged in users can vote
    const { data: session } = useSession();

    // Only allow users to vote up/down one time
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)
    
    const onDelete = () => {
        deleteReview(id)
        setIsHidden(true)
    }
    
    // check what the user has voted for and increment accordingly
    const onUpVote = () => {
        if (session && (!upVoted && !downVoted)) {
            let numVotes = parseInt(reviewData['votes'] ?? "0")

            setReviewData(
                { 
                    ...reviewData, 
                    'votes': (numVotes += 1).toString()
                }
            )

            setUpVoted(true)
            setDownVoted(false)

        } else if (session && (!upVoted && downVoted)) {
            let numVotes = parseInt(reviewData['votes'] ?? "0")

            setReviewData(
                { 
                    ...reviewData, 
                    'votes': (numVotes += 2).toString()
                }
            )

            setUpVoted(true)
            setDownVoted(false)
        }
    }

    // check what the user has voted for and decrement accordingly
    const onDownVote = () => {
        if (session && (!downVoted && !upVoted)) {
            let numVotes = parseInt(reviewData['votes'] ?? "0")

            setReviewData(
                { 
                    ...reviewData, 
                    'votes': (numVotes -= 1).toString()
                }
            )
            
            setDownVoted(true)
            setUpVoted(false)

        } else if (session && (!downVoted && upVoted)) {
            let numVotes = parseInt(reviewData['votes'] ?? "0")

            setReviewData(
                { 
                    ...reviewData, 
                    'votes': (numVotes -= 2).toString()
                }
            )

            setDownVoted(true)
            setUpVoted(false)
            
        }
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="w-[90%]">
                <h5>{reviewData.rating}</h5>
                <div>
                    <TagsList data={tags} />
                </div>
                <p>{reviewData.description}</p>
                {canEdit ?
                    <div className="flex flex-row space-x-2 h-[10%] items-center lg:w-1/4">
                        <button 
                            className="bg-white rounded hover:bg-neutral-200 py-1 px-2 outline outline-1 -outline-offset-1 text-black w-1/2 h-fit"
                            onClick={() => setShowEditForm(1)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-slate-900 rounded text-white py-1 px-2 w-1/2 my-1 h-fit"
                            onClick={() => onDelete()}
                        >
                            Delete
                        </button>
                    </div>             
                : null
                }
            </div>
            {canVote ?
                <div className="flex flex-col items-center">
                    <button
                        onClick={() => onUpVote()}
                    >
                        Up
                    </button>
                    <span>
                        {reviewData.votes ?? "0"}
                    </span>
                    <button
                        onClick={() => onDownVote()}
                    >
                        Down
                    </button>
                </div>
            : null
            }
        </div>
    )
}

// Review form mirrors the core review component
function ReviewEditForm (
    { id, reviewData, setReviewData, tags, setShowEditForm }: 
    { id:string, reviewData:EditData, setReviewData:any, tags:string[], setShowEditForm:any }
) {
    // extends useForm to add defaults??
    const methods = useForm({
        mode: "onSubmit",
        defaultValues: {
            rating: reviewData.rating,
            description: reviewData.description
        }
    })

    const onSubmit = () => {
        const updates:EditData = methods.getValues()
        updates['votes'] = reviewData.votes
        updateReview(id, updates)
        setReviewData(updates)
        setShowEditForm(0)
    }

    return (
        <form 
            onSubmit={methods.handleSubmit(onSubmit)} 
            className="flex flex-col"
        >
            <input 
                {...methods.register('rating', {required: true, min: 1, max: 5})} 
                type="number" 
                name="rating"
                min="1"
                max="5"
                className="w-[100px]"
            >
            </input>
            <input 
                {...methods.register('description', {required: true})} 
                type="text" 
                name="description"
                className="w-full"
            >
            </input>
            <div 
                className="flex flex-row space-x-2 h-[10%] items-center">
                <button 
                    type="submit"
                    className="bg-white rounded hover:bg-neutral-200 py-1 px-2 outline outline-1 -outline-offset-1 text-black w-[48.5%] my-1"
                >
                    Save
                </button>
            </div>
        </form>
    )
}