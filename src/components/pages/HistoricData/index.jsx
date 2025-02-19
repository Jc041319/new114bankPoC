import TopNavigation from "../../TopNavigation";
import HistoricDataTable from "../../tables/HistoricDataTable";

const HistoricData = () => {
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list">
        <div className="text-editor-content mt-4">
          <HistoricDataHeader />
          <HistoricDataTable />
          <HistoricDataUpdateRestoreSave />
        </div>
      </div>
    </div>
  );
};

const HistoricDataHeader = () => {
  return (
    <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">HISTORIC DATA</h3>
        <p className="text-slate-500">Overview of the historic data.</p>
      </div>
      <div>
        <div className="flex flex-row items-start justify-start ">
          <button
            // className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            className="button-common"
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
            <span className="hidden sm:block">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const HistoricDataUpdateRestoreSave = () => {
  return (
    <div className="w-full flex justify-between items-center mb-3 mt-6 pl-0">
      <div>
        <div className="w-full max-w-sm min-w-[100px] ">
          <div className="flex space-x-2  py-2 items-end justify-end ">
            <button
              // className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              className="button-common"
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
                  clipRule="evenodd"
                  d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
                ></path>
              </svg>
              <span className="hidden sm:block">Update/Edits</span>
            </button>
            <button
              // className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              className="button-common"
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
      </div>
      <div>
        <div className="flex flex-row items-start justify-start ">
          <button
            // className="flex items-center rounded-md bg-blue-500  py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:bg-blue-700 focus:hover:bg-blue-700 focus:shadow-none active:hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            className="button-common"
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricData;
