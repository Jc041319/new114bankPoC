import React from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import TopNavigation from "../../TopNavigation";

const ErrorPage = () => {
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list">
        <div className="text-editor-content mt-4">
          <ErrorPageContent />
        </div>
      </div>
    </div>
  );
};

const ErrorPageContent = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const goHome = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-4xl font-semibold text-red-600">404</h1>
        <p className="text-xl text-gray-700 mt-4">Oops! Page not found.</p>
        <button
          onClick={goHome}
          className="mt-6 px-6 py-2 bg-[#2C75B6] text-white rounded-md hover:bg-[#2C75B6] hover:text-[#D9AA1E] transition duration-300"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
