import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteDialog from "../../DeleteDialog";

const EditCategoryKeywordTable = ({ data, setData }) => {
  // State to manage the table data

  const [formRowId, setFormRowId] = useState(0);
  const rowsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = (id) => {
    setOpen(!open);
    // console.log("setOpen: ", open);
    setFormRowId(id);
    // console.log("setFormRowId: ", id);
  };

  // const handleOpen = () => setOpen(!open);

  useEffect(() => {
    // Check if there's already data in localStorage and use it
    let savedCategories = new Array();

    const result = localStorage.getItem("currentCodeframe");
    if (result) {
      savedCategories = JSON.parse(result);
    }

    // const savedCategories = JSON.parse(
    //   localStorage.getItem("currentCodeframe")
    // );
    if (savedCategories) {
      setData(savedCategories);
    }
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    const newdata = data.filter((row) => row.id !== id);
    window.localStorage.setItem("currentCodeframe", JSON.stringify(newdata));
    setData(data.filter((row) => row.id !== id));
  };

  // Handle edit action
  const handleEdit = (id) => {
    // const editedData = prompt(
    //   "Edit category:",
    //   data.find((row) => row.id === id).category
    // );
    // if (editedData) {
    //   setData(
    //     data.map((row) =>
    //       row.id === id ? { ...row, category: editedData } : row
    //     )
    //   );
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
    <>
      {open && (
        <div>
          <DeleteDialog
            open={open}
            setOpen={setOpen}
            handleDelete={handleDelete}
            id={formRowId}
            title={"Remove Category and Keyword"}
          />
        </div>
      )}

      <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-gray-300">
        <table className="min-w-full table-auto">
          <thead className="table-head-common">
            <tr>
              <th className="px-4 py-2 border-b text-left text-sm font-normal">ID</th>
              <th className="px-4 py-2 border-b text-left text-sm font-normal">Category</th>
              <th className="px-4 py-2 border-b text-left text-sm font-normal">
                Subcategory
              </th>
              {/* <th className="px-4 py-2 border-b text-left">Keyword</th> */}
              <th className="px-4 py-2 border-b text-sm font-normal">Actions</th>
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
            {currentData.map((row) => (
              <tr key={row.id} className="text-gray-700 even:bg-[#EEEEEE]">
                <td className="px-4 py-2 border-b text-left text-sm">
                  {row.id}
                </td>
                <td className="px-4 py-2 border-b text-left text-sm">
                  {row.category}
                </td>
                <td className="px-4 py-2 border-b text-left text-sm">
                  {row.subcategory}
                </td>
                {/* <td className="px-4 py-2 border-b text-left">{row.keyword}</td> */}
                <td className="px-4 py-2 border-b text-center">
                  <Link to={`/coding/edit/${row.id}`}>
                    <button
                      onClick={() => handleEdit(row.id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 me-2"
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
                    // onClick={() => handleDelete(row.id)}
                    onClick={() => handleOpenDialog(row.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 me-4"
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
            disabled={currentPage === totalPages || data.length === 0}
            className="px-4 py-2 text-[#A6121F] text-sm bg-white rounded-lg hover:text-[#CC9900] disabled:bg-[#FFFFFF] disabled:text-[#EEECE1] disabled:hover:text-[#EEECE1]"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCategoryKeywordTable;
