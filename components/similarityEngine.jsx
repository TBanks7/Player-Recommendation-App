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

const SimilarityEngine = ({ similarityData, fetchSimilarityEngine, player }) => {
  // Check if similarityData exists and has similar_players property
  if (!similarityData || !similarityData.similar_players) {
    return (
      <div className="w-full p-4 text-center">
        <p>No player similarity data available.</p>
      </div>
    );
  }

  const similarPlayersData = similarityData.similar_players;
  const alternatePlayersData = similarityData.alternate_similar_players;

  const [selectedData, setSelectedData] = useState(similarPlayersData);

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
  const filteredPlayers = selectedData.filter(player => {
    // Market Value Filter
    const meetsMarketValue =
      player.player_market_value_euro >= filters.marketValueRange[0] &&
      player.player_market_value_euro <= filters.marketValueRange[1];

    // Age Filter
    const meetsAge =
      player.Age >= filters.ageRange[0] &&
      player.Age <= filters.ageRange[1];

    // Preferred Foot Filter - Fixed logic
    let meetsPreferredFoot = true;

    // If either checkbox is selected, apply filtering
    if (filters.preferredFoot.left || filters.preferredFoot.right) {
      meetsPreferredFoot = false; // Default to false if any foot is selected

      // Both checkboxes are selected - only show players with "both" feet
      if (filters.preferredFoot.left && filters.preferredFoot.right) {
        meetsPreferredFoot = player.player_foot === "both";
      }
      // Only left checkbox is selected
      else if (filters.preferredFoot.left) {
        meetsPreferredFoot = player.player_foot === "left" || player.player_foot === "both";
      }
      // Only right checkbox is selected
      else if (filters.preferredFoot.right) {
        meetsPreferredFoot = player.player_foot === "right" || player.player_foot === "both";
      }
    }

    // Alternate Positions Filter
    const meetsPositionFilter = filters.alternatePositions
      ? true
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
    // Toggle the filter state first
    setFilters(prev => ({
      ...prev,
      alternatePositions: !prev.alternatePositions
    }));
    
    // Then switch between the two datasets based on the new state
    // Note that we need to check the NEXT state (opposite of current)
    if (!filters.alternatePositions) {
      // If it's going to be checked, show alternate players
      setSelectedData(alternatePlayersData);
    } else {
      // If it's going to be unchecked, show similar players
      setSelectedData(similarPlayersData);
    }
  };

  return (
    <div className="w-full md:basis-2/6">
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
                Alternate Positions
              </label>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Similar Players List */}
      <div className="flex flex-col gap-4 mt-4">
        {filteredPlayers.length === 0 ? (
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">No similar players found with current filters.</p>
          </div>
        ) : (
          filteredPlayers.map(player => {
            const playerId = player.Url.split('/')[5]; // Extract player ID
            const imageUrl = `https://fbref.com/req/202302030/images/headshots/${playerId}_2022.jpg`;
            const matchPercentage = Math.round(player.similarity * 100);

            return (
              <div
                key={player.Player}
                className="flex flex-col sm:flex-row bg-gray-100 p-4 rounded-lg items-center sm:justify-between gap-4"
              >
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4'>
                  <img
                    src={imageUrl}
                    alt={player.Player}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="text-center sm:text-left">
                    <p className="font-semibold">{player.Player}</p>
                    <p className="text-sm text-gray-600">{player.Squad}</p>
                    <p className="text-xs text-gray-500">
                      {player.TmPos} | {player.player_foot && player.player_foot !== '-' ?
                        (player.player_foot.charAt(0).toUpperCase() + player.player_foot.slice(1)) :
                        'Unknown'} | Age: {player.Age}
                    </p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-green-600 font-bold">{matchPercentage}% Match</p>
                  <p className="text-sm text-gray-600">€{player.player_market_value_euro.toLocaleString()}</p>
                </div>
              </div>
            );
          }).slice(0, 5)
        )}
      </div>
    </div>
  );
};

export default SimilarityEngine;