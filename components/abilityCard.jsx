import React, { useState } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PlayerStatsRadarCard = ({ player, stats }) => {
  // Default color scheme
  const chartColors = {
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
  };

  // Prepare data for the radar chart
  const chartData = {
    labels: stats.map(stat => stat.name),
    datasets: [
      {
        label: 'Percentile',
        data: stats.map(stat => stat.percentile),
        backgroundColor: chartColors.backgroundColor,
        borderColor: chartColors.borderColor,
        borderWidth: 2,
        pointBackgroundColor: chartColors.pointBackgroundColor,
        pointBorderColor: chartColors.pointBorderColor,
        pointHoverBackgroundColor: chartColors.pointHoverBackgroundColor,
        pointHoverBorderColor: chartColors.pointHoverBorderColor,
        pointRadius: 4,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
          color: '#666',
        },
        pointLabels: {
          color: '#333',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const statName = stats[context.dataIndex].name;
            const percentile = context.raw;
            const rawValue = stats[context.dataIndex].rawValue;
            const metric = stats[context.dataIndex].metric || '';
            
            return [
              `${statName}: ${percentile}th percentile`,
              `Raw value: ${rawValue}${metric ? ' ' + metric : ''}`
            ];
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-md">
      {/* Player info header */}
      <div className="border-b text-black p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Ability Card</h2>
            <div className="flex gap-2 text-sm opacity-90">
              <span>Stats(Percentiles) comparison to...</span>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Radar chart */}
      <div className="p-4">
        <h3 className="text-center text-gray-700 font-semibold mb-2">
          Percentile Rank vs. {player.comparisonGroup}
        </h3>
        <div className="h-64 w-full">
          <Radar data={chartData} options={chartOptions} />
        </div>
      </div>
      
      {/* Stats table */}
      {/* <div className="px-4 pb-4">
        <h3 className="text-gray-700 font-semibold mb-2">Detailed Stats</h3>
        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat) => (
            <div key={stat.name} className="flex justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">{stat.name}</span>
              <div className="flex gap-1">
                <span className="text-sm font-bold">{stat.rawValue}</span>
                {stat.metric && <span className="text-sm text-gray-500">{stat.metric}</span>}
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

// Demo component with player selection
const PlayerStatsComparison = () => {
  const players = [
    {
      id: 1,
      name: "Kevin De Bruyne",
      position: "Attacking Midfield",
      team: "Manchester City",
      age: 31,
      comparisonGroup: "Premier League Midfielders",
      stats: [
        { name: "Goals", percentile: 92, rawValue: 15, metric: "goals" },
        { name: "Assists", percentile: 98, rawValue: 23, metric: "assists" },
        { name: "xG", percentile: 85, rawValue: 10.4, metric: "xG" },
        { name: "xA", percentile: 99, rawValue: 14.8, metric: "xA" },
        { name: "Pass Comp", percentile: 87, rawValue: 91.2, metric: "%" },
        { name: "Prog Passes", percentile: 94, rawValue: 9.7, metric: "per 90" },
        { name: "SCA", percentile: 97, rawValue: 6.8, metric: "per 90" }
      ]
    },
    {
      id: 2,
      name: "Rodri",
      position: "Defensive Midfield",
      team: "Manchester City",
      age: 26,
      comparisonGroup: "Premier League Midfielders",
      stats: [
        { name: "Goals", percentile: 78, rawValue: 7, metric: "goals" },
        { name: "Assists", percentile: 67, rawValue: 6, metric: "assists" },
        { name: "xG", percentile: 72, rawValue: 5.2, metric: "xG" },
        { name: "xA", percentile: 65, rawValue: 4.5, metric: "xA" },
        { name: "Pass Comp", percentile: 95, rawValue: 94.7, metric: "%" },
        { name: "Prog Passes", percentile: 85, rawValue: 7.2, metric: "per 90" },
        { name: "SCA", percentile: 75, rawValue: 3.8, metric: "per 90" }
      ]
    },
    {
      id: 3,
      name: "Erling Haaland",
      position: "Striker",
      team: "Manchester City",
      age: 22,
      comparisonGroup: "Premier League Forwards",
      stats: [
        { name: "Goals", percentile: 99, rawValue: 36, metric: "goals" },
        { name: "Assists", percentile: 75, rawValue: 8, metric: "assists" },
        { name: "xG", percentile: 98, rawValue: 27.3, metric: "xG" },
        { name: "xA", percentile: 72, rawValue: 5.8, metric: "xA" },
        { name: "Pass Comp", percentile: 65, rawValue: 76.3, metric: "%" },
        { name: "Prog Passes", percentile: 35, rawValue: 2.1, metric: "per 90" },
        { name: "SCA", percentile: 68, rawValue: 3.4, metric: "per 90" }
      ]
    }
  ];
  
  const [selectedPlayerId, setSelectedPlayerId] = useState(1);
  const selectedPlayer = players.find(player => player.id === selectedPlayerId);
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="player-select" className="block text-sm font-medium text-gray-700 mb-1">
          Select Player:
        </label>
        <select
          id="player-select"
          value={selectedPlayerId}
          onChange={(e) => setSelectedPlayerId(parseInt(e.target.value))}
          className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.name} - {player.position}
            </option>
          ))}
        </select>
      </div>
      
      <PlayerStatsRadarCard 
        player={selectedPlayer} 
        stats={selectedPlayer.stats} 
      />
    </div>
  );
};

export default PlayerStatsComparison;