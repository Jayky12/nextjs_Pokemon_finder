"use client"
import React, {useState,useEffect} from 'react'
import {useParams} from 'next/navigation';
import Image from 'next/image'; 
import Link from 'next/link';

function pokeinfo() {

    const params = useParams();
    const [pokemon, setPokemon] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    console.log("Params ID:", params.id);

    useEffect(() => {
           setLoading(true);
           const fetchPokeDetails = async () =>{
               try {
                   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
                   const pokeDetails = await res.json();

                   setPokemon(pokeDetails);
               }catch (error) {
                   console.log(error)
               }
               setLoading(false);
           }
           fetchPokeDetails();
       }, []);


  return (
    <div className="p-24">
        <div>
          <Link href="/" className="bg-blue-500 text-white p-3 rounded-md">Back to Home</Link>
          <div className="flex justify-center mt-10 text-center items-center">
            <div className="shadow-md p-6 rounded-lg border border-gray-200">
                {loading ? (
                    <p>Loading...</p>) : (
                    <div>
                        <h1 className="text-3xl font-bold">{pokemon.name}</h1>
                        <Image src={pokemon.sprites?.other?.home?.front_default} alt={pokemon.name} width={300} height={300} />
                        <div className='mt-5 text-left'>     
                            <p className='my-3'>Height: {pokemon.height}</p>
                            <p className='my-3'>Weight: {pokemon.weight}</p>
                            <p className='my-3'>
                                Abilities: {""}
                                {pokemon.abilities?.map((abilityObj: any, index: number) => (
                                    <span key={index} className='bg-gray-200 rounded-full px-3 py-1 mr-2 rounded-md'>
                                        {abilityObj.ability.name}
                                    </span>
                                ))}
                            </p>
                            <p className='my-3'>
                                Type: {""}
                                {pokemon.types?.map((typeObj: any, index: number) => (
                                    <span key={index} className='bg-gray-200 rounded-full px-3 py-1 mr-2 rounded-md'>
                                        {typeObj.type.name}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                )}
            </div>

          </div>
        </div>
    
    </div>
  )
}

export default pokeinfo
      