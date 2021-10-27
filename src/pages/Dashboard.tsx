import Create from "../components/Create";
import Notes from "../components/Notes";
import { DataProvider } from "../contexts/DataProvider";
import notesLogo from "./../assets/images/sticky-note.png";

const Dashboard = () => {
  return (
    <DataProvider>
      <div className="text-center">
        <img
          src={notesLogo}
          alt="Logo"
          className="h-10 inline-block mt-14 mb-8"
        />
      </div>
      <Create />
      <Notes />
    </DataProvider>
  );
};

export default Dashboard;
