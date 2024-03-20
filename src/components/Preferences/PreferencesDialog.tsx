import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Sport, Team } from "../../context/Article/types";
import { API_ENDPOINT } from "../../config/constants";
import { usePreferencesDispatch } from "../../context/Preferences/context";
import { fetchPreferencesList } from "../../context/Preferences/action";

interface PreferencesDialogProps {
  isOpen: boolean;
  closeModel: () => void;
}

const PreferencesDialog: React.FC<PreferencesDialogProps> = ({
  isOpen,
  closeModel,
}) => {
  const auth_token = localStorage.getItem("auth_token");
  const [sports, setSports] = useState<Sport[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const preferencesDispatch = usePreferencesDispatch();

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

    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/teams`);
        if (!response.ok) {
          throw new Error("Error while fetching team data");
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchSports();
    fetchTeams();
  }, []);

  useEffect(() => {
    const storedSports = localStorage.getItem("selectedSports");
    const storedTeams = localStorage.getItem("selectedTeams");

    if (storedSports) {
      setSelectedSports(JSON.parse(storedSports));
    }

    if (storedTeams) {
      setSelectedTeams(JSON.parse(storedTeams));
    }

    // if (auth_token) {
    //   handleSavePreferences();
    // }
  }, []);

  const handleSportChange = (sportName: string) => {
    const updatedSports = [...selectedSports];
    if (updatedSports.includes(sportName)) {
      updatedSports.splice(updatedSports.indexOf(sportName), 1);
    } else {
      updatedSports.push(sportName);
    }
    setSelectedSports(updatedSports);
  };

  const handleTeamChange = (teamName: string) => {
    const updatedTeams = [...selectedTeams];
    if (updatedTeams.includes(teamName)) {
      updatedTeams.splice(updatedTeams.indexOf(teamName), 1);
    } else {
      updatedTeams.push(teamName);
    }
    setSelectedTeams(updatedTeams);
  };

  const handleSavePreferences = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify({
          preferences: { selectedSports, selectedTeams },
        }),
      });
      const updatedData = await response.json();
      fetchPreferencesList(preferencesDispatch);

      setSelectedSports(updatedData.preferences.selectedSports);
      setSelectedTeams(updatedData.preferences.selectedTeams);

      if (!response.ok) {
        throw new Error("Error updating user preferences");
      }

      console.log("User preferences updated successfully");

      localStorage.setItem("selectedSports", JSON.stringify(selectedSports));
      localStorage.setItem("selectedTeams", JSON.stringify(selectedTeams));

      closeModel();
    } catch (error) {
      console.error("Error updating user preferences:", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex items-start justify-between">
                  <div className="w-full md:mt-3 md:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-gray-900"
                    >
                      Preferences
                    </Dialog.Title>
                    <hr />

                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="col-span-3">
                        <h4 className="mb-2 text-lg font-medium">
                          Favourite Sports:
                        </h4>
                        <hr />

                        <div className="grid grid-cols-3 gap-6 mt-4">
                          {sports.map((sport) => (
                            <div key={sport.id} className="flex items-center ">
                              <input
                                type="checkbox"
                                id={sport.name}
                                name={sport.name}
                                checked={selectedSports.includes(sport.name)}
                                onChange={() => handleSportChange(sport.name)}
                                className="mr-1 cursor-pointer"
                              />
                              <label
                                htmlFor={sport.name}
                                className="mr-4 cursor-pointer"
                              >
                                {sport.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-3 mt-4">
                        <h4 className="mb-2 text-lg font-medium">
                          Favourite Teams:
                        </h4>
                        <hr />

                        <div className="grid grid-cols-3 gap-6 mt-4">
                          {teams.map((team) => (
                            <div key={team.id} className="flex items-center">
                              <input
                                type="checkbox"
                                id={team.name}
                                name={team.name}
                                checked={selectedTeams.includes(team.name)}
                                onChange={() => handleTeamChange(team.name)}
                                className="mr-2 cursor-pointer"
                              />
                              <label
                                htmlFor={team.name}
                                className="mr-4 cursor-pointer"
                              >
                                {team.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-row items-end justify-center gap-3">
                        <button
                          onClick={handleSavePreferences}
                          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={closeModel}
                          className="w-full px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-800"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PreferencesDialog;
