import Channelbar from "./components/ChannelBar";
import ContentContainer from "./components/pages/ContentContainer";
import EditCategoryKeyword from "./components/pages/EditCategoryKeyword";
import UploadReview from "./components/pages/UploadReview";
import UploadReviewContentEdit from "./components/pages/UploadReviewContentEdit";
import ReviewDownloadData from "./components/pages/ReviewDownloadData";
import UploadReviewContent from "./components/pages/UploadReviewContent";
import HistoricData from "./components/pages/HistoricData";
// import ErrorPage from "./components/pages/ErrorPage";
import SideBar from "./components/SideBar";
// import Login from "./components/pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
// import { useAuth } from "../context/AuthContext";
import useSessionTimeout from "./hooks/useSessionTimeout";
import React, { useState } from 'react';


import CheckTokenValidity from "./components/auth/CheckTokenValidity";
import SignInUser from "./components/auth/SignInUser"
import VerifyUser from "./components/auth/VerifyUser"
import AuthLanding from "./components/auth/AuthLanding"
import UserConfirmation from "./components/auth/UserConfirmation"
import ForgotPassword from "./components/auth/ForgotPassword"
import SignUpUser from "./components/auth/SignUpUser"
import ResetPassword from "./components/auth/ResetPassword"
import ErrorPage from "./components/screens/ErrorPage";
import HomePage from "./components/screens/HomePage";
// import ProtectedRoute from "./components/screens/ProtectedRoute";







import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import EditCategoryKeywordModify from "./components/pages/EditCategoryKeywordModify";

function App() {
  let initialData = new Array();
  const jobId = window.localStorage.getItem("jobId");
  try {
    const result = localStorage.getItem("currentReviews");
    if (result) {
      initialData = JSON.parse(result);
    }
  } catch (error) {
    // console.log("JSON Parse error in currentReviews: ", error);
  }

  const [dataReview, setDataReview] = useState(initialData);

  // Function to update row data reviews
  const updateDataReview = (id, updatedReviewRow) => {
    if (updatedReviewRow) {
      const index = dataReview.findIndex((obj) => obj.responseId == id);
      // console.log("index: ", index);
      const newDataReview = dataReview.map((row) =>
        row.responseId === id ? { ...row, ...updatedReviewRow } : row
      );
      setDataReview(newDataReview);
      window.localStorage.setItem(
        "currentReviews",
        JSON.stringify(newDataReview)
      );
    }
  };

  let initialDataCodeframe = new Array();
  try {
    const resultCodeframe = localStorage.getItem("currentCodeframe");
    if (resultCodeframe) {
      initialDataCodeframe = JSON.parse(resultCodeframe);
    }
  } catch (error) {
    // console.log("JSON Parse error in currentCodeframe: ", error);
  }

  const [dataCodeframe, setDataCodeframe] = useState(initialDataCodeframe);

  // Function to update row data reviews
  const updateDataCodeframe = (newId, updatedCodeframeRow) => {
    if (updatedCodeframeRow) {
      const element = dataCodeframe.findIndex((obj) => obj.id == newId);
      const newDataCodeframe = dataCodeframe.map((row) =>
        row.id == newId ? { ...row, ...updatedCodeframeRow } : row
      );
      setDataCodeframe(newDataCodeframe);
      window.localStorage.setItem(
        "currentCodeframe",
        JSON.stringify(newDataCodeframe)
      );
      console.log("currentCodeframe: ", localStorage.getItem("currentCodeframe"));
    }
  };

  return (
    <Router>
      <AuthProvider>
        <div className="flex">
          {/* <BrowserRouter basename="/"> */}

          {/* <SideBar /> */}

          <Routes>



            {/* <Route path="/login" element={<Login />} /> */}


            <Route path="/" element={
              <AuthLanding />
            } />

            <Route path="/sign-in" element={
              <SignInUser />
            } />

            <Route path="/forgot-password" element={
              <ForgotPassword />
            } />

            <Route path="/reset-password" element={
              <ResetPassword />
            } />



            <Route path="/sign-up" element={
              <SignUpUser />
            } />





            <Route path="/user-confirmation" element={
              <UserConfirmation />
            } />

            <Route path="/verify-user" element={
              <VerifyUser />
            } />







            <Route path="/check" element={
              <CheckTokenValidity />
            } />


            {/* <Route path="/home" element={<HomePage />} /> */}

            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>} />



            <Route path="*" element={<ErrorPage />} />




            {/* <Route element={<SideBarLayout />} >
              <Route path="/home" element={
                <ProtectedRoute>
                  <ContentContainer />
                </ProtectedRoute>} />

              <Route path="/upload" element={
                <ProtectedRoute>
                  <UploadReview />
                </ProtectedRoute>} />

              <Route
                path="/upload/content/edit/:id"
                element={
                  <ProtectedRoute>
                    <UploadReviewContentEdit
                      data={dataReview}
                      updateData={updateDataReview}
                    />
                  </ProtectedRoute>} />


              <Route
                path="/coding"
                element={
                  <ProtectedRoute>
                    <EditCategoryKeyword
                      data={dataCodeframe}
                      setData={setDataCodeframe}
                    />
                  </ProtectedRoute>} />


              <Route
                path="/coding/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditCategoryKeywordModify
                      dataCodeframe={dataCodeframe}
                      setDataCodeframe={setDataCodeframe}
                      updateDataCodeframe={updateDataCodeframe}
                    />
                  </ProtectedRoute>} />


              <Route path="/historical" element={
                <ProtectedRoute>
                  <ReviewDownloadData />
                </ProtectedRoute>} />



              <Route
                path="/upload/content"
                element={
                  <ProtectedRoute>
                    <UploadReviewContent data={dataReview} setData={setDataReview} />
                  </ProtectedRoute>} />


              <Route path="/historical/content" element={
                <ProtectedRoute>
                  <HistoricData />
                </ProtectedRoute>} />

             
            </Route> */}


          </Routes>
          {/* </BrowserRouter> */}


          {/* <Channelbar /> */}
          {/* <BrowserRouter>
       <SideBar /> 
     
       <Routes>
        <Route path='/' element= { <ContentContainer />} />
        <Route path='/upload' element= { <UploadReview />} />
        <Route path='/edit' element= { <EditCategoryKeyword />} />
        <Route path='/historical' element= { <ReviewDownloadData />} />
        <Route path='/upload/content' element= { <UploadReviewContent />} />
        <Route path='/historical/content' element= { <HistoricData />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    
    </BrowserRouter> */}
        </div>
      </AuthProvider>
    </Router >

  );
}

const SideBarLayout = () => (
  <>
    <SideBar />
    <Outlet />
  </>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();


  if (!isAuthenticated) {
    return <Navigate to='/sign-in' replace />;
  }

  return children;
};

export default App;
