import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import useDarkMode from "../../../hooks/useDarkMode";
import { useState } from 'react';
import { FaSignOutAlt, FaUserClock, FaCogs } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

const TopNavError = () => {



  return (
    <div className="flex flex-row items-center justify-evenly bg-[#FEF3F3]  bg-opacity-90 w-full h-14 m-0 pl-2 pr-4 shadow-lg">
      <Logo />
      {/* <HashtagIcon /> */}
      <Title />
      {/* <ThemeIcon /> */}
      {/* <Search />
      <BellIcon /> */}
      {/* <UserCircle /> */}
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="24" className="top-navigation-icon" />
      ) : (
        <FaMoon size="24" className="top-navigation-icon" />
      )}
    </span>
  );
};

const Search = () => (
  <div className="search">
    <input className="search-input" type="text" placeholder="Search..." />
    <FaSearch size="18" className="text-secondary my-auto" />
  </div>
);
const BellIcon = () => <FaRegBell size="24" className="top-navigation-icon" />;
// const UserCircle = () => (
//   <FaUserCircle size="24" className="top-navigation-icon" />
// );
const HashtagIcon = () => <FaHashtag size="20" className="title-hashtag" />;
const Title = () => <h3 className="ext-base text-black tracking-wider font-bold text-opacity-80 
mr-auto ml-3 my-auto 
transition duration-300 ease-in-out"><span className="text-xl font-semibold text-center text-black">百十四銀行 </span><span className="text-xl font-semibold text-center text-red-500">ビジネスポータル</span></h3>;



// <h2 className="text-xl font-semibold text-center text-black mb-4">
//                             百十四銀行
//                             <span className="text-xl font-semibold text-center text-red-500">
//                                 ビジネスポータル
//                             </span>
//                         </h2>


const Logo = () =>
  <a href="https://www.114bank.co.jp/" className="flex items-center space-x-3  bg-white bg-opacity-0 rtl:space-x-reverse">
    <img src="https://cdn.zonebourse.com/static/instruments-logo-6492265" className="object-cover h-10 w-10" alt="" />
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
  </a>;

const Divider = () => <hr className="bg-[#B30000] dark: bg-gray-800 border border-[#B30000] dark:border-gray-800 rounded-full my-2 mx-2" />;

const UserCircle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutUser } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log("isOpen: ", isOpen);
  };

  const signOut = () => {
    console.log("SignOut");
    logoutUser();
  };

  return (
    <div className="relative">
      <span onClick={toggleMenu}>
        <FaUserCircle size="24" className="top-navigation-icon" />
      </span>
      {isOpen && (
        <div className="absolute  right-0 mt-4 w-48 bg-[#EEECE1] shadow-md rounded-md">
          <ul className="p-1">
            <li className="block space-x-6 text-start text-gray-700 p-1">
              <div className="flex space-x-6  items-start justify-start ">
                <FaUserClock size="18" className="text-secondary my-auto" />
                <span className="block truncate">User : Admin</span>
              </div>
            </li>
            <li className="block space-x-6 text-start text-gray-700 p-1">
              <div className="flex space-x-6  items-start justify-start ">
                <FaCogs size="18" className="text-secondary my-auto" />
                <span className="block truncate">Settings</span>
              </div>
            </li>

          </ul>
          <Divider />
          <div className="block text-start  p-2">
            <span className="flex text-[#A6121F] hover:bg-[#FEF3F3] rounded-md"
              onClick={signOut}
            >
              <div className="flex space-x-6  items-start justify-start ">
                <FaSignOutAlt size="18" className="text-secondary my-auto" />
                <span className="block truncate">Sign Out</span>
              </div>


            </span>
          </div>

        </div>


      )}
    </div>






  );
};




export default TopNavError;
