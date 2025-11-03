"use client"
import React, {useState, useEffect}  from 'react'
import {useRouter} from 'next/navigation'

function Header() {

    const router = useRouter();

    const [pokeName, setPokeName] = useState<string>("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokeName(e.target.value);
    }

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(pokeName);
        router.push(`/pokesearch/${pokeName.toLowerCase()}`);
    }
    console.log(pokeName);

  return (
    <header className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 text-white h-[300px] flex items-center justify-center'>
        <div className='text-center'>
            <h1 className='text-white text-5xl font-bold'>NextJS Pokemon Finder</h1>
            <p className='text-white text-2xl'>Find your favorite Pokemon!</p>
            <form action="" className='flex mt-20 justify-center' onSubmit={handleForm}>
                <input
                    type="text"
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-md bg-white focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200'
                    placeholder='Search for a Pokemon...'
                    onChange={handleInput}
                />
                <button
                    type='submit'
                    className='ml-2 rounded-md bg-green-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-green-600'
                >
                    Search
                </button>
            </form>
        </div>
    </header>
  )
}

export default Header