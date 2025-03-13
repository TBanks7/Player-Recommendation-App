import Image from 'next/image';
import React from 'react';
import PlayerList from './playerList';
import PlayerCard from './playerCard';
import SoccerPlayersCard from './demoplayercard';




const FormationDisplay = ({ formation = '4-3-3' }) => {
  // const squad = parseCSV(dummySquad);
  const parseFormation = (formation) => {
    return formation.split('-').map(Number);
  };

  const getPlayerPositions = (formationArray) => {
    const positions = [];
    const defenseY = 75; // Starting Y for defense line
    
    // Add goalkeeper
    positions.push({ x: 50, y: 95 });
    
    // Calculate total vertical space to distribute (from defense line to attack line)
    const verticalSpace = 55; // 75 (defense) - 20 (attack) = 55
    
    // Calculate spacing between lines based on number of lines (excluding goalkeeper)
    const numLines = formationArray.length;
    const lineSpacing = numLines > 1 ? verticalSpace / (numLines - 1) : 0;
    
    // Add other positions based on formation
    formationArray.forEach((playersInLine, index) => {
      const horizontalSpacing = 100 / (playersInLine + 1);
      // Calculate y position - evenly distribute regardless of formation length
      const y = defenseY - (index * lineSpacing);
      
      for (let i = 1; i <= playersInLine; i++) {
        positions.push({
          x: horizontalSpacing * i,
          y: y
        });
      }
    });
    
    return positions;
  };

  const formationArray = parseFormation(formation);
  const positions = getPlayerPositions(formationArray);

  return (
      <div 
        className="relative mx-28  px-0 rounded-md flex items-center"
      >
        {/* Field markings */}
       
          <Image
            className="transform"
            style={{ transform: "perspective(1000px) rotateX(30deg)" }}
            src="/football-pitch.jpg"
            width={1500}
            height={800}
            alt="football-pitch"
          />

        {/* Players */}
        {positions.map((pos, index) => (
          // <PositionGroup 
          //   key={`${pos}-${index}`} 
          //   data={squad[pos]} 
          // />
          
          <div
            key={index}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`
            }}
          >
            <SoccerPlayersCard />
            {/* <span className="text-xs text-white font-bold">{index + 1}</span> */}
          </div>
        ))}
      </div>
  );
};

export default FormationDisplay;