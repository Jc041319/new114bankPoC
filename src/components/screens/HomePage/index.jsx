import TopNavigation from "../../nav/TopNav";
import { BsPlusCircleFill } from "react-icons/bs";
import Footer from "../../Footer";
import LineChart from "../../chart/LineChart";
import PieChart from "../../chart/PieChart";
import BarChart from "../../chart/BarChart";
// import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  let username = '';
  username = location.state.username;
  return (
    <div className="content-container">
      <TopNavigation username={username} />
      {/* <div className="content-list">
        <div className="text-editor-content mt-4"> */}
      <div className="flex flex-col items-center h-full w-full px-5">
        <div className="flex-col w-full h-full items-center justify-evenly m-5">
          <div className="overflow-x-auto shadow-sm rounded-md border-2 border-gray-300 border-t-[#0B76B7] border-t-4">
            <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-gray-300">
              <h2 className="text-slate-500 font-bold text-sm text-center justify-center items-center mt-5 ">
                メッセージ
              </h2>
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

          <div className="overflow-x-auto shadow-sm rounded-md border-2 bg-[#F5F3FF] border-gray-300 border-t-[#0B76B7] border-t-4 my-4">
            <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-gray-300">
              <h2 className="text-slate-500 font-bold text-sm text-center justify-center items-center mt-5 ">
                お知らせ
              </h2>
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



        </div>










      </div>
      {/* <Footer /> */}
    </div>
  );
};


const Post = ({ name, timestamp, text }) => {
  const seed = Math.round(Math.random() * 9);
  var nameList = [
    "2023年11月3日", "2023年11月3日", "2023年11月3日",
    "2023年10月24日", "2023年10月24日", "2023年10月24日",
    "2023年10月3日", "2023年10月3日", "2023年10月3日",
    "2023年10月3日"
  ];
  return (
    <div className={"post"}>
      <div className="flex flex-col items-center m-0 ml-auto mb-auto">
        <p >
          {/* {name} */}
          {nameList[seed]}
          {/* <small className="timestamp">{timestamp}</small> */}
        </p>
      </div>

      <div className="post-content ">

        <p className="post-text">{text}</p>
      </div>
    </div>
  );
};

export default HomePage;
