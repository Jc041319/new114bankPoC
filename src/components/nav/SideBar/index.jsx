import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo, FaHome, FaFileUpload, FaHistory } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div
      className="fixed top-14 left-0 h-screen w-16 flex flex-col
                  bg-[#EEECE1] dark:bg-gray-900 shadow-lg"
                   // bg-[#EEECE1] dark:bg-gray-900 shadow-lg"
    >
      <nav>
        <ul>
          <li>
            <SideBarIcon icon={<FaHome size="24" />} text="Home" path="/" />
          </li>
          <li>
            <Divider />
          </li>
          <li>
            <SideBarIcon
              icon={<FaFileUpload size="24" />}
              text="Upload Reviews"
              path="/upload"
            />
          </li>
          <li>
            <SideBarIcon
              icon={<MdRateReview size="24" />}
              text="Edit Categories and Keywords"
              path="/coding"
            />
          </li>
          <li>
            <SideBarIcon
              icon={<FaHistory size="22" />}
              text="Review and Download Data"
              path="/historical"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

const SideBarIcon = ({ icon, text, path = "tooltip 💡" }) => (
  <div className="sidebar-icon group">
    <Link to={path}>
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      {icon}
    </Link>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
