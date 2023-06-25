'use client'

import { useForm } from 'react-hook-form'
import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface SearchInput {
    [q: string]: string
}

export default function SearchBar(){
    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const searchParams:any = useSearchParams()!

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (data:SearchInput) => {
        const params = new URLSearchParams(searchParams)
        for (let key in data){
            params.set(key, data[key])
        }
    
        return params.toString()
        },
        [searchParams]
    )

    // data is returned from react-hook-form as an object
    // keys are set to the name the input is "registered" with
    // on form submit, the keys and values are appended to the query string
    const onSubmit = (data:SearchInput) => {
        router.push('/search' + "?" + createQueryString(data))
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className='absolute left-1/2 top-4 -translate-y-1/2 -translate-x-1/2 flex flex-row items-center space-x-4 shadow-md w-4/6 md:w-full'>
            <input {...register("q", {required: true})} 
                type="text" 
                placeholder='Search for brands, products, reviewers...'
                className='indent-2 outline-none bg-transparent'
            />
            <button type='submit'>
                <div className='outline outline-2 -outline-offset-1 rounded h-35 w-35 p-1' >
                    <Image src="/assets/search-icon.png" alt="click to search" height={25} width={25}/>
                </div>
            </button>
        </form>
    )
}