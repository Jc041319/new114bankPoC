import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import DeleteDialog from "../../DeleteDialog";

const UploadReviewTable = ({
  error,
  setError,
  showAlert,
  setShowAlert,
  data,
  setData,
}) => {
  const [formRowId, setFormRowId] = useState(0);
  const [expandedRows, setExpandedRows] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = (id) => {
    setOpen(!open);
    // console.log("setOpen: ", open);
    setFormRowId(id);
    // console.log("setFormRowId: ", id);
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // State to manage the table data
  const rowsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [showAlert, setShowAlert] = useState(false);

  const initialJobId = window.localStorage.getItem("jobId");

  // Fetch data from the API and store it in localStorage
  useEffect(() => {
    // Check if there's already data in localStorage and use it
    const savedReviews = JSON.parse(localStorage.getItem("currentReviews"));
    if (savedReviews) {
      setData(savedReviews);
    }
  }, []);

  // Handle delete action
  const handleDelete = (responseId) => {
    const newdata = data.filter((row) => row.responseId !== responseId);
    window.localStorage.setItem("currentReviews", JSON.stringify(newdata));
    const savedReviews = JSON.parse(localStorage.getItem("currentReviews"));
    setData(savedReviews);
  };

  // Handle edit action
  const handleEdit = (responseId) => {
    // console.log(
    //   "edit review: ",
    //   JSON.stringify(data.find((row) => row.responseId === responseId))
    // );
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {open && (
        <div>
          <DeleteDialog
            open={open}
            setOpen={setOpen}
            handleDelete={handleDelete}
            id={formRowId}
            title={"Remove Review"}
          />
        </div>
      )}
      <div className="table-common-box">
        <table className="min-w-full table-auto">
          <thead className="table-head-common">
            <tr>
              <th className="table-header-common"></th>
              {/* <th className="px-4 py-2 border-b text-left text-sm">
                Response ID
              </th>
              <th className="px-4 py-2 border-b text-left text-sm">
                Survey Bank
              </th>
              <th className="px-4 py-2 border-b text-left text-sm">Product</th>
              <th className="px-4 py-2 border-b text-left text-sm">
                NPS Category
              </th> */}
              <th className="table-header-common">NPS Reason</th>

              <th className="table-header-common">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="items-center justify-center border border-gray-300 py-6 px-24"
                >
                  <div className="w-full flex justify-center items-center mb-1 mt-1 pl-3">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-500">
                        No Data available in the table
                      </h3>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {currentData.map((row, index) => (
              <React.Fragment key={index}>
                <tr className="text-gray-700 even:bg-[#EEEEEE]">
                  <td className="px-4 py-2 border-b text-left">
                    <button
                      className="flex items-center gap-1 text-blue-500"
                      onClick={() => toggleRow(row.responseId)}
                    >
                      {expandedRows.includes(row.responseId) ? (
                        <FiChevronUp className="h-5 w-5" />
                      ) : (
                        <FiChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  {/* <td className="px-4 py-2 border-b text-left text-sm">
                    {row.responseId}
                  </td>
                  <td className="px-4 py-2 border-b text-left text-sm">
                    {row.surveyBank}
                  </td>
                  <td className="px-4 py-2 border-b text-left text-sm">
                    {row.product}
                  </td>
                  <td className="px-4 py-2 border-b text-left text-sm">
                    {row.npsCategory}
                  </td> */}
                  <td className="px-4 py-2 border-b text-left text-sm">
                    {row.npsReason}
                  </td>
                  {/* <td className="border-b text-left">
                  <ul className="px-1 border-l-2">
                    {row.sentencePart.map((item, index) =>
                      <li key={index} className="border-b border-gray-200 last:border-none">{item}</li>
                    )}
                  </ul>
                </td>
                <td className="border-b text-left">
                  <ul>
                    {row.sentiment.map((item, index) =>
                      <li key={index} className="border-b  border-gray-200 last:border-none">{item}</li>
                    )}
                  </ul>
                </td>
                <td className="border-b text-left">
                  <ul>
                    {row.category.map((item, index) =>
                      <li key={index} className="border-b border-gray-200 last:border-none">{item}</li>
                    )}
                  </ul>
                </td> */}
                  {/* <td className="px-4 py-2 border-b text-left"> */}
                  {/* <td className="border-b text-left">
                  <ul className="px-1 border-r">
                    {row.subCategory.map((item, index) =>
                      <li key={index} className="border-b border-gray-200 last:border-none">{item}</li>
                    )}
                  </ul>
                </td> */}
                  <td className="px-4 py-2 border-b text-center">
                    <Link to={`/upload/content/edit/${row.responseId}`}>
                      <button
                        onClick={() => handleEdit(row.responseId)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
                          ></path>
                        </svg>
                      </button>
                    </Link>

                    <button
                      // onClick={() => handleDelete(row.responseId)}
                      onClick={() => handleOpenDialog(row.responseId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>

                {expandedRows.includes(row.responseId) && (
                  <tr>
                    <td
                      colSpan="7"
                      className="items-center justify-center border border-gray-300 py-6 px-24"
                    >
                      <div className="overflow-x-auto  rounded-sm border-1 border-gray-300">
                        <table className="min-w-full table-auto border">
                          <thead className="bg-[#637381] text-[#FFFFFF]">
                            <tr>
                              <th className="px-4 py-2 border-b text-left text-sm font-normal">
                                Sentence Part
                              </th>
                              <th className="px-4 py-2 border-b text-center text-sm font-normal">
                                Sentiment
                              </th>
                              <th className="px-4 py-2 border-b text-center text-sm font-normal">
                                Category
                              </th>
                              <th className="px-4 py-2 border-b text-center text-sm font-normal">
                                SubCategory
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.detail.map((detail, index, rank) => (
                              <React.Fragment key={index}>
                                <tr key={detail.id}>
                                  <td className="px-4 py-2 border-b text-left text-xs">
                                    {detail.sentencePart}
                                  </td>

                                  <td className="px-4 py-2 border-b text-center text-xs bg-[#F9FAFB]">
                                    {/* {detail.sentiment} */}
                                    <span
                                      className={`inline-flex items-center  text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                        detail.sentiment === "positive"
                                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-red-300-50 cursor-not-allowed"
                                          : detail.sentiment === "negative"
                                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-blue-300-50 cursor-not-allowed"
                                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-red-300-50 cursor-not-allowed"
                                      }`}
                                    >
                                      {detail.sentiment}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 border-b text-center text-xs">
                                    {detail.category}
                                  </td>
                                  <td className="px-4 py-2 border-b text-center text-xs bg-[#F9FAFB]">
                                    {detail.subCategory}
                                  </td>
                                </tr>
                                {index === rank.length - 1 && (
                                  // <tr className="border-2 border-[#B30000] bg-[#F9FAFB]">
                                  <tr className="border-0 border-gray-700 bg-gray-700">
                                    <td className="px-4 py-2 border-b text-left text-sm font-bold text-[#FFFFFF]">
                                      OVERALL SENTIMENT RESULT:
                                    </td>
                                    {/* <td className="px-4 py-2 border-b text-left text-sm font-bold text-[#2C75B6]"> */}
                                    <td
                                      // className={`px-4 py-2 border-b text-left text-sm font-bold ${
                                      //   row.reviewSentiment == "Positive"
                                      //     ? "text-[#A6121F]"
                                      //     : row.reviewSentiment == "Negative"
                                      //     ? "text-[#666699]"
                                      //     : "text-[#CC9900]"
                                      // }`}

                                      className={`px-4 py-2 border-b text-center font-semibold text-xs  bg-gray-700`}
                                    >
                                      <span
                                        className={`inline-flex items-center  px-2.5 py-0.5 rounded-full ${
                                          row.reviewSentiment === "positive"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-red-300-50 cursor-not-allowed"
                                            : row.reviewSentiment ===
                                              "negative"
                                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-blue-300-50 cursor-not-allowed"
                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-red-300-50 cursor-not-allowed"
                                        }`}
                                      >
                                        {row.reviewSentiment}
                                      </span>
                                      {/* {row.reviewSentiment} */}
                                    </td>
                                    <td
                                      // className={`px-4 py-2 border-b text-left text-sm font-bold ${
                                      //   row.reviewSentiment == "Positive"
                                      //     ? "text-[#A6121F]"
                                      //     : row.reviewSentiment == "Negative"
                                      //     ? "text-[#666699]"
                                      //     : "text-[#CC9900]"
                                      // }`}
                                      className={`px-4 py-2 border-b text-center font-semibold text-xs  text-[#FFFFFF]`}
                                    >
                                      {row.reviewCategory}
                                    </td>
                                    <td
                                      // className={`px-4 py-2 border-b text-left text-sm font-bold ${
                                      //   row.reviewSentiment == "Positive"
                                      //     ? "text-[#A6121F]"
                                      //     : row.reviewSentiment == "Negative"
                                      //     ? "text-[#666699]"
                                      //     : "text-[#CC9900]"
                                      // }`}
                                      className={`px-4 py-2 border-b text-center font-semibold text-xs  text-[#FFFFFF]`}
                                    >
                                      {row.reviewSubCategory}
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>

                        {/* <div className="mb-1 mt-4  flex-col grid grid-cols-4 gap-2 sm:grid-cols-4">
                          <div className="w-full max-w-sm min-w-[100px]">
                            <label className="block mb-2 text-sm text-slate-600">
                              NPS Reason
                            </label>
                          </div>
                          <div className="w-full max-w-sm min-w-[100px]">
                            <label className="block mb-2 text-sm text-slate-600">
                              NPS Reason
                            </label>
                          </div>
                          <div className="w-full max-w-sm min-w-[100px]">
                            <label className="block mb-2 text-sm text-slate-600">
                              NPS Reason
                            </label>
                          </div>
                          <div className="w-full max-w-sm min-w-[100px]">
                            <label className="block mb-2 text-sm text-slate-600">
                              NPS Reason
                            </label>
                          </div>
                        </div> */}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-[#A6121F] text-sm bg-white rounded-lg hover:text-[#CC9900] disabled:bg-[#FFFFFF] disabled:text-[#EEECE1] disabled:hover:text-[#EEECE1]"
          >
            &lt; Previous
          </button>
          <span className="px-4 py-2 text-[#111928] text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || data.length === 0}
            className="px-4 py-2 text-[#A6121F] text-sm bg-white rounded-lg hover:text-[#CC9900] disabled:bg-[#FFFFFF] disabled:text-[#EEECE1] disabled:hover:text-[#EEECE1]"
          >
            Next &gt;
          </button>
        </div>
      </div>
      <ResultRestoreDownload
        setData={setData}
        initialJobId={initialJobId}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </div>
  );
};

const ResultRestoreDownload = ({
  setData,
  initialJobId,
  loading,
  setLoading,
  error,
  setError,
  showAlert,
  setShowAlert,
}) => {
  const handleDownload = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      // console.log("API URL reviews:", apiUrl);
      // Replace this URL with your API endpoint that returns a file
      const url = apiUrl + "/reviews/batch/job/" + initialJobId + "/download";
      // const url = '/api/reviews/batch/job/' + initialJobId + '/download';
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

        const filename = import.meta.env.VITE_DOWNLOADED_REVIEW_FILENAME_EXT;

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

  // Handle restore action
  const handleRestore = () => {
    // Check if there's already data in localStorage and use it
    const savedReviews = JSON.parse(localStorage.getItem("restoreReviews"));
    if (savedReviews) {
      setData(savedReviews);
      window.localStorage.setItem(
        "currentReviews",
        JSON.stringify(savedReviews)
      );
    }
  };

  const showAlertMessage = (message) => {
    setShowAlert(true);

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="w-full flex justify-between items-center mb-3 mt-6 pl-0">
      <div>
        <div className="flex flex-row items-start justify-start ">
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
      </div>
      <div>
        <div className="flex flex-row items-start justify-start ">
          {/* <button className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  */}
          <button
            className={`button-common ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDownload}
            disabled={initialJobId == 0 || loading}
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
            <span className="hidden sm:block">
              {loading ? "Downloading..." : "Download Result"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadReviewTable;
