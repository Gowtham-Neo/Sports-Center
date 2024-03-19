import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Sport } from "../../context/Article/types";

interface SportsListProps {
  onSportClick: (selectedSport: string) => void;
  onYourNewsClick: (isYourNewsClicked: boolean) => void;
}

const SportsList: React.FC<SportsListProps> = ({
  onSportClick,
  onYourNewsClick,
}) => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [isYourNewsClicked, setIsYourNewsClicked] = useState(false);
  const auth_token = localStorage.getItem("auth_token");

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

  if (!auth_token) {
    useEffect(() => {
      if (sports.length > 0) {
        onSportClick(sports[0].name);
      }
    }, [sports]);
  }

  useEffect(() => {
    onYourNewsClick(isYourNewsClicked);
    if (auth_token) {
      setSelectedSport("YourNews");
    } else {
      setSelectedSport("Basketball");
    }
  }, []);

  const handleSportClick = (selectedSport: string) => {
    onSportClick(selectedSport);
    setIsYourNewsClicked(false);
    setSelectedSport(selectedSport);
  };
  const handleYourNewsClick = () => {
    setSelectedSport("YourNews");
    setIsYourNewsClicked(true);
    onYourNewsClick(true);
  };

  return (
    <div className="overflow-x-auto rounded-lg bg-slate-800">
      <ul className="flex p-5 space-x-5">
        {auth_token && (
          <button
            className={`font-medium border px-3 py-2 rounded-md text-gray-400 border-red-700  active:text-white hover:text-white border-none ${
              selectedSport === "YourNews"
                ? " from-red-700 to-green-500 bg-gradient-to-r text-white"
                : ""
            }`}
            onClick={() => {
              setIsYourNewsClicked(true);
              handleYourNewsClick();
            }}
          >
            Your News
          </button>
        )}
        {sports.map((sport) => (
          <button
            key={sport.id}
            className={`font-medium  text-gray-400 border-red-700 active:text-white hover:text-white ${
              selectedSport === sport.name ? "text-white underline" : ""
            }`}
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
