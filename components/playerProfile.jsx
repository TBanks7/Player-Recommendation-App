import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PlayerProfileCard = ({
  name = "Mohammed Salah",
  team = "Liverpool",
  height = "194 cm",
  shirtNumber = "11",
  age = "34",
  birthDate = "Jul 21, 2000",
  preferredFoot = "Left",
  country = "Norway",
  marketValue = "€70M",
  primaryPosition = "RW",
  imageUrl = "/salah.png" // Replace with actual image path
}) => {
  return (
    <div className="mx-auto">
      {/* Header with background */}
      <div className="bg-red-500 rounded-t-lg p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={imageUrl}
            alt={name}
            className="w-20 h-20 rounded-full border-2 bg-white border-white"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <p className="text-white text-sm">{team}</p>
          </div>
        </div>
      </div>

      {/* Player Details Grid */}
      {/* <div className="grid grid-cols-3 gap-4 p-4 bg-white shadow-md">
        <div className="flex flex-col items-center">
          <span className="text-gray-500 text-xs">Position</span>
          <span className="font-semibold text-blue-500">{primaryPosition}</span>
        </div>
      </div> */}

      {/* Detailed Information */}
      <div className="bg-gray-50 flex gap-4 p-4 border-t">
        <div className='basis-1/2 grid grid-cols-2 gap-4'>
          <div className=''>
            <span className="text-gray-500 text-xs block">Height</span>
            <span className="font-semibold">{height}</span>
          </div>
          <div className=''>
            <span className="text-gray-500 text-xs block">Shirt Number</span>
            <span className="font-semibold">{shirtNumber}</span>
          </div>
          <div className=''>
            <span className="text-gray-500 text-xs block">Age</span>
            <span className="font-semibold">{age}</span>
            <span className="text-xs text-gray-500 block">{birthDate}</span>
          </div>
          <div className=''>
            <span className="text-gray-500 text-xs block">Preferred Foot</span>
            <span className="font-semibold">{preferredFoot}</span>
          </div>
          <div className=''>
            <span className="text-gray-500 text-xs block">Country</span>
            <span className="font-semibold flex items-center">
              <img
                src={`/flags/${country.toLowerCase()}.png`}
                alt={country}
                className="w-4 h-4 mr-2 rounded-sm"
              />
              {country}
            </span>
          </div>
          <div className=''>
            <span className="text-gray-500 text-xs block">Market Value</span>
            <span className="font-semibold text-green-600">{marketValue}</span>
          </div>



        </div>
        <div className='basis-1/2'>
          {/* <img src="/small-pitch.png" alt="" /> */}
        </div>
        <div>

        </div>

      </div>

      {/* Pitch Position Visualization */}
      <div className="bg-white p-4 border-t">
        <div className="w-full aspect-square bg-gray-100 rounded-lg relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            bg-blue-500 text-white px-2 py-1 rounded text-xs">
            {primaryPosition}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfileCard;