// src/App.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { Radio } from "@material-tailwind/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FcEngineering } from "react-icons/fc";

const TextEditor = () => {
  // State to store input data, loading, response, and error
  const initialData = [];
  const [feedback, setFeedback] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedValue, setSelectedValue] = useState("auto");
  const [selectedOption, setSelectedOption] = useState("Single Review");
  const [disabledButton, setDisabledButton] = useState(false);

  try {
    window.localStorage.setItem("currentReviews", []);
    window.localStorage.setItem("restoreReviews", []);
    window.localStorage.setItem("jobId", 0);
  } catch (error) {
    // console.log("JSON Parse error in currentReviews: ", error);
  }

  const navigate = useNavigate(); // Hook to navigate programmatically
  const goUploadReviewContent = () => {
    // navigate("/upload/content"); // Navigate to /upload/content page
    window.localStorage.setItem("selectedOption", selectedOption);
    window.localStorage.setItem("selectedValue", selectedValue);
    navigate('/upload/content', {
      state: {
        reviewOption: selectedOption,
        reviewMode: selectedValue,
      }
    });
  };
  // Handle input change
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // Handle form submission (send POST request)
  const handleFeedbackSubmit = async () => {
    const payload = { feedback: feedback };
    if (!feedback) {
      setError("Invalid: Empty feedback!"); // Set error message if request fails
      showAlertMessage("Invalid: Empty feedback!");
    } else {
      setLoading(true);
      setDisabledButton(true);
      setError(null);
      setResponseData(null);
      setSelectedOption("Single Review");
      // setResponseData([]);

      // Prepare the request body

      // const apiUrl = '/api/reviews';

      const apiUrl =
        import.meta.env.VITE_API_URL +
        "/reviews?categoryAssignment=" +
        selectedValue;
      // console.log("API URL reviews:", apiUrl);

      try {
        console.log("payload: ", JSON.stringify(payload));
        // const response = await fetch('http://localhost:3002/reviews', {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(payload),
        });

        // Check if the response is successful

        // window.localStorage.setItem('jobId', "");
        window.localStorage.setItem("jobId", 0);

        if (response.status === 200) {
          const data = await response.json();
          initialData.push(data);
          console.log("Response", data);
          console.log("initialData", initialData);

          const newInitialData = initialData.map((item) => {
            const mergedArray = item.sentencePart.map((_, index) => ({
              id: index,
              sentencePart: item.sentencePart[index],
              sentiment: item.sentiment[index],
              category: item.category[index],
              subCategory: item.subCategory[index],
            }));

            return {
              ...item,
              detail: mergedArray,
            };
          });

          console.log("newInitialData: ", newInitialData);

          window.localStorage.setItem(
            "restoreReviews",
            // JSON.stringify(initialData)
            JSON.stringify(newInitialData)
          );
          window.localStorage.setItem(
            "currentReviews",
            JSON.stringify(newInitialData)
          );
          goUploadReviewContent();
          // console.log('Response', data);
          // console.log("response.status", response.status);
        } else {
          throw new Error("Failed to send data");
          // console.log("Failed to send data");
        }
      } catch (err) {
        setError(err.message); // Set error message if request fails
        showAlertMessage(err.message);
        // console.log("err: ", err.message);
      } finally {
        setLoading(false); // Set loading state to false once the request finishes
        setDisabledButton(false);
      }
    }
  };

  // Show the alert with a custom message
  const showAlertMessage = (message) => {
    setShowAlert(true);

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleChange = async (value) => {
    setSelectedValue(value);
  };

  // Inline styles for the components
  const styles = {
    container: {
      fontFamily: "sans-serif",
      textAlign: "center",
      padding: "20px",
    },
    title: {
      marginBottom: "20px",
      fontSize: "24px",
    },
    table: {
      width: "80%",
      margin: "0 auto",
      borderCollapse: "collapse",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    header: {
      backgroundColor: "#007BFF",
      color: "white",
      padding: "10px",
      border: "1px solid #ddd",
    },
    row: {
      backgroundColor: "#f9f9f9",
    },
    cell: {
      padding: "10px",
      border: "1px solid #ddd",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(238,236,225, 0.6)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    spinner: {
      fontSize: "50px",
      color: "#A6121F",
      animation: "spin 1.5s linear infinite",
    },
    loadingText: {
      color: "#A6121F",
      marginTop: "10px",
      fontSize: "16px",
    },
  };

  return (
    <div className="mt-2">
      {showAlert && (
        <div
          role="alert"
          className="mt-3 mb-3 relative flex flex-col w-full p-3 text-sm  bg-[#FEF3F3] rounded-md border-[#F23030] border-l-4"
        >
          <p className="flex text-base text-[#BC1C21] font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-5 w-5 mr-2 mt-0.5"
            >
              <path
                // strokeLinecap="round"
                // strokeLinejoin="round"
                // d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"

                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              ></path>
            </svg>
            There were errors with your submission
          </p>
          <ul className="list-disc">
            <li className="text-[#F56060] font-semibold ml-10 p-3">
              <p className="p-1 text-[#F56060] font-normal">{error}</p>
            </li>
          </ul>
        </div>
      )}

      <div className="mb-4">

      <div className="overflow-x-auto shadow-sm rounded-md border-2 border-gray-300 border-t-[#0B76B7] border-t-4 mb-4 mt-4">
      <h3 className="text-[#0B76B7] font-medium text-lg  px-4 py-1">
            SEND REVIEWS FOR PROCESSING 
              </h3>
            <p className="text-slate-500 font-medium text-sm px-4  pb-2">
            
            This feature provides two options: upload a CSV file containing reviews to generate and download a results file with classifications, or classify a single review and view the result immediately.
            </p>
            
          </div>


        <div className="mb-1  flex-col grid grid-cols-2 gap-4 sm:grid-cols-2">
          <div className="overflow-x-auto shadow-sm rounded-md border-2 border-gray-300 ">
            <div className="text-center h-96 px-4">
              <h3 className="text-[#0B76B7] font-medium text-lg px-4 py-2 mb-1 mt-4">
                Single Review
              </h3>

              <div className="flex flex-col items-center p-2">
                {/* <h6 className="text-xl font-bold mb-4">Select an Option</h6> */}
                <p className="text-[#637381] text-sm font-semibold mb-4">
                  Select a Category Assignment
                </p>

                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    // className='inline-flex items-center px-4 py-2 text-sm font-medium  bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-[#B30000] focus:z-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700  dark:focus:text-white'
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium  bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-[#B30000] focus:z-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700  dark:focus:text-white ${
                      selectedValue === "auto"
                        ? "text-[#B30000]"
                        : "text-[#637381]"
                    }`}
                    onClick={() => handleChange("auto")}
                  >
                    <svg
                      className="w-3 h-3 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                      />
                    </svg>
                    Auto mode
                  </button>

                  <button
                    type="button"
                    // className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#637381] bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-[#B30000] focus:z-10  focus:text-[#B30000] dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700  dark:focus:text-white"
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium  bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-[#B30000] focus:z-10  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700  dark:focus:text-white ${
                      selectedValue === "manual"
                        ? "text-[#B30000]"
                        : "text-[#637381]"
                    }`}
                    onClick={() => handleChange("manual")}
                  >
                    <svg
                      className="w-3 h-3 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                    Manual mode
                  </button>
                </div>
              </div>

              <div>
                <textarea
                  value={feedback}
                  disabled={loading || disabledButton}
                  onChange={handleFeedbackChange}
                  rows="5"
                  className="text-editor-container"
                  placeholder="Write some feedback here..."
                />
              </div>
              <div className="flex items-end justify-end mt-3">
                {/* Button to trigger the POST request */}
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={loading || disabledButton}
                  type="button"
                  // className={`flex items-center rounded-md bg-[#A6121F] py-2 px-4 border border-transparent text-center text-sm text-white shadow-sm hover:bg-[#A6121F] hover:text-[#D9AA1E] focus:hover:bg-[#A6121F] focus:hover:text-[#D9AA1E] focus:shadow-none active:hover:bg-[#A6121F] active:hover:text-[#D9AA1E] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                  className={`button-common ${
                    loading || disabledButton
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  
                  <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-1.5"
            >
              <path
                fillRule="evenodd"
                d="m5.4 2.736 3.429 3.429A5.046 5.046 0 0 1 10.134 6c.356.01.71.06 1.056.147l3.41-3.412c.136-.133.287-.248.45-.344A9.889 9.889 0 0 0 10.269 1c-1.87-.041-3.713.44-5.322 1.392a2.3 2.3 0 0 1 .454.344Zm11.45 1.54-.126-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.029.023.049.054.078.077.236.194.454.41.65.645.034.038.078.067.11.107l2.927-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.024.03-.057.052-.081.082a4.963 4.963 0 0 1-.633.639c-.041.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.442-4.763a3.036 3.036 0 0 0-1.383-1.1l-.012-.007a2.955 2.955 0 0 0-1-.213H10a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.01.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .489 1.716c.009.014.022.026.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.318.129.657.2 1 .213.392.015.784-.05 1.15-.192.012-.005.02-.013.033-.018a3.011 3.011 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.35.447L14.84 9.823c.112.428.166.869.16 1.311-.01.356-.06.709-.147 1.054l3.413 3.412c.132.134.249.283.347.444A9.88 9.88 0 0 0 20 11.269a9.912 9.912 0 0 0-1.386-5.319ZM14.6 19.264l-3.421-3.421c-.385.1-.781.152-1.18.157h-.134c-.356-.01-.71-.06-1.056-.147l-3.41 3.412a2.503 2.503 0 0 1-.443.347A9.884 9.884 0 0 0 9.732 21H10a9.9 9.9 0 0 0 5.044-1.388 2.519 2.519 0 0 1-.444-.348ZM1.735 15.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L1.735 6.4a2.507 2.507 0 0 1-.35-.447 9.889 9.889 0 0 0 0 10.1c.1-.164.217-.316.35-.453Zm5.101-.758a4.957 4.957 0 0 1-.651-.645c-.033-.038-.077-.067-.11-.107L3.15 17.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.03-.018-.05-.053-.078-.076ZM6.08 7.914c.03-.037.07-.063.1-.1.183-.22.384-.423.6-.609.047-.04.082-.092.129-.13L3.983 4.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707L6.08 7.914Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:block">
            {loading ? "Analyzing..." : "Analyze"}
            </span>

                  {/* {loading ? "Analyzing..." : "Analyze"} */}
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto shadow-sm rounded-md border-2 border-gray-300 ">
            <div className="text-center h-96 px-32">
              <h3 className="text-[#0B76B7] font-medium text-lg px-4 py-2 mb-1 mt-4">
                Bulk Feedback
              </h3>

              <div className="flex flex-col items-center p-2">
                {/* <h6 className="text-xl font-bold mb-4">Select an Option</h6> */}
                <p className="text-[#637381] text-sm font-semibold mb-4">
                  Select a Category Assignment
                </p>
                {/* <div className="flex gap-4">
                  <Radio
                    color="red"
                    id="option-auto"
                    name="options"
                    label="Auto"
                    value="auto"
                    checked={selectedValue === "auto"}
                    onChange={() => handleChange("auto")}
                  />
                  <Radio
                    color="red"
                    id="option-manual"
                    name="options"
                    label="Manual"
                    value="manual"
                    checked={selectedValue === "manual"}
                    onChange={() => handleChange("manual")}
                  />
                </div> */}
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    // className='inline-flex items-center px-4 py-2 text-sm font-medium  bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-[#B30000] focus:z-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700  dark:focus:text-white'
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium  bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-[#B30000] focus:z-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700  dark:focus:text-white ${
                      selectedValue === "auto"
                        ? "text-[#B30000]"
                        : "text-[#637381]"
                    }`}
                    onClick={() => handleChange("auto")}
                  >
                    <svg
                      className="w-3 h-3 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                      />
                    </svg>
                    Auto mode
                  </button>

                  <button
                    type="button"
                    // className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#637381] bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-[#B30000] focus:z-10  focus:text-[#B30000] dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700  dark:focus:text-white"
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium  bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-[#B30000] focus:z-10  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700  dark:focus:text-white ${
                      selectedValue === "manual"
                        ? "text-[#B30000]"
                        : "text-[#637381]"
                    }`}
                    onClick={() => handleChange("manual")}
                  >
                    <svg
                      className="w-3 h-3 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                    Manual mode
                  </button>
                </div>
              </div>

              <BottomButtonCenter
                setError={setError}
                showAlertMessage={showAlertMessage}
                selectedValue={selectedValue}
                disabledButton={disabledButton}
                setDisabledButton={setDisabledButton}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mb-12 mt-8">
        <Divider />
      </div>
     
      <div className="mb-12 mt-12">
        <Divider />
      </div> */}

      {disabledButton && (
        <div style={styles.overlay}>
          {/* <FaSpinner style={styles.spinner} />
          <p style={{ color: "#fff" }}>Loading...</p> */}
          <FcEngineering style={styles.spinner} />
          <p style={styles.loadingText}>Loading, Please wait...</p>
        </div>
      )}
    </div>
  );
};

// const BottomButtonCenter = () =>
const BottomButtonCenter = ({
  setError,
  showAlertMessage,
  selectedValue,
  disabledButton,
  setDisabledButton,
  selectedOption,
  setSelectedOption,
}) => {
  const [loading, setLoading] = useState(false);
  const [processingStatus, setProcessingStatus] = useState(null);
  //will open window dialog
  const ref = useRef();
  const handleClick = (e) => {
    setSelectedOption("Bulk Feedback");
    ref.current.click();
  };

  const navigate = useNavigate(); // Hook to navigate programmatically
  const goUploadReviewContent = () => {
    // navigate("/upload/content"); // Navigate to /upload/content page
    window.localStorage.setItem("selectedOption", selectedOption);
    window.localStorage.setItem("selectedValue", selectedValue);
    navigate('/upload/content', {
      state: {
        reviewOption: selectedOption,
        reviewMode: selectedValue,
      }
    });
  };
  // Handle CSV file selection
  const handleCsvChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      // console.log("No file selected");
      return;
    }

    setLoading(true);
    setDisabledButton(true);
    // console.log("ref.current.files[0].name: ", ref.current.files[0].name);
    // console.log("e.target.files[0]: ", selectedFile);
    const formData = new FormData();
    formData.append("file", selectedFile);

    const apiUrl = import.meta.env.VITE_API_URL;
    // console.log("API URL reviews:", apiUrl);

    const url =
      apiUrl + "/reviews/batch/upload?categoryAssignment=" + selectedValue;
    // const url = '/api/reviews/batch/upload';

    try {
      // const response = await fetch('http://localhost:3002/reviews/batch/upload', {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          // "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });

      const data = await response.json();
      e.target.value = null;
      // setLoading(false);

      if (response.status === 200) {
        // const data = await response.json();

        // console.log("job data: ", JSON.stringify(data));
        // console.log("job id: ", JSON.stringify(data.jobId));

        if (!data.jobId) {
          // window.localStorage.setItem('jobId', "");
          window.localStorage.setItem("jobId", 0);
          setError("Missing Job ID"); // Set error message if request fails
          showAlertMessage("Missing Job ID");
          setLoading(false);
          setDisabledButton(false);
          return;
        }

        const jobId = data.jobId;
        window.localStorage.setItem("jobId", data.jobId);
        // console.log("job id: ", jobId);

        const apiJobUrl = import.meta.env.VITE_API_URL;
        // console.log("API JOB URL reviews:", apiJobUrl);
        let urlJob = apiJobUrl + "/jobs/" + data.jobId + "/status";
        // let urlJob = '/api/jobs/' + data.jobId + '/status';

        setProcessingStatus("Running");
        setDisabledButton(true);
        const intervalId = setInterval(async () => {
          try {
            const response = await fetch(urlJob, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "*",
              },
            });

            const data = await response.json();
            // Check if the response is successful
            if (response.status === 200) {
              // console.log("setProcessingStatus: ", processingStatus);
              // console.log("data: ", data);
              if (data.status === "Completed") {
                window.localStorage.setItem("jobId", jobId);
                // console.log("job id: ", jobId);

                // console.log("intervalId: ", intervalId);
                clearInterval(intervalId); // Stop polling

                const apiUrl = import.meta.env.VITE_API_URL;
                // console.log("API URL reviews:", apiUrl);

                // const jobId = JSON.stringify(data.jobId);

                let url = apiUrl + "/reviews/batch/job/" + data.jobId;
                // let url = '/api/reviews/batch/job/' + data.jobId;

                try {
                  const response = await fetch(url, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      // "Access-Control-Allow-Origin": "*",
                    },
                  });

                  const data = await response.json();
                  // Check if the response is successful
                  if (response.status === 200) {
                    setProcessingStatus(data.status);
                    // console.log("Response", data);
                    // console.log("data", data);

                    const newInitialData = data.map((item) => {
                      const mergedArray = item.sentencePart.map((_, index) => ({
                        id: index,
                        sentencePart: item.sentencePart[index],
                        sentiment: item.sentiment[index],
                        category: item.category[index],
                        subCategory: item.subCategory[index],
                      }));

                      return {
                        ...item,
                        detail: mergedArray,
                      };
                    });

                    // console.log("newInitialData 2: ", newInitialData);

                    window.localStorage.setItem(
                      "restoreReviews",
                      // JSON.stringify(data)
                      JSON.stringify(newInitialData)
                    );
                    window.localStorage.setItem(
                      "currentReviews",
                      // JSON.stringify(data)
                      JSON.stringify(newInitialData)
                    );
                    goUploadReviewContent();
                  } else {
                    // console.log("Error ", data.error);
                    setLoading(false);
                    setDisabledButton(false);
                    setProcessingStatus("Error checking status.");
                    throw new Error(data.error);
                  }
                } catch (err) {
                  // console.log("Error 2", data.error);
                  setProcessingStatus("Error checking status.");
                  setError(err.message); // Set error message if request fails
                  showAlertMessage(err.message);
                } finally {
                  setLoading(false); // Set loading state to false once the request finishes
                  setDisabledButton(false);
                }
              }
              if (data.status === "Error") {
                setProcessingStatus("Error checking status.");
                clearInterval(intervalId);
                setLoading(false);
                setDisabledButton(false);
                throw new Error(data.error);
              }
            } else {
              // console.log("Error ", data.error);
              setProcessingStatus("Error checking status.");
              clearInterval(intervalId);
              setLoading(false);
              setDisabledButton(false);
              throw new Error(data.error);
            }
          } catch (err) {
            // console.log("Error 2", data.error);
            setProcessingStatus("Error checking status.");
            clearInterval(intervalId);
            setError(err.message); // Set error message if request fails
            setLoading(false);
            setDisabledButton(false);
            showAlertMessage(err.message);
            return;
          } finally {
            setLoading(false); // Set loading state to false once the request finishes
            // setDisabledButton(false);
          }
        }, 2000);
      } else {
        // const data = await response.json();
        setLoading(false);
        setDisabledButton(false);
        // console.log("error: ", JSON.stringify(data));
        setError(data.detail); // Set error message if request fails
        showAlertMessage(data.detail);
      }
    } catch (error) {
      setLoading(false);
      setDisabledButton(false);
      console.log(error);
      setError("Error uploading files");
      showAlertMessage("Error uploading files");
      setLoading(false);
      setDisabledButton(false);
    }
  };

  return (
    <div>
      <div className="bottom-bar-center">
        {/* <button className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  */}
        <button
          className={`button-common ${
            loading || processingStatus == "Running" || disabledButton
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          type="button"
          disabled={loading || disabledButton}
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 mr-1.5"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
              clipRule="evenodd"
            />
          </svg>
          {loading
            ? "Uploading..."
            : processingStatus == "Running"
            ? "Processing Status: Running..."
            : "Upload Bulk Feedback csv"}
        </button>
        <input
          ref={ref}
          onChange={handleCsvChange}
          type="file"
          id="input_file"
          name="input_file"
          accept=".csv"
          style={{ display: "none" }}
        />
        {/* {processingStatus && <p>Processing Status: {processingStatus}</p>} */}
      </div>
    </div>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default TextEditor;
