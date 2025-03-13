"use client"

import React, { useState } from 'react';
import Image from "next/image";
import PositionGroup from '@/components/PositionGroup';
import TeamFormationSelector from '@/components/teamSelector';
import FormationDisplay from '@/components/formationDisplay';

const dummySquad = `
Position,Player,Rating
CF,T. Werner,2.0
CF,P. Schick,4.0
CF,Y. Poulsen,3.5
CF,A. Lookman,3.0
CF,J. Augustin,2.5
LW,E. Forsberg,4.5
LW,A. Lookman,4.0
LW,Dani Olmo,3.5
AM,Dani Olmo,4.5
AM,M. Sabitzer,4.0
AM,E. Forsberg,3.5
RW,M. Sabitzer,4.0
RW,Kevin Kampl,3.5
CB,D. Upamecano,4.5
CB,I. Konate,4.5
RB,L. Klostermann,4.0
RB,N. Mukiele,3.5
RB,T. Adams,3.0
LB,A. Haidara,3.5
LB,M. Halstenberg,3.5
LB,B. Henrichs,3.0
GK,P. Gulacsi,4.5
GK,F. Tschauner,3.5
GK,Yvon Mvogo,3.0
`;

const formations = {
  "4-4-1-1": ["GK", "LB", "CB", "CB", "RB", "LM", "CM", "CM", "RM", "SS", "CF"],
  "4-4-2": ["GK", "LB", "CB", "CB", "RB", "LW", "CM", "CM", "RW", "CF", "CF"],
  "4-3-3": ["GK", "LB", "CB", "CB", "RB", "CM", "CM", "CM", "LW", "CF", "RW"],
  "3-5-2": ["GK", "CB", "CB", "CB", "LM", "CM", "CM", "CM", "RM", "CF", "CF"],
  "4-2-3-1": ["GK", "LB", "CB", "CB", "RB", "CM", "CM", "LW", "AM", "RW", "CF"],
  "5-3-2": ["GK", "LB", "CB", "CB", "CB", "RB", "CM", "CM", "CM", "CF", "CF"],
  "3-4-3": ["GK", "CB", "CB", "CB", "LM", "CM", "CM", "RM", "LW", "CF", "RW"],
  "4-5-1": ["GK", "LB", "CB", "CB", "RB", "LM", "CM", "DM", "CM", "RM", "CF"],
  "4-1-4-1": ["GK", "LB", "CB", "CB", "RB", "DM", "LM", "CM", "CM", "RM", "CF"],
  "4-3-2-1": ["GK", "LB", "CB", "CB", "RB", "CM", "CM", "CM", "LAM", "RAM", "CF"],
  "3-6-1": ["GK", "CB", "CB", "CB", "LM", "CM", "CM", "AM", "CM", "RM", "CF"],
  "5-4-1": ["GK", "LB", "CB", "CB", "CB", "RB", "LM", "CM", "CM", "RM", "CF"],
  "3-2-3-2": ["GK", "CB", "CB", "CB", "DM", "DM", "LM", "CM", "RM", "CF", "CF"],
  "4-2-2-2": ["GK", "LB", "CB", "CB", "RB", "DM", "DM", "LAM", "RAM", "CF", "CF"],
  "4-2-1-3": ["GK", "LB", "CB", "CB", "RB", "DM", "DM", "AM", "LW", "CF", "RW"],
  "3-3-3-1": ["GK", "CB", "CB", "CB", "DM", "CM", "CM", "LW", "AM", "RW", "CF"],
  "3-2-5": ["GK", "CB", "CB", "CB", "DM", "DM", "LW", "CM", "CM", "RW", "CF"],
  "2-3-5": ["GK", "CB", "CB", "LM", "CM", "RM", "LW", "CM", "AM", "RW", "CF"],
  "2-5-3": ["GK", "CB", "CB", "LM", "CM", "CM", "CM", "RM", "LW", "CF", "RW"]
};



const FootballApp = () => {
  const [formation, setFormation] = useState("4-4-2");
  const [selectedTeam, setSelectedTeam] = useState("");


  const parseCSV = (csv) => {
    const lines = csv.trim().split('\n');
    const result = {};
    lines.slice(1).forEach(line => {
      const [position, player, rating] = line.split(',');
      if (!result[position]) {
        result[position] = { position, rating: parseFloat(rating), players: [] };
      }
      result[position].players.push({ name: player, rating: parseFloat(rating) });
    });
  
    return result;
  };

  
   const squad = parseCSV(dummySquad);

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