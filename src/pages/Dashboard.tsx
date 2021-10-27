import Banner from "../components/Banner";
import Create from "../components/Create";
import Notes from "../components/Notes";
import { DataProvider } from "../contexts/DataProvider";
import notesLogo from "./../assets/images/sticky-note.png";

const Dashboard = () => {
  return (
    <DataProvider>
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
    </DataProvider>
  );
};

export default Dashboard;
