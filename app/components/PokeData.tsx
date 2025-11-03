"use client"
import React,{useState, useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';

type PokemonItem = {
    name: string;
    url: string;
};

function PokeData() {
    const [pokemon, setPokemon] = useState<PokemonItem[]>([]);
    const [loading, setLoading] = useState(true);

    console.log("Data from PokeData component", pokemon);

    useEffect(() => {
        setLoading(true);
        const fetchPokeData = async () =>{
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=156');
                const pokeData = await res.json();
                
                setPokemon(pokeData.results);
            }catch (error) {
                console.log(error)
            }
            setLoading(false);
        }
        fetchPokeData();
    }, []);
        
  return (
    <div className="">
        {loading ? (
            <p className='container text-center mx-auto'>Loading...</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {pokemon.map((val , index)=> (
                  <Link key={val.name} href={`/pokeinfo/${index + 1}`}>
                    <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <div>
                            <h3 className="font-bold text-lg text-center">{val.name}</h3>
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} width={150} height={150} alt={val.name} />
                        </div>
                    </div>
                  </Link>
                ))}
            </div>
        )}
    </div>
  )
}

export default PokeData