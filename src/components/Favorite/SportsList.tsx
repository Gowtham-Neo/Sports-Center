import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Sport } from "../../context/Article/types";

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
    <div className="relative mb-5 text md:-mb-0">
      {" "}
      <select
        className="p-2 bg-gray-200 border rounded"
        onChange={(e) => handleSportClick(e.target.value)}
      >
        {sports.map((sport) => (
          <option key={sport.id} value={sport.name}>
            {sport.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportsList;
