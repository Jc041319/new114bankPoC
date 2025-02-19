import TopNavigation from "../../TopNavigation";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";

const UploadReviewContentEdit = ({ data, updateData }) => {
  const { id } = useParams(); // Get the row id from the URL
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // Navigate to home page
  };

  const rowData = data.find((row) => row.responseId === id);
  // console.log("row Data: ", rowData);

  const [formData, setFormData] = useState({
    responseId: rowData.responseId,
    surveyBank: rowData.surveyBank,
    product: rowData.product,
    category: rowData.category,
    npsCategory: rowData.npsCategory,
    npsReason: rowData.npsReason,
    sentencePart: rowData.sentencePart,
    sentiment: rowData.sentiment,
    subCategory: rowData.subCategory,
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
          <FormUploadReviewContentEdit
            updateDataReview={updateData}
            rowData={rowData}
            id={id}
            navigate={navigate}
          />
        </div>
      </div>
    </div>
  );
};

const FormUploadReviewContentEdit = ({
  updateDataReview,
  rowData,
  id,
  navigate,
}) => {
  const [formData, setFormData] = useState({
    responseId: rowData.responseId,
    surveyBank: rowData.surveyBank,
    product: rowData.product,
    category: rowData.category,
    npsCategory: rowData.npsCategory,
    npsReason: rowData.npsReason,
    sentencePart: rowData.sentencePart,
    sentiment: rowData.sentiment,
    subCategory: rowData.subCategory,
    reviewSentiment: rowData.reviewSentiment,
    reviewCategory: rowData.reviewCategory,
    reviewSubCategory: rowData.reviewSubCategory,
    detail: rowData.detail,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeValueResult = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle input changes for table cells
  const handleInputChange = (id, field, value) => {
    const updatedData = formData.detail.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setFormData((prevData) => ({
      ...prevData,
      detail: updatedData,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateDataReview(formData.responseId, formData); // Update the row data
    // navigate("/upload/content"); // Redirect back to the table
    const selectedOption = window.localStorage.getItem("selectedOption");
    const selectedValue = window.localStorage.getItem("selectedValue");

    navigate('/upload/content', {
      state: {
        reviewOption: selectedOption,
        reviewMode: selectedValue,
      }
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // navigate("/upload/content"); // Redirect back to the table
    const selectedOption = window.localStorage.getItem("selectedOption");
    const selectedValue = window.localStorage.getItem("selectedValue");

    navigate('/upload/content', {
      state: {
        reviewOption: selectedOption,
        reviewMode: selectedValue,
      }
    });

  };

  return (
    <div>
      <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-gray-300 border-t-[#0B76B7] border-t-4">
        <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
          <div>
            <h4 className="px-4 pt-2 block text-[#0B76B7] font-medium text-lg">
              EDIT REVIEW
            </h4>
            <p className="text-slate-500 font-medium text-sm px-4">
              Review ID: {formData.responseId}
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
          <div className="mb-1  flex-col grid grid-cols-1 gap-2 sm:grid-cols-1">
            {/* <div className="mb-1  flex-col grid grid-cols-4 gap-2 sm:grid-cols-4"> */}
            {/* <div className="my-4 flex items-center gap-2 col-span-full"> */}
            <div>
              {/* <div className="w-full max-w-sm min-w-[200px]"> */}
              <div>
                <label className="block mb-2 text-sm text-slate-600">
                  {/* Survey Bank */}
                  NPS Reason
                </label>
                {/* <input
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  name="surveyBank"
                  // value={formData.surveyBank}
                  value={formData.npsReason}
                  onChange={handleChange}
                  // placeholder="Survey Bank"
                   placeholder="NPS Reason"
                /> */}
                <textarea
                  value={formData.npsReason}
                  name="npsReason"
                  disabled={false}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg 
                              focus:outline-none focus:ring-2 focus:ring-blue-500
                               placeholder:text-slate-400 text-slate-700 text-sm"
                />
              </div>
            </div>
            {/* <div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Product
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Product"
                />
              </div>
            </div>
            <div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  NPS Category
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  name="npsCategory"
                  value={formData.npsCategory}
                  onChange={handleChange}
                  placeholder="NPS Category"
                />
              </div>
            </div>
            <div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  NPS Reason
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  name="npsReason"
                  value={formData.npsReason}
                  onChange={handleChange}
                  placeholder="NPS Reason"
                />
              </div>
            </div> */}
          </div>
          <div className="overflow-x-auto  rounded-sm border-1 border-gray-300">
            <table className="my-4 min-w-full table-auto border">
              <thead className="bg-[#637381] text-[#FFFFFF]">
                <tr>
                  <th className="px-4 py-2 border-b text-left text-sm font-normal">
                    Sentence Part
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-normal">
                    Sentiment
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-normal">
                    Category
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-normal">
                    SubCategory
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.detail.map((detail, index, rank) => (
                  <tr key={detail.id}>
                    <td className="px-4 py-2 border-b text-left text-xs">
                      <input
                        type="text"
                        value={detail.sentencePart}
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        onChange={(e) =>
                          handleInputChange(
                            detail.id,
                            "sentencePart",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-2 border-b text-left text-xs">
                      <input
                        type="text"
                        value={detail.sentiment}
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        onChange={(e) =>
                          handleInputChange(
                            detail.id,
                            "sentiment",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-2 border-b text-left text-xs">
                      <input
                        type="text"
                        value={detail.category}
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        onChange={(e) =>
                          handleInputChange(
                            detail.id,
                            "category",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-2 border-b text-left text-xs">
                      <input
                        type="text"
                        value={detail.subCategory}
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        onChange={(e) =>
                          handleInputChange(
                            detail.id,
                            "subCategory",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}

                <tr className="border-0 border-gray-700 bg-gray-700">
                  <td className="px-4 py-2 border-b text-left text-sm font-bold text-[#FFFFFF]">
                    OVERALL SENTIMENT RESULT:
                  </td>

                  <td className="px-4 py-2 border-b text-left text-xs">
                    <input
                      type="text"
                      value={formData.reviewSentiment}
                      className="w-full bg-transparent placeholder:text-slate-400 text-[#FFFFFF] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      onChange={(e) =>
                        handleChangeValueResult(
                          "reviewSentiment",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td className="px-4 py-2 border-b text-left text-xs">
                    <input
                      type="text"
                      value={formData.reviewCategory}
                      className="w-full bg-transparent placeholder:text-slate-400 text-[#FFFFFF] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      onChange={(e) =>
                        handleChangeValueResult(
                          "reviewCategory",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td className="px-4 py-2 border-b text-left text-xs">
                    <input
                      type="text"
                      value={formData.reviewSubCategory}
                      className="w-full bg-transparent placeholder:text-slate-400 text-[#FFFFFF] text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      onChange={(e) =>
                        handleChangeValueResult(
                          "reviewSubCategory",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
    </div>
  );
};

export default UploadReviewContentEdit;
