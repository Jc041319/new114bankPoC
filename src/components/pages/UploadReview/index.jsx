import TopNavigation from "../../TopNavigation";
import TextEditor from "../../TextEditor";

const UploadReview = () => {
  return (
    <div className="content-container">
      <TopNavigation />

      <div className="content-list">
        <div className="text-editor-content">
          <TextEditor />
        </div>
      </div>
    </div>
  );
};

export default UploadReview;
