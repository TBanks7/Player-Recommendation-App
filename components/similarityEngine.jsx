"use client"

import React, { useState } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterIcon } from 'lucide-react';

// Mock data (you'd typically fetch this from an API)
const similarPlayersData = [
  {
    id: 1,
    name: "Mohamed Salah",
    team: "Liverpool",
    image: "/salah.png",
    matchPercentage: 92,
    marketValue: 80000000,
    age: 31,
    preferredFoot: "Right",
    positions: ["Right Wing", "Forward"]
  },
  {
    id: 2,
    name: "Harry Kane",
    team: "Bayern Munich", 
    image: "/salah.png",
    matchPercentage: 88,
    marketValue: 90000000,
    age: 30,
    preferredFoot: "Both",
    positions: ["Striker", "Center Forward"]
  },
  {
    id: 3,
    name: "Kylian Mbappe",
    team: "Real Madrid",
    image: "/salah.png", 
    matchPercentage: 85,
    marketValue: 180000000,
    age: 25,
    preferredFoot: "Right",
    positions: ["Left Wing", "Forward"]
  },
  {
    id: 4,
    name: "Neymar",
    team: "Al-Hilal",
    image: "/salah.png", 
    matchPercentage: 82,
    marketValue: 50000000,
    age: 32,
    preferredFoot: "Left",
    positions: ["Left Wing", "Forward"]
  }
];

const SimilarityEngine = () => {
  // State for filters
  const [filters, setFilters] = useState({
    marketValueRange: [0, 200000000],
    ageRange: [18, 40],
    preferredFoot: {
      left: false,
      right: false
    },
    alternatePositions: false
  });

  // Filter players based on current filter settings
  const filteredPlayers = similarPlayersData.filter(player => {
    // Market Value Filter
    const meetsMarketValue = 
      player.marketValue >= filters.marketValueRange[0] && 
      player.marketValue <= filters.marketValueRange[1];

    // Age Filter
    const meetsAge = 
      player.age >= filters.ageRange[0] && 
      player.age <= filters.ageRange[1];

    // Preferred Foot Filter
    const meetsPreferredFoot = 
      (filters.preferredFoot.left && filters.preferredFoot.right) || // Both selected
      (filters.preferredFoot.left && player.preferredFoot === "Left") ||
      (filters.preferredFoot.right && player.preferredFoot === "Right") ||
      (!filters.preferredFoot.left && !filters.preferredFoot.right); // No selection means all feet

    // Alternate Positions Filter
    const meetsPositionFilter = filters.alternatePositions 
      ? player.positions.length > 1 
      : true;

    return meetsMarketValue && meetsAge && meetsPreferredFoot && meetsPositionFilter;
  });

  // Handle filter changes
  const handleMarketValueChange = (value) => {
    setFilters(prev => ({
      ...prev,
      marketValueRange: value
    }));
  };

  const handleAgeChange = (value) => {
    setFilters(prev => ({
      ...prev,
      ageRange: value
    }));
  };

  const handlePreferredFootChange = (foot) => {
    setFilters(prev => ({
      ...prev,
      preferredFoot: {
        ...prev.preferredFoot,
        [foot]: !prev.preferredFoot[foot]
      }
    }));
  };

  const handleAlternatePositionsChange = () => {
    setFilters(prev => ({
      ...prev,
      alternatePositions: !prev.alternatePositions
    }));
  };

  return (
    <div className="basis-2/6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mt-6 mb-4">Similarity Engine</h3>
        
        {/* Filter Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Market Value (€)</h4>
              <Slider
                value={filters.marketValueRange}
                onValueChange={handleMarketValueChange}
                min={0}
                max={200000000}
                step={1000000}
              />
              <div className="flex justify-between text-xs mt-2">
                <span>€{filters.marketValueRange[0].toLocaleString()}</span>
                <span>€{filters.marketValueRange[1].toLocaleString()}</span>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Age</h4>
              <Slider
                value={filters.ageRange}
                onValueChange={handleAgeChange}
                min={16}
                max={50}
                step={1}
              />
              <div className="flex justify-between text-xs mt-2">
                <span>{filters.ageRange[0]} years</span>
                <span>{filters.ageRange[1]} years</span>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Preferred Foot</h4>
              <div className='flex gap-3'>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="left-foot"
                  checked={filters.preferredFoot.left}
                  onCheckedChange={() => handlePreferredFootChange('left')}
                />
                <label
                  htmlFor="left-foot"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Left
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="right-foot"
                  checked={filters.preferredFoot.right}
                  onCheckedChange={() => handlePreferredFootChange('right')}
                />
                <label
                  htmlFor="right-foot"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Right
                </label>
              </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="alternate-positions"
                checked={filters.alternatePositions}
                onCheckedChange={handleAlternatePositionsChange}
              />
              <label
                htmlFor="alternate-positions"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Multiple Positions
              </label>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Similar Players List */}
      <div className="flex flex-col gap-4 mt-4">
        {filteredPlayers.map(player => (
          <div 
            key={player.id} 
            className="flex bg-gray-100 p-4 rounded-lg items-center justify-between gap-4"
          >
            <div className='flex gap-4'>
              <img
                src={player.image}
                alt={player.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{player.name}</p>
                <p className="text-sm text-gray-600">{player.team}</p>
                <p className="text-xs text-gray-500">
                  {player.positions.join(', ')} | {player.preferredFoot} | Age: {player.age}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-600 font-bold">{player.matchPercentage}% Match</p>
              <p className="text-sm text-gray-600">€{player.marketValue.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarityEngine;