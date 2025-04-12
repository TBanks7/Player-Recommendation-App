import React, { useState } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PlayerStatsRadarCard = ({ stats, position }) => {
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
              <span>Percentile Rank vs.
                <span className='pl-1'>
                  {position}'s
                </span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Radar chart */}
      <div className="p-4">
        <h3 className="text-center text-gray-700 font-semibold mb-2">
          {/* Percentile Rank vs. {player.comparisonGroup} */}
        </h3>
        <div className="h-80 w-full">
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
const PlayerStatsComparison = ({ statData, position }) => {
  if (!statData) {
    return (
      <div className="text-center text-gray-500">
        <p>Loading player stats...</p>
      </div>
    );
  }

  const { position_group } = statData;

  console.log("Stat Data: ", statData);

  return (
    <div className="max-w-md mx-auto">
      <PlayerStatsRadarCard
        stats={position_group}
        position={position}
      />
    </div>
  );
};

export default PlayerStatsComparison;