'use client'

import TagsList from "./TagsList"
import { useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { deleteReview, updateReview } from "@/lib/clientRequests"
import { useNotification } from "@/app/providers"
import { isEqual } from "lodash"

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
    { data, tags, canEdit, canVote, session }: 
    { data:ReviewObj, tags:string[], canEdit:boolean, canVote:boolean, session:any }
) {

    const [showEditForm, setShowEditForm] = useState<number>(0);
    const [isHidden, setIsHidden] = useState(false);
    const [editReviewData, setEditReviewData] = useState<EditReviewData>({
        rating: data.rating,
        description: data.description,
        num_votes: data.num_votes,
        voting_users: data.voting_users
    })
    // – VOTE TYPE KEY – 0: no vote, 1: upvote, 2: downvote
    const [voteType, setVoteType] = useState(checkVote())

    // Save the previous value of state
    // causes a rerender with each vote
    const prevVote = useRef(editReviewData)

    useEffect(() => {

        prevVote.current = editReviewData

    }, [editReviewData])

    if (!isEqual(prevVote.current, editReviewData)) {

        updateReview(data._id, editReviewData)

    }

    function checkVote () {
        
        if (session) {

            const user = editReviewData.voting_users.filter((voter) => {
                return voter.user_id === session.user.id 

            })

            if (user.length > 0) {

                if (user[0].vote.up_vote) {
                    return 1

                } else {
                    return 2

                }     
                   
            } else {
                return 0

            }

        } else {
            return 0

        }
    }

    // hide the review when user deletes
    if (isHidden) {
        return null
    }

    return (
        <div className="p-2 hover:shadow-md">
            { canEdit ?
                <div>
                    <h3 className="text-2xl">{data.product_brand}</h3>
                    <h5 className="italic">{data.product_title}</h5>
                </div>

            :
                data.username ?
                    <h3 className="font-bold">{data.username}</h3>
                :
                    <h3 className="font-bold">&#40;anonymous&#41;</h3>
            }

            {
                {
                    0: <Review 
                            id={data._id}
                            voteType={voteType}
                            setVoteType={setVoteType}
                            editReviewData={editReviewData} 
                            setEditReviewData={setEditReviewData}
                            session={session}
                            tags={tags}
                            canEdit={canEdit}
                            canVote={canVote} 
                            setShowEditForm={setShowEditForm}
                            setIsHidden={setIsHidden}
                        />,
                    1: <ReviewEditForm 
                            editReviewData={editReviewData} 
                            setEditReviewData={setEditReviewData}
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
    { id, voteType, setVoteType, editReviewData, setEditReviewData, tags, canEdit, canVote, setShowEditForm, setIsHidden, session }: 
    { id:string, voteType:number, setVoteType:any, editReviewData:EditReviewData, setEditReviewData:any, tags:string[], canEdit:boolean, canVote:boolean, setShowEditForm:any, setIsHidden:any, session:any }
) {

    // Use context to create an alert if a user tries to 
    // vote and isn't signed in
    const dispatch:any = useNotification()

    // Only logged in users can vote
    // const { data: session } = useSession();
    
    const onDelete = () => {
        deleteReview(id)
        setIsHidden(true)
    }

    // use the dispatch passed via context 
    // to send a notification
    const fireAlert = () => {
        dispatch({
            type: "ERROR",
            message: "Must be logged in to vote."
        })
    }

    const onVote = (vote:number) => {
        if (!session) {
            fireAlert()
            return null
        }

        if (vote===1) {
            onUpVote()

        } else if (vote===2) {
            onDownVote()
        }

    }
    
    // increment accordingly
    const onUpVote = () => {

        switch (voteType) {

            case 0:

                setVoteType(1)
                setEditReviewData((editReviewData:EditReviewData) => {

                    return {
                        ...editReviewData,
                        'num_votes': editReviewData.num_votes + 1,
                        'voting_users': [
                            ...editReviewData.voting_users,
                            {
                                user_id: session.user.id,
                                vote: {
                                    up_vote: true,
                                    down_vote: false
                                }
                
                            }
                        ]
                    }
                })
                break;

            case 1:

                setVoteType(0)
                setEditReviewData((editReviewData:EditReviewData) => {

                    return {
                        ...editReviewData,
                        'num_votes': editReviewData.num_votes - 1,
                        'voting_users': editReviewData.voting_users.filter((voter) => {
                            voter.user_id !== session.user.id
                        })
                    }
                })
                break;

            case 2:

                setVoteType(1)
                setEditReviewData((editReviewData:EditReviewData) => {

                    return {
                        ...editReviewData,
                        'num_votes': editReviewData.num_votes + 2,
                        'voting_users': [
                            editReviewData.voting_users.filter((voter) => {
                                voter.user_id !== session.user.id
                            }),
                            {
                                user_id: session.user.id as string,
                                vote: {
                                    up_vote: true,
                                    down_vote: false
                                }
                
                            }
                        ]
                    }
                })
                break;
        }
    }

    // decrement accordingly
    const onDownVote = () => {


        switch (voteType){
            case 0:

                setVoteType(2)
                setEditReviewData((editReviewData:EditReviewData) => {

                    return {
                        ...editReviewData,
                        'num_votes': editReviewData.num_votes - 1,
                        'voting_users': [
                            ...editReviewData.voting_users,
                            {
                                user_id: session.user.id,
                                vote: {
                                    up_vote: false,
                                    down_vote: true
                                }
                
                            }
                        ]
                    }
                })
                break;

            case 1:

                setVoteType(2)
                setEditReviewData((editReviewData:EditReviewData) => {

                    return {
                        ...editReviewData,
                        'num_votes': editReviewData.num_votes - 2,
                        'voting_users': [
                            editReviewData.voting_users.filter((voter) => {
                                voter.user_id !== session.user.id
                            }),
                            {
                                user_id: session.user.id,
                                vote: {
                                    up_vote: false,
                                    down_vote: true
                                }
                
                            }
                        ]
                    }
                })
                break;

            case 2: 

                setVoteType(0)
                setEditReviewData((editReviewData:EditReviewData) => {

                    return {
                        ...editReviewData,
                        'num_votes': editReviewData.num_votes + 1,
                        'voting_users': editReviewData.voting_users.filter((voter) => {
                            voter.user_id !== session.user.id
                        })
                    }
                })
                break;
        }
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="w-[90%] space-y-1">
                <h5 className="text-2xl">{editReviewData.rating}</h5>
                <div>
                    <TagsList data={tags} />
                </div>
                <p>{editReviewData.description}</p>
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
                        { voteType === 1 ? "▲" : "△" }
                    </button>
                    <span className="">
                        {editReviewData.num_votes}
                    </span>
                    <button
                        onClick={() => onVote(2)}
                        className=""
                    >
                        { voteType === 2 ? "▼" : "▽" }
                    </button>
                </div>
            : null
            }
        </div>
    )
}

// Review form mirrors the core review component
function ReviewEditForm (
    { editReviewData, setEditReviewData, setShowEditForm }: 
    { editReviewData:EditReviewData, setEditReviewData:any, setShowEditForm:any }
) {
    // extends useForm to add defaults??
    const methods = useForm({
        mode: "onSubmit",
        defaultValues: {
            rating: editReviewData.rating,
            description: editReviewData.description
        }
    })

    const onSubmit = () => {
        const updates = methods.getValues()

        setEditReviewData((editReviewData:EditReviewData) => {
            return {
                ...editReviewData,
                'rating': updates.rating,
                'description': updates.description
            }
        })

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
                className="w-full md:w-1/2"
            >
            </input>
            <div 
                className="flex flex-row space-x-2 h-[10%] items-center">
                <button 
                    type="submit"
                    className="bg-slate-900 rounded py-1 px-2 text-white w-1/4 md:w-1/6 my-1"
                >
                    Save
                </button>
            </div>
        </form>
    )
}