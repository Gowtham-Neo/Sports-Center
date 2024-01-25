import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import {Sport} from "../../context/Article/types"

interface SportsListProps {
  onSportClick: (selectedSport: string) => void;
}

const SportsList: React.FC<SportsListProps> = ({ onSportClick }) => {
  const [sports, setSports] = useState<Sport[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/sports`);
        if (!response.ok) {
          throw new Error("Error while fetching sports data");
        }
        const data = await response.json();
        setSports(data.sports);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };

    fetchSports();
  }, []);

  const handleSportClick = (selectedSport: string) => {
    onSportClick(selectedSport);
  };

  useEffect(() => {
    if (sports.length > 0) {
      onSportClick(sports[0].name);
    }
  }, [sports]);

  return (
    <div className="bg-black overflow-x-auto rounded-lg">
      <ul className="flex space-x-5 p-5">
        {sports.map((sport) => (
          <button
            key={sport.id}
            className="font-medium active:text-white hover:text-white border-red-700 text-gray-300 "
            onClick={() => handleSportClick(sport.name)}
          >
            {sport.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default SportsList;

