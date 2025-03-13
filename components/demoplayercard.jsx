import React, { useState } from 'react';

const SoccerPlayersCard = () => {
  // Sample data for soccer players
  const players = [
    // { id: 1, name: "Lionel Messi", team: "Inter Miami CF", position: "Forward" },
    { id: 2, name: "Cristiano Ronaldo", team: "Al Nassr FC", position: "Forward" },
    { id: 3, name: "Kylian Mbappé", team: "Real Madrid", position: "Forward" },
    { id: 4, name: "Erling Haaland", team: "Manchester City", position: "Forward" },
    { id: 5, name: "Kevin De Bruyne", team: "Manchester City", position: "Midfielder" }
  ];

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 cursor-pointer bg-black/60  mx-1 rounded">
      <ul >
        {players.map(player => (
          <li 
            key={player.id}
            className="px-4 py-1 hover:bg-black rounded cursor-pointer transition-colors"
            onClick={() => handlePlayerClick(player)}
          >
            <div className="font-medium text-white">{player.name}</div>
            {/* <div className="text-sm text-gray-500">{player.team} • {player.position}</div> */}
          </li>
        ))}
      </ul>
      </div>
      
      
      {selectedPlayer && (
        <div className="bg-gray-100 p-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-1">Selected Player:</h4>
          <div className="text-sm">
            <p><span className="font-semibold">Name:</span> {selectedPlayer.name}</p>
            <p><span className="font-semibold">Team:</span> {selectedPlayer.team}</p>
            <p><span className="font-semibold">Position:</span> {selectedPlayer.position}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoccerPlayersCard;