'use client'

import TagsList from "./TagsList"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { deleteReview, updateReview } from "@/lib/clientRequests"
import { useSession } from "next-auth/react"
import { useNotification } from "@/app/providers"

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
        <div className="hover:shadow-md p-4">
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
    // Use context to create an alert if a user tries to 
    // vote and isn't signed in
    const dispatch:any = useNotification()

    // Only logged in users can vote
    const { data: session } = useSession();

    // Only allow users to vote up/down one time
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)
    
    const onDelete = () => {
        deleteReview(id)
        setIsHidden(true)
    }

    const onVote = (vote:number) => {
        if (!session) {
            fireAlert()
        }

        let numVotes = parseInt(reviewData['votes'] ?? "0");
        let newVotes = 0;

        if (vote===1) {
            newVotes = onUpVote(numVotes)

        } else if (vote===2) {
            newVotes = onDownVote(numVotes)
        }

        setReviewData( (reviewData:EditData) => {
            return {
                ...reviewData,
                'votes': newVotes.toString()
            }
        })

    }

    // use the dispatch passed via context 
    // to send a notification
    const fireAlert = () => {
        dispatch({
            type: "ERROR",
            message: "Must be logged in to vote."
        })
    }
    
    // increment accordingly
    const onUpVote = (numVotes:number) => {

        if (session && upVoted) {
            numVotes -= 1
            setUpVoted(false)
        }

        if (session && (!upVoted && !downVoted)) {
            numVotes += 1
            setUpVoted(true)
            setDownVoted(false)

        } else if (session && (!upVoted && downVoted)) {
            numVotes += 2
            setUpVoted(true)
            setDownVoted(false)
        }
        
        return numVotes
    }

    // decrement accordingly
    const onDownVote = (numVotes:number) => {

        if (session && downVoted) {
            numVotes += 1
            setDownVoted(false)
        }

        if (session && (!downVoted && !upVoted)) {
            numVotes -= 1
            setDownVoted(true)
            setUpVoted(false)

        } else if (session && (!downVoted && upVoted)) {
            numVotes -= 2
            setDownVoted(true)
            setUpVoted(false)
        }
        
        return numVotes

    }

    return (
        <div className="flex flex-row justify-between">
            <div className="w-[90%] space-y-1">
                <h5 className="text-2xl">{reviewData.rating}</h5>
                <div>
                    <TagsList data={tags} />
                </div>
                <p>{reviewData.description}</p>
                {canEdit ?
                    <div className="flex flex-row space-x-2 items-center w-1/2 md:w-1/3 mt-2">
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
                        onClick={() => onVote(1)}
                        className=""
                    >
                        { upVoted ? "▲" : "△" }
                    </button>
                    <span className="">
                        {reviewData.votes ?? "0"}
                    </span>
                    <button
                        onClick={() => onVote(2)}
                        className=""
                    >
                        {downVoted ? "▼" : "▽" }
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