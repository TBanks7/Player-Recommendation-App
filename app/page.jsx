"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PlayerCard from '@/components/playerCard'
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/constants'
import SearchableDropdown from '@/components/playerSearch'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter();
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const handleSearch = () => {
        if (selectedPlayer) {
            // Navigate to player view page with the player name as a query parameter
            router.push(`/player-view?player=${encodeURIComponent(selectedPlayer.Player)}`);
        } else {
            // Optionally show an alert or toast if no player is selected
            alert("Please select a player first");
        }
    };
    
    return (
        <div className="space-y-6 md:space-y-8">
            {/* Hero Search Section */}
            <div className="bg-[url(/players1.jpg)] bg-cover bg-center py-16 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6">Search Player or Roles</h1>

                    {/* Advanced Search */}
                    <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
                        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                            
                            <div className="">
                                <SearchableDropdown onPlayerSelect={setSelectedPlayer}/>
                            </div>
                            
                            <Button
                                className="text-white hover:bg-blue-700 h-auto"
                                onClick={handleSearch}
                            >
                                Search
                            </Button>


                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Searches */}
            <section className="container mx-auto px-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Popular Searches</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <PlayerCard
                        name="Erling Haaland"
                        team="Manchester City"
                        position="Center Forward"
                        imageUrl="/haaland.jpg"
                    />
                    <PlayerCard
                        name="Kevin De Bruyne"
                        team="Manchester City"
                        position="Attacking Midfield"
                        imageUrl="/kdb.jpg"
                    />
                    <PlayerCard
                        name="Virgil van Dijk"
                        team="Liverpool"
                        position="Center Back"
                        imageUrl="/vandijk.jpg"
                    />
                </div>
            </section>
        </div>
    )
}