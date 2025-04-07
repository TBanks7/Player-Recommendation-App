// app/page.tsx
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

export default function Home() {
    return (
        <div className="space-y-8">
            {/* Hero Search Section */}
            <div className="bg-[url(/players1.jpg)] bg-[0%_20%] text-white py-32">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-6">Search Player or Roles</h1>

                    {/* Advanced Search */}
                    <div className="max-w-2xl mx-auto space-y-4">
                        <div className="flex space-x-4">
                            <Select className="">
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
                            </Select>

                            <Input
                                type="text"
                                placeholder="Search by player name"
                                className="flex-grow bg-white"
                            />

                            <Button>Search</Button>
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
                        position="Striker"
                        imageUrl="/haaland.jpg"
                    />
                    <PlayerCard
                        name="Kevin De Bruyne"
                        team="Manchester City"
                        position="Midfielder"
                        imageUrl="/de-bruyne.jpg"
                    />
                    <PlayerCard
                        name="Virgil van Dijk"
                        team="Liverpool"
                        position="Defender"
                        imageUrl="/van-dijk.jpg"
                    />
                </div>
            </section>

            
        </div>
    )
}