"use client"

import React, { Suspense } from 'react'
import SimilarityEngine from '@/components/similarityEngine'
import PlayerProfileCard from '@/components/playerProfile'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/constants'
import { useSearchParams } from 'next/navigation';
import PlayerStatsRadarCard from '@/components/abilityCard'

// Move the main component logic to a separate function
function PlayerPageContent() {
    const searchParams = useSearchParams();
    const player = searchParams.get('player');
    const [playerData, setPlayerData] = useState(null);
    const [statData, setStatData] = useState(null);
    const [similarityData, setSimilarityData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSimilarityEngine = async () => {
        try {
            const response = await axios.get(`${API_URL}/similar-players`, {
                params: {
                  player: player, // Axios automatically encodes the value
                  use_positions: false // Include this parameter in the request
                }
              });
            setSimilarityData(response.data);
        } catch (err) {
            console.error('Error fetching similarity data:', err);
            setError('Failed to load similarity data');
        }
    }

    useEffect(() => {
        // Fetch player details when the component mounts and we have a player name
        async function fetchPlayerDetails() {
            if (!player) return;

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_URL}/role-analysis`, {
                    params: {
                      player: player, // Axios automatically encodes the value
                    }
                  });
                setPlayerData(response.data);
            } catch (err) {
                console.error('Error fetching player details:', err);
                setError('Failed to load player details');
            } finally {
                setLoading(false);
            }
        }

        async function fetchPlayerStats(){
            try {
                const response = await axios.get(`${API_URL}/percentile-rank`, {
                    params: {
                      player: player // Axios automatically encodes the value
                    }
                  });
                  console.log(response.data)
                setStatData(response.data);
            } catch (err) {
                console.error('Error fetching player details:', err);
                setError('Failed to load player details');
            } finally {
                setLoading(false);
            }
        }

        async function fetchSimilarityEngine(){
            try {
                const response = await axios.get(`${API_URL}/similar-players`, {
                    params: {
                      player: player // Axios automatically encodes the value
                    }
                  });
                  console.log(response.data)
                setSimilarityData(response.data);
            } catch (err) {
                console.error('Error fetching player details:', err);
                setError('Failed to load player details');
            } finally {
                setLoading(false);
            }
        }

        fetchSimilarityEngine();
        fetchPlayerStats();
        fetchPlayerDetails();
    }, [player]);

    if (loading) return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
            <div className="animate-pulse text-lg">Loading player details...</div>
        </div>
    );
    
    if (error) return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-red-500 text-center">{error}</div>
        </div>
    );
    
    if (!playerData) return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center">No player data available</div>
        </div>
    );

    return (
        <div>
            <section className="container mx-auto px-4 py-4">
                {/* Top section with profile and radar chart */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    <div className="w-full lg:w-2/3 bg-gray-50">
                        <PlayerProfileCard playerData={playerData}/>
                    </div>
                    <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
                        <PlayerStatsRadarCard statData={statData} position={playerData.position} />
                    </div>
                </div>
                
                {/* Similarity engine section */}
                <div className="mt-4">
                    <SimilarityEngine 
                        similarityData={similarityData} 
                        fetchSimilarityEngine={fetchSimilarityEngine} 
                        player={player}
                    />
                </div>
            </section>
        </div>
    )
}

// Create the main page component with Suspense
const PlayerPage = () => {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <div className="text-gray-500">Loading search parameters...</div>
            </div>
        }>
            <PlayerPageContent />
        </Suspense>
    )
}

export default PlayerPage