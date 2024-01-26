import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Team } from "../../context/Article/types";
import SportsList from "./SportsList";

interface TeamsListProps {
  onTeamClick: (selectedTeam: string) => void;
}

const TeamsList: React.FC<TeamsListProps> = ({ onTeamClick }) => {
  const [team, setTeams] = useState<Team[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>();

  const handleSportClick = (selectedSport: string) => {
    setSelectedSport(selectedSport);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/teams`);
        if (!response.ok) {
          throw new Error("Error while fetching team data");
        }
        const data = await response.json();
        const filteredTeams = data.filter(
          (team: Team) => team.plays === selectedSport
        );
        setTeams(filteredTeams);

        // console.log(filteredTeams);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeams();
  }, [setTeams, selectedSport]);

  const handleTeamClick = (selectedTeam: string) => {
    onTeamClick(selectedTeam);
  };

  return (
    <div className="flex justify-center items-center mt-2 gap-4 mb-3">
      <SportsList onSportClick={handleSportClick}/>
      <div className="relative">
        <select
          className="p-2 border rounded bg-gray-200"
          onChange={(e) => handleTeamClick(e.target.value)}
        >
          <option>Select Team</option>
          {team.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TeamsList;
