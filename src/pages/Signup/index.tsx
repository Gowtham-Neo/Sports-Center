import React from "react";
import SignupForm from "./SignupForm";
import signup from "../../assets/images/signup.avif";

const Signup: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-xl px-6 py-8 bg-white border-4 border-gray-300 border-dotted rounded-lg shadow-md md:flex-row">
        <div className="md:border-r md:w-full">
          <img
            src={signup}
            alt="signup"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
        <div className="p-4 md:w-full ">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 ">
            Sign up
          </h1>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
