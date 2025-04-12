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

    
    useEffect(() => {
        // Fetch player details when the component mounts and we have a player name
        async function fetchPlayerDetails() {
            if (!player) return;

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_URL}/role-analysis`, {
                    params: {
                      player: player // Axios automatically encodes the value
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

    if (loading) return <div>Loading player details...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!playerData) return <div>No player data available</div>;

    return (
        <div>
            <section className="container mx-auto px-4">
                <div className="flex flex-row gap-4">
                    <div className="basis-4/6">
                        <PlayerProfileCard playerData={playerData}/>
                    </div>
                    <div className="basis-2/6">
                        <PlayerStatsRadarCard statData={statData} position={playerData.position} />
                    </div>
                </div>
                <div>
                    <SimilarityEngine similarityData={similarityData}/>
                </div>
            </section>
        </div>
    )
}

// Create the main page component with Suspense
const playerPage = () => {
    return (
        <Suspense fallback={<div>Loading search parameters...</div>}>
            <PlayerPageContent />
        </Suspense>
    )
}

export default playerPage