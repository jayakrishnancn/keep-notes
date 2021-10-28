import { faEquals, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "../components/Banner";
import Create from "../components/Create";
import Notes from "../components/Notes";
import { DataProvider } from "../contexts/DataProvider";
import { NotificationProvider } from "../contexts/NotificationContext";
import notesLogo from "./../assets/images/note-resized.png";
import reactLogo from "./../assets/images/react-resized.png";
import fireabaseLogo from "./../assets/images/img-resize.png";

const Dashboard = () => {
  return (
    <DataProvider>
      <NotificationProvider>
        <div className="container p-3 mx-auto">
          <Banner />
          <div className="text-center mt-14 mb-5 flex items-center justify-center ">
            <img
              src={reactLogo}
              alt="Logo"
              height={40}
              width={40}
              className="block"
            />
            <FontAwesomeIcon icon={faPlus} className="text-gray-600 mx-5" />{" "}
            <img
              src={fireabaseLogo}
              alt="Logo"
              height={40}
              width={40}
              className="block"
            />
            <FontAwesomeIcon icon={faEquals} className="text-gray-600 mx-5" />
            <img
              src={notesLogo}
              alt="Logo"
              height={40}
              width={40}
              className="block"
            />
          </div>
          <Create />
          <Notes />
        </div>
      </NotificationProvider>
    </DataProvider>
  );
};

export default Dashboard;
