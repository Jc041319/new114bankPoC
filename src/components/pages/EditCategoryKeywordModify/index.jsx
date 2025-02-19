import TopNavigation from "../../TopNavigation";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";

const EditCategoryKeywordModify = ({
  dataCodeframe,
  setDataCodeframe,
  updateDataCodeframe,
}) => {
  const { id } = useParams(); // Get the row id from the URL
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // Navigate to home page
  };

  // const rowData = dataReview.find((row) => row.id === parseInt(id));
  const rowData = dataCodeframe.find((row) => row.id === id);
  // console.log("row Data: ", rowData);

  const [formData, setFormData] = useState({
    id: rowData.id,
    category: rowData.category,
    subcategory: rowData.subcategory,
  });

  // If row not found, redirect to the table page
  if (!rowData) {
    // console.log("missing row Data: ", rowData);

    return (
      <div className="content-container">
        <TopNavigation />
        <div className="content-list">
          <div className="text-editor-content mt-4">
            <div className="flex justify-center items-center ">
              <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
                <h1 className="text-4xl font-semibold text-red-600">404</h1>
                <p className="text-xl text-gray-700 mt-4">
                  Oops! Page not found.
                </p>
                <button
                  onClick={goHome}
                  className="mt-6 px-6 py-2 bg-[#2C75B6] text-white rounded-md hover:bg-[#2C75B6] hover:text-[#D9AA1E] transition duration-300"
                >
                  Go Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list">
        <div className="text-editor-content mt-4">
          <FormEditCategoryKeywordModify
            updateDataCodeframe={updateDataCodeframe}
            setDataCodeframe={setDataCodeframe}
            rowData={rowData}
            id={id}
            navigate={navigate}
          />
        </div>
      </div>
    </div>
  );
};

const FormEditCategoryKeywordModify = ({
  updateDataCodeframe,
  setDataCodeframe,
  rowData,
  id,
  navigate,
}) => {
  const [formData, setFormData] = useState({
    id: rowData.id,
    category: rowData.category,
    subcategory: rowData.subcategory,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    updateDataCodeframe(formData.id, formData); // Update the row data
    navigate("/coding"); // Redirect back to the table
  };

  const handleCancel = (e) => {
    e.preventDefault();

    navigate("/coding"); // Redirect back to the table
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-gray-300 border-t-[#0B76B7] border-t-4">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h4 className="px-4 pt-2 block text-[#0B76B7] font-medium text-lg">
            EDIT CODEFRAME AND CODING
          </h4>
          <p className="text-slate-500 font-medium text-sm px-4">
            Codeframe ID: {formData.id}
          </p>
        </div>

        <div className="w-full max-w-sm min-w-[100px] ">
          <div className="flex space-x-2  py-2 items-end justify-end ">
            <button
              className={"button-common-cancel"}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6">
        <div className="mb-1  flex-col grid grid-cols-2 gap-1 sm:grid-cols-2">
          {/* <div> */}
          <div className="w-full max-w-xl min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">
              Category
            </label>
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />
          </div>
          {/* </div> */}

          <div>
            <div className="w-full max-w-xl min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                SubCategory
              </label>
              <input
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                placeholder="SubCategory"
              />
            </div>
          </div>
        </div>
        <div className="my-4 flex items-center justify-center col-span-full">
          <button
            className="mt-4 w-1/4 rounded-md bg-[#2C75B6] text-white hover:bg-[#2C75B6] hover:text-[#D9AA1E] py-2 px-4 border border-transparent text-center text-sm  transition-all shadow-md hover:shadow-lg focus:bg-[#2C75B6] focus:shadow-none active:bg-[#2C75B6]  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>

    // <div className="content-list">
    //   <div className="text-editor-content mt-4">
    //     <div className="flex justify-start items-start ">
    //       <div className="relative flex flex-col rounded-xl bg-transparent">
    //         <h4 className="block text-xl font-medium text-slate-800">
    //           EDIT CODEFRAME AND CODING
    //         </h4>
    //         <p className="text-slate-500 font-light">ID: {formData.id}</p>
    //         <form
    //           onSubmit={handleSubmit}
    //           className=" mt-8 mb-2 w-max max-w-screen-lg sm:w-max"
    //         >
    //           <div className="mb-1  flex-col grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //             <div className="my-4 flex items-center gap-2 col-span-full">
    //               <div>
    //                 <div className="w-full max-w-sm min-w-[200px]">
    //                   <label className="block mb-2 text-sm text-slate-600">
    //                     Category
    //                   </label>
    //                   <input
    //                     type="text"
    //                     className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
    //                     name="category"
    //                     value={formData.category}
    //                     onChange={handleChange}
    //                     placeholder="Category"
    //                   />
    //                 </div>
    //               </div>
    //               <div>
    //                 <div className="w-full max-w-sm min-w-[200px]">
    //                   <label className="block mb-2 text-sm text-slate-600">
    //                     SubCategory
    //                   </label>
    //                   <input
    //                     type="text"
    //                     className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
    //                     name="subcategory"
    //                     value={formData.subcategory}
    //                     onChange={handleChange}
    //                     placeholder="SubCategory"
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <button
    //             className="mt-4 w-full rounded-md bg-[#2C75B6] text-white rounded-md hover:bg-[#2C75B6] hover:text-[#D9AA1E] py-2 px-4 border border-transparent text-center text-sm  transition-all shadow-md hover:shadow-lg focus:bg-[#2C75B6] focus:shadow-none active:bg-[#2C75B6]  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    //             type="submit"
    //           >
    //             Save
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default EditCategoryKeywordModify;
