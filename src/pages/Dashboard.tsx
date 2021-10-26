import { useEffect, useState } from "react";
import Create from "../components/Create";
import Notes from "../components/Notes";
import { getAllNotes } from "../services/notes/Services";
import { Note } from "../services/notes/type";
import notesLogo from "./../assets/images/sticky-note.png";

enum STORE_KEY {
  NOTES = "NOTES",
}

const getLocalData = () => {
  const data = localStorage.getItem(STORE_KEY.NOTES);
  console.log(data);
  if (!data) {
    return;
  }
  return JSON.parse(data);
};

const appendLocalData = (data: any) => {
  const prevData = getLocalData() || [];
  const newData = JSON.stringify([...prevData, data]);
  localStorage.setItem(STORE_KEY.NOTES, newData);
};

const Dashboard = () => {
  const [data, setData] = useState<Note[] | null>(null);

  useEffect(() => {
    const data = getLocalData();
    if (data) {
      setData(data);
    }
  }, []);

  const onCreate = (note: Note) => {
    appendLocalData(note);
    console.log("appended Data", getLocalData());
    getAllNotes().then(({ data }) => {
      setData(data);
    });
  };

  return (
    <>
      <div className="text-center">
        <img
          src={notesLogo}
          alt="Logo"
          className="h-10 inline-block mt-14 mb-8"
        />
      </div>
      <Create onCreate={onCreate} />
      {data ? (
        <Notes data={data} />
      ) : (
        <p className="text-center mt-10">Notes will appear here.</p>
      )}
    </>
  );
};

export default Dashboard;
