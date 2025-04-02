"use client"

import React, { useState } from 'react';
import TeamFormationSelector from '@/components/teamSelector';


const FootballApp = () => {
  const [formation, setFormation] = useState("4-4-2");
  const [selectedTeam, setSelectedTeam] = useState("");


  const handleFormationChange = (newFormation) => {
    setFormation(newFormation);
  };

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <h1 className="text-white text-3xl font-bold mb-6">Select Your Team Formation</h1> */}
      
      <TeamFormationSelector 
        onFormationChange={handleFormationChange}
        onTeamChange={handleTeamChange}
      />
    </div>
  );
  
};

export default FootballApp;