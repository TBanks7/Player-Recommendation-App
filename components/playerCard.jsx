import React from 'react';
// import { User } from 'lucide-react';



// const PlayerCard = ({ player, onClick }) => (
//   <div 
//     key={player.name}
//     className="flex items-center gap-2 cursor-pointer hover:bg-black/20 p-1 rounded"
//     onClick={() => onClick(player)}
//   >
//     <div className="flex-1 flex items-center gap-2">
//       <User className="w-4 h-4" />
//       <span className="text-sm">{player.name}</span>
//     </div>
//   </div>
// );

// export default PlayerCard;

// components/PlayerCard.tsx
import Image from 'next/image'
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { API_URL } from '@/constants'
import axios from 'axios'
import { useEffect } from 'react'




const PlayerCard = ({ name, team, position, imageUrl }) => {
  const router = useRouter();

  const fetchPlayerDetails = async (name) => {
    const response = await axios.get(`${API_URL}/player/${name}`)
    console.log(response.data)
    // Assuming you want to navigate to a new page with the player details
    router.push(`/player-view?player=${name}`);
    return response.data
  }

  return (
    <div className="bg-[#f9fafc] rounded-lg overflow-hidden p-4 shadow-md hover:cursor-pointer" onClick={() => { fetchPlayerDetails(name) }}>
      <div className='flex items-center px-4 pb-4'>
        <div className="rounded-full border-solid border-3 border-gray-200">
          <Image
            width={80}
            height={80}
            src={imageUrl}
            alt='Mohamed Salah'
            className="rounded-full"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
      </div>

      <div className="flex justify-between items-center px-4">
        <p className="text-sm text-gray-600">{team}</p>
        <a href='' className='text-sm'></a>
      </div>



    </div>
  )
}
export default PlayerCard;
