"use client"
import React, {useState, useEffect} from 'react'
import { useParams  } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function PokeResult() {
  const  params  = useParams();
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPokeData = async () => {
    try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokeName}`);
        const data = await response.json();
        setPokeData(data);
        setLoading(false);
    }catch (error) {
        console.error("Error fetching Pokemon data:", error);
    }
}

    useEffect(() => {
        fetchPokeData();
    }, []);
    console.log(params);

  return (
    <div className="p-24">
        <div>
          <Link href="/" className="bg-blue-500 text-white p-3 rounded-md">Back to Home</Link>
          <div className="flex justify-center mt-10 text-center items-center">
            <div className="shadow-md p-6 rounded-lg border border-gray-200">
                {loading ? (
                    <p>Loading...</p>) : (
                    <div>
                        <h1 className="text-3xl font-bold">{pokeData.name}</h1>
                        <Image src={pokeData?.sprites?.other.home.front_default} alt={pokeData.name} width={300} height={300} />
                        <div className='mt-5 text-left'>     
                            <p className='my-3'>Height: {pokeData.height}</p>
                            <p className='my-3'>Weight: {pokeData.weight}</p>
                            <p className='my-3'>
                                Abilities: {""}
                                {pokeData.abilites?.map((abilityObj: any, index: number) => (
                                    <span key={index} className='bg-gray-200 rounded-full px-3 py-1 mr-2 rounded-md'>
                                        {abilityObj.ability.name}
                                    </span>
                                ))}
                            </p>
                            <p className='my-3'>
                                Type: {""}
                                {pokeData.types?.map((typeObj: any, index: number) => (
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

export default PokeResult