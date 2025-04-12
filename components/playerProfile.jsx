import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { positionMap } from '@/constants';

const PlayerProfileCard = ({ playerData }) => {
  const {
    player: name,
    team,
    comp,
    position: primaryPosition,
    primary_role: playerRole,
    url,
    height,
    shirt_number: shirtNumber,
    age,
    dob: birthDate,
    foot: preferredFoot,
    nation: country,
    market_value: marketValue
  } = playerData;


  // Position coordinates mapping (percentage based)
  const positionCoordinates = {
    // Defenders
    'Left-Back': { x: 28, y: 80 },
    'Right-Back': { x: 72, y: 80 },
    'Centre-Back': { x: 50, y: 80 },

    // Midfielders
    'Left Midfield': { x: 28, y: 60 },
    'Right Midfield': { x: 72, y: 60 },
    'Central Midfield': { x: 50, y: 60 },
    'Attacking Midfield': { x: 50, y: 40 },
    'Defensive Midfield': { x: 50, y: 70 },

    // Forwards
    'Left Winger': { x: 28, y: 30 },
    'Right Winger': { x: 72, y: 30 },
    'Centre-Forward': { x: 50, y: 20 },
    'Second Striker': { x: 50, y: 30 },

    // Goalkeeper
    'Goalkeeper': { x: 50, y: 95 }
  };

  const position = positionCoordinates[primaryPosition] || { x: 50, y: 50 };

  // Extracting the player ID from the URL
  const playerId = url.split('/')[5]; // Extract "1f44ac21"
  const imageUrl = `https://fbref.com/req/202302030/images/headshots/${playerId}_2022.jpg`;


  return (
    <div className="mx-auto">
      {/* Header with background */}
      <div className="bg-blue-500 rounded-t-lg p-4 flex justify-between items-center">
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
            <span className="font-semibold">{height}m</span>
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
            <span className="font-semibold">{preferredFoot.charAt(0).toUpperCase() + preferredFoot.slice(1)}</span>
          </div>
          <div className=''>
            <span className="text-gray-500 text-xs block">Country</span>
            <span className="font-semibold flex items-center">
              <img
                src={`https://images.fotmob.com/image_resources/logo/teamlogo/${country.toLowerCase()}.png`}
                alt={country}
                className="w-4 h-4 mr-2 rounded-sm"
              />
              {country}
            </span>
          </div>
          <div className=''>
            <span className="text-gray-500 text-xs block">Market Value</span>
            <span className="font-semibold text-green-600">€{marketValue.toLocaleString()}</span>
          </div>



        </div>
        <div className='basis-1/2'>
          <div className='flex gap-3 float-end'>
            <div className='flex flex-col gap-4'>
              <div>
                <span className="text-gray-500 text-xs block">Primary Position</span>
                <span className="font-semibold text-blue-500">{primaryPosition}</span>
              </div>

              <div>
                <span className="text-gray-500 text-xs block">Player Role</span>
                <span className="font-semibold text-blue-500">{playerRole}</span>
              </div>

            </div>
            <div className='relative'>
              <img height={200} width={200} src="/pitch1.svg" alt="Alternative text"></img>
              <div
                className="absolute rounded-full flex items-center justify-center text-sm text-white bg-black p-1 h-8 w-8"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >{positionMap[primaryPosition]}</div>
            </div>
          </div>


        </div>
        <div>

        </div>

      </div>

    </div>
  );
};

export default PlayerProfileCard;