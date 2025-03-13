import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TeamFormationSelector = ({ onFormationChange, onTeamChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const teams = [
    "Manchester United", "Liverpool", "Chelsea", "Arsenal",
    "Barcelona", "Real Madrid", "Bayern Munich", "Paris Saint-Germain"
  ].sort();

  const teamFormations = {
    "Manchester United": "4-2-3-1",
    "Liverpool": "4-3-3",
    "Chelsea": "3-4-3",
    "Arsenal": "4-2-3-1",
    "Barcelona": "4-3-3",
    "Real Madrid": "4-3-3",
    "Bayern Munich": "4-2-3-1",
    "Paris Saint-Germain": "4-3-3"
  };

  const filteredTeams = teams.filter(team =>
    team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTeamSelect = (team) => {
    onTeamChange(team);
    onFormationChange(teamFormations[team]);
    setSearchQuery(team);
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
  };

  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/team-view?team=${searchQuery}`);
      console.log("Searching for:", searchQuery);
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(-1);
  // Add this handler for key navigation
const handleKeyDown = (e) => {
  if (!searchQuery || filteredTeams.length === 0) {
    setSelectedIndex(-1);
    return;
  }
  
  // Down arrow
  if (e.key === "ArrowDown") {
    e.preventDefault();
    setSelectedIndex(prev => 
      prev < filteredTeams.length - 1 ? prev + 1 : 0
    );
  }
  
  // Up arrow
  else if (e.key === "ArrowUp") {
    e.preventDefault();
    setSelectedIndex(prev => 
      prev > 0 ? prev - 1 : filteredTeams.length - 1
    );
  }
  
  // Enter key
  else if (e.key === "Enter") {
    e.preventDefault();
    if (selectedIndex >= 0) {
      console.log("Selected team:", selectedIndex);
      handleTeamSelect(filteredTeams[selectedIndex]);
    } else {
      console.log("Searching for: ");
      handleSearch();
    }
  }
  
  // Escape key
  else if (e.key === "Escape") {
    setIsDropdownOpen(false);
  }
};


  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <h1 className='text-white text-6xl my-12'>Welcome Home</h1>
      <div className="w-full flex items-center justify-center">
        <div className="relative w-full max-w-lg">
          <div className="relative flex w-full items-center">
            <input
              type="text"
              className="w-full pl-6 pr-16 py-4 text-base bg-[#1a1528]/80 text-gray-300 border-2 border-gray-500 rounded-full outline-none placeholder-gray-400"
              placeholder="Search Team..."
              value={searchQuery}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onClick={() => setIsDropdownOpen(true)}
            />
            <button
              className="absolute right-1 w-12 h-12 flex items-center justify-center rounded-full text-black bg-gray-500 hover:bg-gray-100 transition-colors"
              onClick={handleSearch}
            >
              <ArrowRight size={20} />
            </button>
          </div>

        {/* Only show dropdown if there's text and results */}
          {searchQuery && isDropdownOpen && filteredTeams.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredTeams.map((team, index) => (
                <div
                  key={team}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${selectedIndex === index ? "bg-gray-100" : ""
                    }`}
                  onClick={() => handleTeamSelect(team)}
                >
                  {team}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default TeamFormationSelector;