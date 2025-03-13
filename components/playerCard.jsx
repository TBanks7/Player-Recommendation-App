import React from 'react';
import { User } from 'lucide-react';



const PlayerCard = ({ player, onClick }) => (
  <div 
    key={player.name}
    className="flex items-center gap-2 cursor-pointer hover:bg-black/20 p-1 rounded"
    onClick={() => onClick(player)}
  >
    <div className="flex-1 flex items-center gap-2">
      <User className="w-4 h-4" />
      <span className="text-sm">{player.name}</span>
    </div>
  </div>
);

export default PlayerCard;