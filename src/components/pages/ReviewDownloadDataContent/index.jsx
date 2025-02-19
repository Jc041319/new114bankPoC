import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation

const ReviewDownloadDataContent = () => {
  // State for the date pickers and input field
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle changes for start date
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  // Handle changes for end date
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Handle changes for input field
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle form submission or button click
  const handleSubmit = () => {
    // console.log("Start Date:", startDate);
    // console.log("End Date:", endDate);
    // console.log("Input Value:", inputValue);
    navigate("/historical/content"); // Navigate to /upload/content page
  };

  return (
    <div className="min-h-screen bg-transparent flex justify-center items-baseline p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-xl font-semibold text-center text-slate-500 mb-6">
          HISTORIC DATA
        </h1>

        {/* Start Date Picker */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-normal mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-normal"
          />
        </div>

        {/* End Date Picker */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-normal mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-normal"
          />
        </div>

        {/* Input Field */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-normal mb-2">
            Response ID
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter response id"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-normal"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            disabled={true}
            onClick={handleSubmit}
            // className="w-full px-6 py-2 bg-[#2C75B6] text-white rounded-md hover:bg-[#2C75B6] hover:text-[#D9AA1E] focus:hover:text-[#D9AA1E] focus:outline-none focus:ring-2 focus:ring-[#2C75B6] "
            className={`w-full px-6 py-2 bg-[#2C75B6] text-white rounded-md hover:bg-[#2C75B6] hover:text-[#D9AA1E] focus:hover:text-[#D9AA1E] focus:outline-none focus:ring-2 focus:ring-[#2C75B6] ${
              true
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Fetch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDownloadDataContent;
