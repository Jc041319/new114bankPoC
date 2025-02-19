import TopNavigation from "../../TopNavigation";
import UploadReviewTable from "../../tables/UploadReviewTable";
import { useState } from "react";
import { useLocation } from "react-router-dom";


const UploadReviewContent = ({ data, setData }) => {
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();

  const reviewOption = location.state.reviewOption;
  const reviewMode = location.state.reviewMode;

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

          <ResultSyncHeader 
            reviewOption={reviewOption}
            reviewMode={reviewMode}
          />
          <UploadReviewTable
            error={error}
            setError={setError}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            data={data}
            setData={setData}
          />
          {/* <ResultRestoreDownload /> */}
        </div>
      </div>
    </div>
  );
};

const ResultSyncHeader = ({
  reviewOption,
  reviewMode
}) => {
  return (
    <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
      <div>
        <h3 className="text-[#0B76B7] font-medium text-lg">GENERATED RESULT</h3>
        <p className="text-slate-500">
          {/* Modify existing categories and keywords . */}
          Delivers results derived from the  <b>{reviewOption}</b> option under <b>{reviewMode}</b> mode. 
        </p>
      </div>
      <div>
        <div className="flex flex-row items-start justify-start ">
          {/* <button className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  */}
          <button className="button-common" disabled={true} type="button">
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
            <span className="hidden sm:block">Sync to SMCI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// const ResultRestoreDownload = () => {

//   // Handle delete action
//   const handleRestore = (responseId) => {

//     const newdata = data.filter((row) => row.responseId !== responseId);
//     window.localStorage.setItem('currentReviews', JSON.stringify(newdata));
//     const savedReviews = JSON.parse(localStorage.getItem('currentReviews'));
//     setData(savedReviews);

//   };

//   return (
//     <div className="w-full flex justify-between items-center mb-3 mt-6 pl-0">
//         <div>
//               <div className="flex flex-row items-start justify-start ">
//                 {/* <button className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  */}
//                  <button className='button-common'
//                   type="button"  >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
//                         className="w-4 h-4 mr-1.5">
//                         <path
//                           fillRule="evenodd"
//                           d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                         <span className="hidden sm:block">Restore</span>
//                   </button>
//             </div>
//         </div>
//         <div>
//               <div className="flex flex-row items-start justify-start ">
//                 {/* <button className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  */}
//                 <button className='button-common'
//                 type="button"  >
//                     Download Result
//                 </button>
//             </div>
//         </div>
//     </div>
//   );
// };

export default UploadReviewContent;
