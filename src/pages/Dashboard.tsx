import Banner from "../components/Banner";
import Create from "../components/Create";
import Notes from "../components/Notes";
import { DataProvider } from "../contexts/DataProvider";
import { NotificationProvider } from "../contexts/NotificationContext";
import notesLogo from "./../assets/images/sticky-note.png";

const Dashboard = () => {
  return (
    <DataProvider>
      <NotificationProvider>
        <div className="container p-3 mx-auto">
          <Banner />
          <img
            src={notesLogo}
            alt="Logo"
            className="h-10 block mt-14 mb-8 mx-auto"
          />
          <Create />
          <Notes />
        </div>
      </NotificationProvider>
    </DataProvider>
  );
};

export default Dashboard;
