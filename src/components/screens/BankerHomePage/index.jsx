import TopNavigation from "../../nav/TopNav";
import { BsPlusCircleFill } from "react-icons/bs";
import Footer from "../../Footer";
import LineChart from "../../chart/LineChart";
import PieChart from "../../chart/PieChart";
import BarChart from "../../chart/BarChart";
// import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaBullhorn, FaRegBell, FaRegCreditCard } from "react-icons/fa";

const BankerHomePage = () => {
  const location = useLocation();
  const { getCurrentUser } = useAuth();
  let username = "";
  username = getCurrentUser() || location.state.username;

  // const location = useLocation();

  // useEffect(() => {
  //   const query = new URLSearchParams(location.search);
  //   const username = query.get("username");
  //   const idToken = query.get("idToken");
  //   const accessToken = query.get("accessToken");
  //   const refreshToken = query.get("refreshToken");

  //   sessionStorage.setItem("accessToken", accessToken);
  //   sessionStorage.setItem("idToken", idToken);
  //   sessionStorage.setItem("refreshToken", refreshToken);
  //   sessionStorage.setItem("username", username);
  // }, [location]);
  const isBanker = true;

  return (
    <div className="content-container">
      <TopNavigation username={username} isBanker={isBanker} />
      {/* <div className="content-list">
        <div className="text-editor-content mt-4"> */}
      <div className="flex flex-col items-center h-full w-full px-5 overflow-y-scroll">
        <div className="flex-col w-full h-full items-center justify-evenly m-5">
          <div className="overflow-x-auto shadow-sm rounded-md border-2 border-gray-300 border-t-[#0B76B7] border-t-4">
            <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-gray-300">
              {/* <h2 className="text-slate-500 font-bold text-sm text-center justify-center items-center mt-5 ">
                メッセージ
              </h2> */}
              <div className="flex space-x-2 text-slate-500 font-bold text-base text-center justify-center items-center mt-5 ">
                <span>
                  <FaBullhorn size="16" className="text-red-500" />
                </span>
                <h2>メッセージ</h2>
              </div>
              <div className="flex flex-wrap justify-center items-center mt-5">
                <Post
                  name=""
                  timestamp=""
                  text={`投資信託 キャンペーンでお得に運用!今なら最大 100万円 現金プレゼント! 終了間近`}
                />

                <Post
                  name=""
                  timestamp=""
                  text={`億万長者のチャンス♪ 初めての方にも/いつでもご購入の 方にも、キャンペーン実施中
                `}
                />
                <Post
                  name=""
                  timestamp=""
                  text={`【2023年12月2日 (月) 開始!】 チャージや引き落としでポイントゲット`}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto shadow-sm rounded-md border-2 bg-[#FEF3F3] border-gray-300 border-t-[#0B76B7] border-t-4 my-4">
            <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-gray-300">
              {/* <h2 className="text-slate-500 font-bold text-sm text-center justify-center items-center mt-5 ">
                お知らせ
              </h2> */}
              <div className="flex space-x-2 text-slate-500 font-bold text-base text-center justify-center items-center mt-5 ">
                <span>
                  <FaRegBell size="16" className="text-red-500" />
                </span>
                <h2>お知らせ</h2>
              </div>
              <Post
                name=""
                timestamp=""
                text={`一部サービス休止のお知らせ (2023年8月3日)`}
              />

              <Post
                name=""
                timestamp=""
                text={`一部サービス休止のお知らせ (2023年10月3日)
                `}
              />
              <Post
                name=""
                timestamp=""
                text={`一部サービス休止のお知らせ (2023年9月3日)`}
              />
            </div>
          </div>

          <div className="overflow-x-auto shadow-sm rounded-md border-2 bg-[#F5F3FF] border-gray-300 border-t-[#0B76B7] border-t-4 my-4">
            <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-gray-300">
              {/* <h2 className="text-slate-500 font-bold text-sm text-center justify-center items-center mt-5 ">
                口座一覧
              </h2> */}
              <div className="flex space-x-2 text-slate-500 font-bold text-base text-center justify-center items-center mt-5 ">
                <span>
                  <FaRegCreditCard size="16" className="text-red-500" />
                </span>
                <h2>口座一覧</h2>
              </div>

              <div className="flex flex-wrap justify-center mt-5">
                {/* <!-- card 1 --> */}
                <AccountCard
                  sub1={"大阪支店"}
                  sub2={"普通 12345678"}
                  sub3={username}
                  sub4={"3,000,000"}
                  sub5={"2023年10月5日 16:22"}
                />

                {/* <!-- card 2 --> */}

                <AccountCard
                  sub1={"大阪支店"}
                  sub2={"普通 67812345"}
                  sub3={username}
                  sub4={"2,000,000"}
                  sub5={"2023年10月5日 16:22"}
                />

                {/* <!-- card 3 --> */}
                <AccountCard
                  sub1={"大阪支店"}
                  sub2={"普通 34512678"}
                  sub3={username}
                  sub4={"1,500,000"}
                  sub5={"2023年10月5日 16:22"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

const Post = ({ name, timestamp, text }) => {
  const seed = Math.round(Math.random() * 9);
  var nameList = [
    "2023年11月3日",
    "2023年11月3日",
    "2023年11月3日",
    "2023年10月24日",
    "2023年10月24日",
    "2023年10月24日",
    "2023年10月3日",
    "2023年10月3日",
    "2023年10月3日",
    "2023年10月3日",
  ];
  return (
    <div className={"post"}>
      <div className="flex flex-col items-center m-0 ml-auto mb-auto">
        <p>
          {/* {name} */}
          {nameList[seed]}
          {/* <small className="timestamp">{timestamp}</small> */}
        </p>
      </div>

      <div
        className="w-2/3 
    flex flex-col justify-start 
    ml-auto "
      >
        <p className="post-text">{text}</p>
      </div>
    </div>
  );
};

const AccountCard = ({ sub1, sub2, sub3, sub4, sub5 }) => {
  return (
    <div className="p-4 max-w-sm w-96">
      {/* <div class="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col"> */}
      <div className="flex rounded-lg h-full dark:bg-gray-800 bg-white p-8 flex-col">
        <div className="flex items-center mb-2">
          <img
            src="https://cdn.zonebourse.com/static/instruments-logo-6492265"
            className="h-5 w-5 "
            alt=""
          />
          <h2 className="text-xl font-semibold text-center text-black  pl-2">
            百十四銀行
          </h2>
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <ul className="flex flex-col gap-1 pl-8">
            <li className="flex gap-1">{sub1}</li>
            <li className="flex gap-1">{sub2}</li>
            <li className="flex gap-1">{sub3}</li>
          </ul>
          <hr className=" bg-gray-300 border border-gray-300 rounded-full my-2 mx-2" />
          <p className="leading-relaxed  text-black dark:text-gray-300 text-right text-2xl">
            {sub4}
            <span className="text-sm">円</span>
          </p>
          <p className="leading-relaxed text-base text-black dark:text-gray-300 text-right">
            {sub5}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankerHomePage;
