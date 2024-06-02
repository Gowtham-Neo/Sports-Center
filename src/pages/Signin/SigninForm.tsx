import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

const SigninForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Invalid credentials !");
        setTimeout(() => {
          setError(""); 
        }, 3000); 
        throw new Error("Sign-in failed");
      }

      const data = await response.json();
      localStorage.setItem("auth_token", data.auth_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Sign-in successful");
      navigate("/");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:shadow-outline-gray"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:text-blue-700">
          Sign Up
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

export default SigninForm;