import Create from "../components/Create";
import Notes from "../components/Notes";
import { DataProvider } from "../contexts/DataProvider";
import notesLogo from "./../assets/images/sticky-note.png";

const Dashboard = () => {
  return (
    <DataProvider>
      <div className="text-center container p-3 mx-auto">
        <img
          src={notesLogo}
          alt="Logo"
          className="h-10 inline-block mt-14 mb-8"
        />
        <Create />
        <Notes />
      </div>
    </DataProvider>
  );
};

export default Dashboard;
