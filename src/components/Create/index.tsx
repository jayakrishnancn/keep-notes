import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useRef } from "react";
import { createNotes, deleteNotes } from "../../services/notes/Services";
import AutoHeightTextarea from "../AutoHeightTextArea";
import "./style.css";
import { CreateProps } from "./type";

const defaultProps = {
  onCreate: () => {},
};
const refreshData = () => {};

const Create = ({ onCreate, data, inModal }: CreateProps) => {
  const title = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const title = notes?.current?.value;
    const note = notes?.current?.value || null;
    if (!title && !note) {
      return;
    }
    createNotes(title || "", note || "").then(res => {
      onCreate({ title, note });
    });
  };

  const deleteNote = () => {
    if (data && data.id) {
      deleteNotes(data?.id).then(res => {
        refreshData();
      });
    }
  };

  return (
    <form onSubmit={onSubmit} onClick={e => e.stopPropagation()}>
      <div className="card w-full relative ">
        <div className="p-5">
          <input
            ref={title}
            defaultValue={data?.title || ""}
            placeholder="Title"
            className="w-full mb-3 outline-none placeholder"
          />
          <AutoHeightTextarea
            ref={notes}
            defaultValue={data?.note || ""}
            placeholder="Take a note."
            className="w-full transform-all min-h-full resize-none outline-none placeholder"
          />
        </div>
        <div
          className={
            "flex justify-between  w-full px-3" +
            (!data?.id ? " pb-0 absolute -bottom-4" : " pb-3")
          }
        >
          {data?.id ? (
            <button
              title="Delete note"
              type="button"
              onClick={() => deleteNote()}
              className="flex items-center justify-center rounded-full  bg-red-500 text-white w-10 h-10"
            >
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </button>
          ) : (
            <div />
          )}
          <button
            title="Create note"
            type="submit"
            className="flex items-center justify-center rounded-full text-2xl bg-purple-800 text-white w-10 h-10  "
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </button>
        </div>
      </div>
    </form>
  );
};

Create.defaultProps = defaultProps;
export default Create;
