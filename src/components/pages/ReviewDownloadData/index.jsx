import TopNavigation from "../../TopNavigation";
import { BsPlusCircleFill } from "react-icons/bs";
import Footer from "../../Footer";
import ReviewDownloadDataContent from "../ReviewDownloadDataContent";

// import { useState } from 'react';

const ReviewDownloadData = () => {
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list">
        <div className="text-editor-content mt-4">
          <ReviewDownloadDataContent />
        </div>
      </div>
    </div>
  );
};

export default ReviewDownloadData;
