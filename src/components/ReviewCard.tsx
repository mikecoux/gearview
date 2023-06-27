'use client'

import TagsList from "./TagsList"
import { useState } from "react"
import { useForm } from "react-hook-form"

// Returns either the static review component or a form that \
// defaults to the same values to appear as if you are editing the \
// fields directly.
export default function ReviewCard(
    { data, tags, canEdit }: { data:ReviewObj, tags:string[], canEdit:boolean }
) {
    const [showEditForm, setShowEditForm] = useState<number>(0)

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
                            data={data} 
                            tags={tags} 
                            canEdit={canEdit} 
                            setShowEditForm={setShowEditForm}
                        />,
                    1: <ReviewEditForm 
                            data={data} 
                            tags={tags} 
                            setShowEditForm={setShowEditForm}
                        />
                } [showEditForm]
            }
        </div>
        
    )
}

// Returns the static review component
// Shows edit/delete buttons when rendered on profile page
function Review (
    { data, tags, canEdit, setShowEditForm }: 
    { data:ReviewObj, tags:string[], canEdit:boolean, setShowEditForm:any }
) {

    function deleteReview() {
        console.log('deleted')
    }

    return (
        <div>
            <h5>{data.rating}</h5>
            <div>
                <TagsList data={tags} />
            </div>
            <p>{data.description}</p>
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
                        onClick={() => deleteReview()}
                    >
                        Delete
                    </button>
                </div>             
            : null
            }
        </div>
    )
}

// Review form mirrors the static review component
function ReviewEditForm (
    { data, tags, setShowEditForm }: 
    { data:ReviewObj, tags:string[], setShowEditForm:any }
) {
    // extends useForm to add defaults??
    const methods = useForm({
        mode: "onSubmit",
        defaultValues: {
            rating: data.rating,
            description: data.description
        }
    })

    const onSubmit = () => {
        console.log(methods.getValues())
        setShowEditForm(0)
    }

    return (
        <form 
            onSubmit={methods.handleSubmit(onSubmit)} 
            className="flex flex-col"
        >
            <input 
                {...methods.register('rating')} 
                type="text" 
                name="rating"
                className="w-fit"
            >
            </input>
            <input 
                {...methods.register('description')} 
                type="text" 
                name="description"
                className="w-fit"
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