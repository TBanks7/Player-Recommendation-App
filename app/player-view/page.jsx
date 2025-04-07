import React from 'react'
import SimilarityEngine from '@/components/similarityEngine'
import PlayerProfileCard from '@/components/playerProfile'
import Image from 'next/image'

const playerPage = () => {
  return (
    <div>
      {/* Featured Player Details */}
      <section className="container mx-auto px-4">
                <div className="flex flex-row gap-4">
                    <div className="basis-4/6">
                        <PlayerProfileCard />
                    </div>
                    <div className="basis-2/6">
                        <SimilarityEngine />
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
                    {/* Player Image */}
                    <div className="w-1/3 relative">
                        <Image
                            src="/salah.png"
                            alt="Erling Haaland"
                            layout="fill"
                        />
                    </div>
                </div>
            </section>
    </div>
  )
}

export default playerPage
