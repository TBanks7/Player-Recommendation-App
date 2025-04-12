// app/page.tsx
"use client"
import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PlayerCard from '@/components/playerCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/constants'
import PlayerSearchAutocomplete from '@/components/playerSearch'
import SearchableDropdown from '@/components/playerSearch'
import { useRouter } from 'next/navigation'


// Predefined lists for positions and roles
const POSITIONS = [
    'Striker', 'Midfielder', 'Defender', 'Goalkeeper'
]

const ROLES = {
    Striker: ['Center Forward', 'False 9'],
    Midfielder: ['Defensive Mid', 'Central Mid', 'Attacking Mid', 'Winger'],
    Defender: ['Center Back', 'Full Back', 'Wing Back'],
    Goalkeeper: ['Goalkeeper']
}


// Fetch player profile data from the API

const fetchPlayerProfile = () => {

    axios.get(`${API_URL}/player/`).then((response) => {
        setDraft(response.data[0]);
        setIsLoading(false)
    })
}

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
        <div className="space-y-8">
            {/* Hero Search Section */}
            <div className="bg-[url(/players1.jpg)] bg-[0%_20%] py-32">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl text-white font-bold mb-6">Search Player or Roles</h1>

                    {/* Advanced Search */}
                    <div className="max-w-2xl mx-auto">
                        <div className="flex justify-center space-x-4">
                            {/* <Select className="">
                                <SelectTrigger className="w-[180px] bg-white">
                                    <SelectValue placeholder="Position" />
                                </SelectTrigger>
                                <SelectContent>
                                    {POSITIONS.map(position => (
                                        <SelectItem key={position} value={position}>
                                            {position}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="w-[180px] bg-white">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {POSITIONS.flatMap(position =>
                                        ROLES[position].map(role => (
                                            <SelectItem key={role} value={role}>
                                                {role}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select> */}
                            <SearchableDropdown onPlayerSelect={setSelectedPlayer}/>
                            

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
                <h2 className="text-2xl font-semibold mb-6">Popular Searches</h2>
                <div className="grid grid-cols-3 gap-6">
                    <PlayerCard
                        name="Erling Haaland"
                        team="Manchester City"
                        position="Center Forward"
                        imageUrl="https://fbref.com/req/202302030/images/headshots/1f44ac21_2022.jpg"
                    />
                    <PlayerCard
                        name="Kevin De Bruyne"
                        team="Manchester City"
                        position="Attacking Midfield"
                        imageUrl="https://fbref.com/req/202302030/images/headshots/e46012d4_2022.jpg"
                    />
                    <PlayerCard
                        name="Virgil van Dijk"
                        team="Liverpool"
                        position="Center Back"
                        imageUrl="https://fbref.com/req/202302030/images/headshots/e06683ca_2022.jpg"
                    />
                </div>
            </section>


        </div>
    )
}