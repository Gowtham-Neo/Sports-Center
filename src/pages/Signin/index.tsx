import React from "react";
import SigninForm from "./SigninForm";
import signin from "../../assets/images/signin.avif";

const Signin: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col-reverse w-full max-w-xl px-6 py-8 bg-white border-4 border-gray-300 border-dotted rounded-lg shadow-md md:flex-row">
        <div className="p-4 md:w-full md:border-r ">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 ">
            Sign in
          </h1>
          <SigninForm />
        </div>
        <div className="md:w-full">
          <img
            src={signin}
            alt="singin"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
