import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Note } from "../../services/notes/type";
import Create from "../Create";

const Model = ({ note, setData }: { note: Note; setData: any }) => {
  return (
    <div
      className="fixed bg-opacity-95  inset-0 bg-purple-900 z-10 pt-14"
      onClick={e => {
        e.preventDefault();
        setData(null);
      }}
    >
      <Create data={note} onCreate={() => {}} />
    </div>
  );
};

const Notes = ({ data }: { data: Note[] | null }) => {
  const [modelData, setModelData] = useState<Note | null>(null);

  return (
    <>
      {modelData && <Model note={modelData} setData={setModelData} />}
      <div className="container mx-auto mt-12 grid grid-cols-4 gap-4">
        {data?.map((cardData: Note, index: number) => {
          const { title, note } = cardData;
          return (
            <div
              key={`note-${title}`}
              onClick={() => setModelData({ ...cardData, id: index + "" })}
              className="bg-white border rounded-md  relative cursor-default group hover:shadow-md transition-shadow mx-1 p-3"
            >
              <div className="absolute cursor-pointer top-2 right-2 hidden group-hover:block">
                <FontAwesomeIcon icon={faPencilAlt} />
              </div>
              {title && (
                <h2 className="text-gray-800 text-3xl font-semibold">
                  {title}
                </h2>
              )}
              {note && <p className="mt-2 text-gray-600">{note}</p>}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
