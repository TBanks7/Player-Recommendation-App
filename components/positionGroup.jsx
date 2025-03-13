import React, { useState } from 'react';
import PlayerList from './PlayerList';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const PositionGroup = ({ data, position }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setShowDialog(true);
  };

  const getPositionStyle = (position) => {
    const styles = {
      "RB": { bottom: '10%', right: '5%' },
      "GK": { bottom: '-10%', left: '50%', transform: 'translateX(-50%)' },
      "CB": { bottom: '10%', left: '50%', transform: 'translateX(-50%)'},
      "LW": { top: '5%', left: '5%' },
      "CF": { top: '5%', left: '50%', transform: 'translateX(-50%)' },
      "LB": { bottom: '10%', left: '5%' },
      "AM": { top: '25%', left: '50%', transform: 'translateX(-50%)' },
      "RW": { top: '5%', right: '5%' },
      "CM": { top: '35%', left: '50%', transform: 'translateX(-50%)' },
      "RM": { top: '25%', right: '5%' },
      "DM": { top: '45%', left: '50%', transform: 'translateX(-50%)' },
      "Midfield": { top: '35%', left: '50%', transform: 'translateX(-50%)' },
      "Attack": { top: '5%', left: '50%', transform: 'translateX(-50%)' },
      "Defence": { top: '15%', left: '50%', transform: 'translateX(-50%)' },
      "Defender": { top: '15%', left: '50%', transform: 'translateX(-50%)' },
      "LM": { top: '25%', left: '5%' },
      "SS": { top: '15%', left: '50%', transform: 'translateX(-50%)' }
    };
    return styles[position] || {};
  };

  return (
    <div className="absolute bg-black/40 rounded-lg p-4 text-white" style={getPositionStyle(position)}>
      <div className="flex items-center justify-between mb-2">
        {/* <span className="font-bold">{data.position}</span> */}
      </div>
      
      <PlayerList players={data.players} onPlayerClick={handlePlayerClick} />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Player Details</DialogTitle>
          </DialogHeader>
          {selectedPlayer && (
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <User className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-bold">{selectedPlayer.name}</h3>
                  <div className="flex mt-1">
                    {renderStars(selectedPlayer.rating)}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p>Position: {data.position}</p>
                <p>Rating: {selectedPlayer.rating}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PositionGroup;