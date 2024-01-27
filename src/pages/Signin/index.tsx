import React from "react";
import SigninForm from "./SigninForm";
import signin from "../../assets/images/signin.avif";

const Signin: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-xl px-6 py-8 bg-white rounded-lg shadow-md border-4 border-dotted  border-gray-300">
        <div className="md:w-full p-4 border-r ">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 ">
            Sign in
          </h1>
          <SigninForm />
        </div>
        <div className="md:w-full">
          <img
            src={signin}
            alt="singin"
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
