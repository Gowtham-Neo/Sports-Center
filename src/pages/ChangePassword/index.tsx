import React from "react";
import ChangePasswordForm from "./changePassword";
import image from "../../assets/images/signup.avif";

const ChangePassword: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-xl px-6 py-8 bg-white border-4 border-gray-300 border-dotted rounded-lg shadow-md md:flex-row">
        <div className="border-r md:w-full">
          <img
            src={image}
            alt="ChangePassword"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
        <div className="p-4 md:w-full ">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 ">
            Update Password{" "}
          </h1>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
