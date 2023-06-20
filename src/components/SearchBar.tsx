'use client'
import { useForm } from 'react-hook-form'
import Image from 'next/image';

type FormData = {
    searchValue: string;
};

export default function SearchBar(){
    const { register, handleSubmit } = useForm<FormData>()
    const onSubmit = handleSubmit(data => console.log(data))

    return (
        <form onSubmit={onSubmit} className='lg:absolute lg:left-1/2 lg:top-4 lg:-translate-y-1/2 lg:-translate-x-1/2 flex flex-row items-center space-x-4 shadow-md'>
            <input {...register("searchValue")} 
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