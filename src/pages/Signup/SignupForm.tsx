import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  const [name, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        console.log("response is: ", response);
        setError("user Alreaady exists or server error occured!");
        setTimeout(()=>{
          setError("")
        },3000)
        throw new Error("Sign-up failed");
      }

      console.log("Sign-up successful");

      const data = await response.json();
      localStorage.setItem("auth_token", data.auth_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Your Name:
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={name}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            value={password}
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:shadow-outline-gray"
        >
          Sign up
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/signin" className="text-blue-500 hover:text-blue-700">
          Sign In
        </a>
      </p>
      <p className="mt-4 text-sm text-gray-600">
        Normal user?{" "}
        <a href="/" className="text-blue-500 hover:text-blue-700">
          Home
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
