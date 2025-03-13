import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = ({ players, onPlayerClick }) => (
  <div className="space-y-2">
    {players.map((player) => (
      <PlayerCard key={player.name} player={player} onClick={onPlayerClick} />
    ))}
    <div className="text-xs text-gray-300 mt-2">
      +{players.length - 3} more players
    </div>
  </div>
);

export default PlayerList;