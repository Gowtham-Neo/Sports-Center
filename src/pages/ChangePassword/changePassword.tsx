import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm: React.FC = () => {
  const auth_token = localStorage.getItem("auth_token");

  const [current_password, setcurrent_password] = useState("");
  const [new_password, setnew_password] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!current_password || !new_password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });
      //Feedback: Enhance Error handling of incorrect current password that should reflect in the user interface
      
      if (!response.ok) {
        throw new Error("Password Update failed");
      }

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Current Password:
          </label>
          <input
            type="password"
            name="current_password"
            id="current_password"
            value={current_password}
            onChange={(e) => setcurrent_password(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            New Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={new_password}
            onChange={(e) => setnew_password(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:shadow-outline-gray"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
