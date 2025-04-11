import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Assuming you're using Next.js for routing
import { API_URL } from '@/constants'; // Adjust the import based on your project structure

function SearchableDropdown({ onPlayerSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  // Fetch suggestions from API
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_URL}/players`);
      
      // Extract the players array from the response
      const allPlayers = response.data.players || [];
      
      // Filter players based on the search query
      const filteredPlayers = allPlayers.filter(player => 
        player.Player.toLowerCase().includes(query.toLowerCase())
      );
      
      setSuggestions(filteredPlayers);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError('Failed to fetch suggestions');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search to avoid excessive API calls
  const debouncedSearch = (query) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300); // 300ms debounce time
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(true);
    debouncedSearch(value);
    setSelectedIndex(-1);
    
    // Clear selected player if input changes
    if (selectedPlayer && selectedPlayer.Player !== value) {
      setSelectedPlayer(null);
      if (onPlayerSelect) {
        onPlayerSelect(null);
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isDropdownOpen) return;
    
    // Down arrow
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } 
    // Up arrow
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
    } 
    // Enter
    else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } 
    // Escape
    else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (player) => {
    setSearchQuery(player.Player);
    setSelectedPlayer(player);
    setIsDropdownOpen(false);
    
    // Call the callback function with the selected player
    if (onPlayerSelect) {
      onPlayerSelect(player);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        inputRef.current && 
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const selectedElement = dropdownRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [selectedIndex]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search Player..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={() => setIsDropdownOpen(true)}
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      {isDropdownOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {error && (
            <div className="px-4 py-2 text-red-500">{error}</div>
          )}
          
          {!error && suggestions.length === 0 && !isLoading && searchQuery && (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
          
          {suggestions.map((player, index) => (
            <div
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedIndex === index ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleSuggestionClick(player)}
            >
              <div className="font-medium">{player.Player}</div>
              <div className="text-sm text-gray-600">
                {player.TmPos} • {player.Squad} • Age: {player.Age}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default SearchableDropdown;