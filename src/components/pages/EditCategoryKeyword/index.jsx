import TopNavigation from "../../TopNavigation";
import { BsPlusCircleFill } from "react-icons/bs";
import Footer from "../../Footer";
import EditCategoryKeywordTable from "../../tables/EditCategoryKeywordTable";
import React, { useState, useRef, useEffect } from "react";

const EditCategoryKeyword = ({ data, setData }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const showAlertMessage = (message) => {
    setShowAlert(true);

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const showSuccessMessage = () => {
    setShowSuccessAlert(true);

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list">
        <div className="text-editor-content mt-4">
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

          {showSuccessAlert && (
            <div
              role="alert"
              className="mt-3 mb-3 relative flex flex-col w-full p-3 text-sm  bg-[#DAF8E6] rounded-md border-[#22AD5C] border-l-4"
            >
              <p className="flex text-base text-[#004434] font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 inline w-5 h-5 me-3 mt-0.5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  // className="h-5 w-5 mr-2 mt-0.5 "
                >
                  <path
                    // strokeLinecap="round"
                    // strokeLinejoin="round"
                    // d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"

                    fillRule="evenodd"
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Success!
              </p>
              <ul className="list-disc">
                <li className="text-[#637381] font-semibold ml-10 p-3">
                  <p className="p-1 text-[#637381] font-normal">
                    Document uploaded successfully.
                  </p>
                </li>
              </ul>
            </div>
          )}

          <EditCategoryKeywordHeader
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            showAlertMessage={showAlertMessage}
            newData={data}
            setNewData={setData}
            showSuccessAlert={showSuccessAlert}
            setShowSuccessAlert={setShowSuccessAlert}
            showSuccessMessage={showSuccessMessage}
          />
          <EditCategoryKeywordTable data={data} setData={setData} />
          <EditCategoryKeywordtRestoreSave
            data={data}
            setData={setData}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            showAlertMessage={showAlertMessage}
            setNewData={setData}
          />
        </div>
      </div>
    </div>
  );
};

const EditCategoryKeywordHeader = ({
  error,
  setError,
  loading,
  setLoading,
  showAlert,
  setShowAlert,
  showAlertMessage,
  newData,
  setNewData,
  showSuccessAlert,
  setShowSuccessAlert,
  showSuccessMessage,
}) => {
  //will open window dialog
  const ref = useRef();
  const handleClick = (e) => {
    ref.current.click();
  };

  // Handle CSV file selection
  const handleCsvChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      // console.log("No file selected");
      return;
    }

    setLoading(true);
    // console.log("ref.current.files[0].name: ", ref.current.files[0].name);
    // console.log("e.target.files[0]: ", selectedFile);
    const formData = new FormData();
    formData.append("file", selectedFile);

    const apiUrl = import.meta.env.VITE_API_URL;
    // console.log("API URL codeframe:", apiUrl);

    const url = apiUrl + "/codeframe/upload";
    // const url = '/api/codeframe/upload';

    try {
      // const response = await fetch('http://localhost:3002/reviews/batch/upload', {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          // "Content-Type": "multipart/form-data",
          // "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });

      const data = await response.json();
      e.target.value = null;
      setLoading(false);

      if (response.status === 200) {
        setShowSuccessAlert(true);
        showSuccessMessage();
        // const data = await response.json();

        // console.log("data: ", JSON.stringify(data));
        // console.log("job id: ", JSON.stringify(data.jobId));

        if (!data.successflag) {
          setError("An Error occured in the upload. Please try again later."); // Set error message if request fails
          showAlertMessage(
            "An Error occured in the upload. Please try again later."
          );
          return;
        }

        //Get list codeframe
        const getURl = apiUrl + "/codeframe";

        try {
          const response = await fetch(getURl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          // Check if the response is successful
          if (response.status === 200) {
            // console.log("Response", data);
            // console.log("data", data);
            window.localStorage.setItem(
              "restoreCodeframe",
              JSON.stringify(data)
            );
            window.localStorage.setItem(
              "currentCodeframe",
              JSON.stringify(data)
            );
            setNewData(data);
          } else {
            // console.log("Error codeframe", data.error);
            setLoading(false);
            throw new Error(data.error);
          }
        } catch (err) {
          // console.log("Error codeframe 2", data.error);
          setError(err.message); // Set error message if request fails
          showAlertMessage(err.message);
        } finally {
          setLoading(false); // Set loading state to false once the request finishes
        }
      } else {
        // const data = await response.json();
        // console.log("error: ", JSON.stringify(data));
        setError(data.error); // Set error message if request fails
        showAlertMessage(data.error);
      }
    } catch (error) {
      console.log(error);
      setError("Error uploading files");
      showAlertMessage("Error uploading files");
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      // console.log("API URL reviews:", apiUrl);
      // Replace this URL with your API endpoint that returns a file
      const url = apiUrl + "/codeframe/download";
      // const url = '/api/codeframe/download';
      const response = await fetch(url, {
        method: "GET",
        headers: {
          // Add any headers if necessary (e.g., Authorization)
          // "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.status === 200) {
        const blob = await response.blob();
        // console.log("blob", blob);

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        // console.log("link", JSON.stringify(link.href));

        const filename = import.meta.env.VITE_DOWNLOADED_CODEFRAME_FILENAME_EXT;

        link.download = filename; // Customize the file name and extension
        link.click(); // Trigger the download

        URL.revokeObjectURL(link.href);
      } else {
        throw new Error("Failed to fetch the file");
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      showAlertMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
      <div>
        <h3 className="text-[#0B76B7] font-medium text-lg">
          EDIT CODEFRAME AND CODING
        </h3>
        <p className="text-slate-500">
          Modify existing categories and keywords .
        </p>
      </div>

      <div className="w-full max-w-sm min-w-[100px] ">
        <div className="flex space-x-2  py-2 items-end justify-end ">
          <button
            className={`button-common ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="button"
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
            {loading ? "Uploading..." : "Upload CSV"}
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
          <button
            // className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            className="button-common"
            onClick={handleDownload}
            disabled={loading}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-1.5"
            >
              <path
                fillRule="evenodd"
                d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:block">Download CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const EditCategoryKeywordtRestoreSave = ({
  data,
  setData,
  error,
  setError,
  loading,
  setLoading,
  showAlert,
  setShowAlert,
  showAlertMessage,
  setNewData,
}) => {
  // Handle restore action
  const handleRestore = async () => {
    // Check if there's already data in localStorage and use it
    const saveCodeframe = JSON.parse(localStorage.getItem("restoreCodeframe"));
    if (saveCodeframe) {
      setData(saveCodeframe);
      window.localStorage.setItem(
        "currentCodeframe",
        JSON.stringify(saveCodeframe)
      );
    } else {
      try {
        const apiUrl = import.meta.env.VITE_API_URL + "/codeframe";
        // const apiUrl = '/api/codeframe';
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
        });

        const data = await response.json();
        // Check if the response is successful
        if (response.status === 200) {
          // console.log("Response", data);
          // console.log("data", data);
          window.localStorage.setItem("restoreCodeframe", JSON.stringify(data));
          window.localStorage.setItem("currentCodeframe", JSON.stringify(data));
          setNewData(data);
        } else {
          // console.log("Error codeframe", data.error);
          setLoading(false);
          throw new Error(data.error);
        }
      } catch (err) {
        // console.log("Error codeframe 2", data.error);
        setError(err.message); // Set error message if request fails
        showAlertMessage(err.message);
      } finally {
        setLoading(false); // Set loading state to false once the request finishes
      }
    }
  };

  const handleInitialLoad = async () => {
    // Check if there's already data in localStorage and use it
    const saveCodeframe = JSON.parse(localStorage.getItem("currentCodeframe"));
    if (saveCodeframe) {
      setData(saveCodeframe);
      window.localStorage.setItem(
        "currentCodeframe",
        JSON.stringify(saveCodeframe)
      );
    } else {
      try {
        const apiUrl = import.meta.env.VITE_API_URL + "/codeframe";
        // const apiUrl = '/api/codeframe';
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
        });

        const data = await response.json();
        // Check if the response is successful
        if (response.status === 200) {
          // console.log("Response", data);
          // console.log("data", data);
          window.localStorage.setItem("restoreCodeframe", JSON.stringify(data));
          window.localStorage.setItem("currentCodeframe", JSON.stringify(data));
          setNewData(data);
        } else {
          // console.log("Error codeframe", data.error);
          setLoading(false);
          throw new Error(data.error);
        }
      } catch (err) {
        // console.log("Error codeframe 2", data.error);
        setError(err.message); // Set error message if request fails
        showAlertMessage(err.message);
      } finally {
        setLoading(false); // Set loading state to false once the request finishes
      }
    }
  };

  const handleSave = async () => {
    // Check if there's already data in localStorage and use it

    try {
      const currentCodeframe = JSON.parse(
        localStorage.getItem("currentCodeframe")
      );

      const getUrl = import.meta.env.VITE_API_URL + "/codeframe";
      // const apiUrl = '/api/codeframe';
      const getResponse = await fetch(getUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const getData = await getResponse.json();
      // Check if the response is successful
      if (getResponse.status === 200) {
        const savedCodeframe = getData.map((v) => ({
          ...v,
          // action: import.meta.env.VITE_CODEFRAME_STATUS_DELETE,
          action: "delete",
        }));
        // console.log("savedCodeframe: ", savedCodeframe);

        const idSet = new Set(currentCodeframe.map((o) => o.id));

        // setMainArray(savedCodeframe);
        // Function to update the main array based on updates array
        // const updateArray = () => {
        const updatedArray = savedCodeframe.map((item) => {
          const updatedItem = currentCodeframe.find(
            (update) => update.id === item.id
          );
          return updatedItem ? { ...item, ...updatedItem } : item;
        });
        // setMainArray(updatedArray);
        // };

        const newSavedCodeframe = updatedArray.map((o) => ({
          ...o,
          action: idSet.has(o.id)
            ? // ? import.meta.env.VITE_CODEFRAME_STATUS_UPDATE
              "update"
            : o.action,
        }));

        const apiUrl = import.meta.env.VITE_API_URL + "/codeframe";
        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSavedCodeframe),
        });

        const data = await response.json();
        if (response.status === 200) {
          // console.log("Response put ", data);
          // console.log("data put", data);

          const getUrl = import.meta.env.VITE_API_URL + "/codeframe";
          // const apiUrl = '/api/codeframe';
          const getResponse = await fetch(getUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const getData = await getResponse.json();
          // Check if the response is successful
          if (getResponse.status === 200) {
            const idSet = new Set(getData.map((o) => o.id));

            const savedCodeframe = currentCodeframe.map((v) => ({
              ...v,
              // action: import.meta.env.VITE_CODEFRAME_STATUS_ADD,
              action: "add",
            }));

            // console.log("savedCodeframe: ", savedCodeframe);

            const newSavedCodeframe = savedCodeframe.map((o) => ({
              ...o,
              action: idSet.has(o.id)
                ? // ? import.meta.env.VITE_CODEFRAME_STATUS_UPDATE
                  "update"
                : o.action,
            }));

            const apiUrl = import.meta.env.VITE_API_URL + "/codeframe";
            const response = await fetch(apiUrl, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newSavedCodeframe),
            });

            const data = await response.json();
            if (response.status === 200) {
              setLoading(false);
            } else {
              setLoading(false);
              throw new Error(data.error);
            }
          } else {
            // console.log("Error put codeframe", data.error);
            setLoading(false);
            throw new Error(data.error);
          }
        } else {
          // console.log("Error put codeframe", data.error);
          setLoading(false);
          throw new Error(data.error);
        }
      } else {
        // console.log("Error put codeframe", data.error);
        setLoading(false);
        throw new Error(data.error);
      }

      // const restoreCodeframe = JSON.parse(
      //   localStorage.getItem("restoreCodeframe")
      // );
      // const currentCodeframe = JSON.parse(
      //   localStorage.getItem("currentCodeframe")
      // );

      // const savedCodeframe = restoreCodeframe.map((v) => ({
      //   ...v,
      //   action: import.meta.env.VITE_CODEFRAME_STATUS_DELETE,
      // }));
      // console.log("savedCodeframe: ", savedCodeframe);

      // const idSet = new Set(currentCodeframe.map((o) => o.id));
      // const newSavedCodeframe = savedCodeframe.map((o) => ({
      //   ...o,
      //   action: idSet.has(o.id)
      //     ? import.meta.env.VITE_CODEFRAME_STATUS_UPDATE
      //     : o.action,
      // }));

      // console.log("newSavedCodeframe: ", newSavedCodeframe);

      // const getUrl = import.meta.env.VITE_API_URL + "/codeframe";
      // // const apiUrl = '/api/codeframe';
      // const getResponse = await fetch(getUrl, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // "Access-Control-Allow-Origin": "*",
      //   },
      // });

      // const getData = await getResponse.json();
      // // Check if the response is successful
      // if (getResponse.status === 200) {
      //   console.log("Response getData:", getData);

      //   const idSet = new Set(getData.map((o) => o.id));

      //   const nextSavedCodeframe = newSavedCodeframe.map((o) => ({
      //     ...o,
      //     action: idSet.has(o.id)
      //       ? o.action
      //       : import.meta.env.VITE_CODEFRAME_STATUS_ADD,
      //   }));

      //   console.log("nextSavedCodeframe: ", nextSavedCodeframe);

      //   const apiUrl = import.meta.env.VITE_API_URL + "/codeframe";
      //   // const apiUrl = '/api/codeframe';
      //   const response = await fetch(apiUrl, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //       // "Access-Control-Allow-Origin": "*",
      //     },
      //     body: JSON.stringify(nextSavedCodeframe),
      //   });

      //   const data = await response.json();
      //   // Check if the response is successful
      //   if (response.status === 200) {
      //     console.log("Response put ", data);
      //     console.log("data put", data);
      //   } else {
      //     console.log("Error put codeframe", data.error);
      //     setLoading(false);
      //     throw new Error(data.error);
      //   }
      // } else {
      //   console.log("Error codeframe", data.error);
      //   setLoading(false);
      //   throw new Error(data.error);
      // }
    } catch (err) {
      // console.log("Error put codeframe 2", data.error);
      setError(err.message); // Set error message if request fails
      showAlertMessage(err.message);
    } finally {
      setLoading(false); // Set loading state to false once the request finishes
    }
  };

  // Fetch data on page load
  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <div className="w-full flex justify-between items-center mb-3 mt-6 pl-0">
      <div>
        <button
          className="button-common"
          onClick={() => handleRestore()}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 mr-1.5"
          >
            <path
              fillRule="evenodd"
              d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden sm:block">Restore</span>
        </button>
      </div>
      <div>
        <div className="flex flex-row items-start justify-start ">
          <button
            // className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            className="button-common"
            onClick={() => handleSave()}
            type="button"
          >
            <svg
              className="w-4 h-4 me-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>
            <span className="hidden sm:block">Save</span>

            {/* Save */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryKeyword;
