import TopNavigation from "../../TopNavigation";
import { BsPlusCircleFill } from "react-icons/bs";
import Footer from "../../Footer";
import LineChart from "../../chart/LineChart";
import PieChart from "../../chart/PieChart";
import BarChart from "../../chart/BarChart";
// import { useState } from 'react';

const ContentContainer = () => {
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list">
        <div className="text-editor-content mt-4">
          <div className="overflow-x-auto shadow-sm rounded-md border-2 border-gray-300 border-t-[#0B76B7] border-t-4">
            <p className="text-slate-500 font-medium text-sm px-4 mb-2 mt-4 ">
              <b>Sentiment Analysis</b>, also known as <b>opinion mining</b>, is
              the process of using natural language processing (NLP), text
              analysis, and computational linguistics to identify, extract, and
              classify the emotional tone or sentiment expressed in a piece of
              text. The sentiment is typically categorized into predefined
              labels, such as:
            </p>
            <ol className="text-slate-500 font-medium text-sm px-16 mb-2">
              <li>
                <b>Positive</b>: Indicates a favorable or happy tone.
              </li>
              <li>
                <b>Negative</b>: Indicates an unfavorable or critical tone.
              </li>
              <li>
                <b>Neutral</b>: Indicates an impartial or indifferent tone.
              </li>
            </ol>
            {/* <p className="text-slate-500 font-medium text-sm px-4 mb-4">
              Sentiment analysis is commonly applied in fields like social media
              monitoring, customer feedback analysis, market research, and more,
              to gauge public opinion, brand reputation, or user satisfaction.
            </p> */}
          </div>
        </div>

        {/* <div className="text-editor-content mt-4">
          <div className="shadow-lg rounded-lg border-2 border-gray-300">
           
            <h4 className="text-slate-500 font-medium text-sm px-4 py-4 mb-2">
            Previous Sentiment Result
            </h4>
           <BarChart></BarChart>

          </div>
        </div> */}

        <div className="text-editor-content mt-4">
          <div className="mb-1  flex-col grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="overflow-x-auto shadow-sm rounded-md border-2 border-gray-300 ">
              <div className="text-center h-84 px-4">
                <h4 className="text-slate-500 font-medium text-sm px-4 py-2 mb-1">
                  Previous Sentiment Result
                </h4>
                <BarChart></BarChart>
              </div>
            </div>

            <div className="overflow-x-auto shadow-sm rounded-md border-2 border-gray-300 ">
              <div className="text-center h-84 px-32">
                <h4 className="text-slate-500 font-medium text-sm px-4 py-2 mb-1">
                  Previous Sentiment Result: By Codeframe Category
                </h4>
                <PieChart></PieChart>
              </div>
            </div>
          </div>
        </div>

        <div className="text-editor-content mt-4">
          <div className="overflow-x-auto shadow-lg rounded-lg border-2 border-gray-300">
            <h2 className="text-slate-500 font-bold text-sm px-4 mb-2 mt-4 ">
              Previous Sentiment List
            </h2>
            <Post
              name="Feedback ID: bnh0j33ubrp3fqgv"
              timestamp="one week ago"
              text={`BPI is acknowledged as a leading provider of financial services and an industry pillar in the Philippines. 
            Building a better Philippines—one family, one community at a time. 
            We are your trusted financial partner, nurturing your future and making life easier
          .`}
            />
            <Post
              name="Feedback ID: dafnzuh1aws1kffe"
              timestamp="one week ago"
              text={`It is safe banking more or less. 
            More on the traditional side of banking. 
            BPI is one of the strongest banks in our country. 
            The bank always if not all the time has a long queue, and you will be spending ample time for a single transaction in a branch
          .`}
            />
            <Post
              name="Feedback ID: rfnpgbybjzbwz4cf"
              timestamp="one week ago"
              text={`bpi was my first bank so i feel partial to it, 
            i also had good experiences with the bank, 
            specifically to the bank manager who personally helped me establish my account. 
            i have heard of bad experiences by other people tho so i know its not perfect
          .`}
            />
            <Post
              name="Feedback ID: fujd4j30asbycvc1"
              timestamp="one week ago"
              text={`I like this bank especially for its online banking services because 
            there is quite a long line at the banks. 
            Nowadays their online interface is more user-friendly 
            however there is system maintenance. But all in all, I'm quite satisfied with it
          .`}
            />
          </div>
        </div>

        {/* <Post
          name="Sentiment Analysis"
          // timestamp='one week ago'
          text={`Upload CSV file of reviews and get result csv file with results, able to download results
          Classify single review.
          Download existing categories and keywords in csv format
          Upload categories and keywords in csv format
          .`}
        /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

const Post = ({ name, timestamp, text }) => {
  const seed = Math.round(Math.random() * 100);
  var nameList = [
  "John Doe", "Jane Smith", "Sam Brown", "Emily Davis", "Michael Johnson", 
  "Sarah Wilson", "David Taylor", "Laura Moore", "James Anderson", "Emma Thomas",
  "Robert Jackson", "Olivia White", "Daniel Harris", "Sophia Martin", "Chris Lee",
  "Ella Thompson", "William Martinez", "Grace Garcia", "Anthony Clark", "Lily Lewis",
  "Matthew Walker", "Hannah Hall", "Joseph Allen", "Charlotte Young", "Andrew King",
  "Isabella Wright", "Ryan Scott", "Mia Lopez", "Ethan Hill", "Amelia Adams",
  "Benjamin Nelson", "Zoe Baker", "Alexander Green", "Madison Carter", "Lucas Perez",
  "Scarlett Murphy", "Mason Mitchell", "Victoria Bell", "Henry Cooper", "Aria Rivera",
  "Owen Torres", "Penelope Gomez", "Jack Sanders", "Evelyn Roberts", "Elijah Gray",
  "Chloe Hughes", "Aiden Ross", "Layla Ramirez", "Jackson Foster", "Aubrey Powell",
  "Logan Peterson", "Ellie Ward", "Levi Long", "Zoey Hughes", "Nathan Brooks",
  "Luna Wood", "Caleb Bennett", "Nora Hughes", "Aaron Reed", "Harper Kelly",
  "Isaiah Flores", "Brooklyn Bryant", "Joshua Jenkins", "Stella Simmons", "Wyatt Diaz",
  "Mila Rivera", "Sebastian Howard", "Paisley Kim", "Hunter Ward", "Aurora Parker",
  "Julian Reed", "Addison Henderson", "Christian Hughes", "Naomi Morgan", "Dylan Cooper",
  "Lila Bell", "Isaac Rivera", "Hazel Mitchell", "Gavin Campbell", "Violet Carter",
  "Connor Gomez", "Savannah Perry", "Eli Foster", "Lucy Peterson", "Landon Powell",
  "Elliana Jenkins", "Nathaniel Sanders", "Willow Jenkins", "Dominic Bryant", "Anna Simmons",
  "Parker Ross", "Sophie Ramirez", "Jonathan Foster", "Clara Reed", "Brayden Wright",
  "Madeline Rivera", "Carter Taylor", "Ariana Morgan", "Miles Jenkins", "Lydia Diaz"
  ];
  return (
    <div className={"post"}>
      <div className="avatar-wrapper">
        <img
          // src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${nameList[seed]}`}
          alt=""
          className="avatar"
        />
      </div>

      <div className="post-content ">
        <p className="post-owner">
          {/* {name} */}
          {nameList[seed]}
          <small className="timestamp">{timestamp}</small>
        </p>
        <p className="post-text">{text}</p>
      </div>
    </div>
  );
};

export default ContentContainer;
