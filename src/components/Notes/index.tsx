import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useData } from "../../contexts/DataProvider";
import { Note } from "../../services/notes/type";
import Model from "../Modal";

const Notes = () => {
  const [modelData, setModelData] = useState<Note | null>(null);
  const { data } = useData();

  if (!data?.length) {
    return <p className="text-center mt-10">Notes will appear here.</p>;
  }

  return (
    <>
      {modelData && (
        <Model note={modelData} onClose={() => setModelData(null)} />
      )}

      <div className="container mx-auto mt-12 grid lg:grid-cols-4 sm:grid-cols-2 gap-4 break-words text-left">
        {data?.map((cardData: Note, index: number) => {
          const { title, note, id } = cardData;
          return (
            <div
              key={`note-${id}`}
              onClick={() => setModelData({ ...cardData, id })}
              className="bg-white border-gray-300 border rounded-md relative cursor-default group hover:shadow-lg transition-shadow mx-1 p-3 text-gray-600 flex-1"
            >
              <div className="absolute cursor-pointer top-2 right-2 hidden group-hover:block">
                <FontAwesomeIcon icon={faPencilAlt} />
              </div>
              {title && <h2 className="text-3xl font-bold">{title}</h2>}
              {note && <p className="mt-2 font-semibold">{note}</p>}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
