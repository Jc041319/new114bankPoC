import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HistoricDataTable = ({}) => {
  const initialData = [
    {
      responseId: 1,
      input: "Input 1 Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      responseId: 2,
      input: "Input 2 Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      responseId: 3,
      input: "Input 3 Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      responseId: 4,
      input: "Input 4 Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      responseId: 5,
      input: "Input 5 Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      responseId: 6,
      input: "Input 6 Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      responseId: 7,
      input: "Input 7 Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      responseId: 8,
      input: "Input 8 Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
  ];

  // State to manage the table data
  const rowsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState(initialData);
  const [data, setData] = useState([]);

  // State to manage table data, API loading state, and localStorage data
  //  const [tableData, setTableData] = useState([]);

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
    // const editedData = prompt('Edit category:', data.find((row) => row.responseId === responseId).category);

    // console.log(
    //   "edit review: ",
    //   JSON.stringify(data.find((row) => row.responseId === responseId))
    // );

    // if (editedData) {
    //   setData(data.map((row) =>
    //     row.responseId === responseId ? { ...row, category: editedData } : row
    //   ));
    // }
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
      <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-gray-300">
        <table className="min-w-full table-auto">
        <thead className="table-head-common">
            <tr>
              <th className="px-4 py-2 border-b text-left">Response ID</th>
              <th className="px-4 py-2 border-b text-left">Survey Bank</th>
              <th className="px-4 py-2 border-b text-left">Product</th>
              <th className="px-4 py-2 border-b text-left">NPS Category</th>
              <th className="px-4 py-2 border-b text-left">NPS Reason</th>
              <th className="px-4 py-2 border-b text-left">Sentence Part</th>
              <th className="px-4 py-2 border-b text-left">Sentiment</th>
              <th className="px-4 py-2 border-b text-left">Category</th>
              <th className="px-4 py-2 border-b text-left">SubCategory</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr key={row.responseId} className="text-gray-700">
                <td className="px-4 py-2 border-b text-left">
                  {row.responseId}
                </td>
                <td className="px-4 py-2 border-b text-left">
                  {row.surveyBank}
                </td>
                <td className="px-4 py-2 border-b text-left">{row.product}</td>
                <td className="px-4 py-2 border-b text-left">
                  {row.npsCategory}
                </td>
                <td className="px-4 py-2 border-b text-left">
                  {row.npsReason}
                </td>
                <td className="px-4 py-2 border-b text-left">
                  {row.sentencePart}
                </td>
                <td className="px-4 py-2 border-b text-left">
                  {row.sentiment}
                </td>
                <td className="px-4 py-2 border-b text-left">{row.category}</td>
                <td className="px-4 py-2 border-b text-left">
                  {row.subCategory}
                </td>
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
                    onClick={() => handleDelete(row.responseId)}
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
            &lt; Prev
          </button>
          <span className="px-4 py-2 text-[#111928] text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-[#A6121F] text-sm bg-white rounded-lg hover:text-[#CC9900] disabled:bg-[#FFFFFF] disabled:text-[#EEECE1] disabled:hover:text-[#EEECE1]"
          >
            Next &gt;
          </button>
        </div>
      </div>
      {/* <ResultRestoreDownload setData={setData}/> */}
    </div>
  );
};

const ResultRestoreDownload = ({ setData }) => {
  // Handle delete action
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

  return (
    <div className="w-full flex justify-between items-center mb-3 mt-6 pl-0">
      <div>
        <div className="flex flex-row items-start justify-start ">
          {/* <button className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  */}
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
          <button className="button-common" type="button">
            Download Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricDataTable;
