import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useRef } from "react";
import { useData } from "../../contexts/DataProvider";
import { deleteNote, updateNote } from "../../services/notes/services";
import AutoHeightTextarea from "../AutoHeightTextArea";
import { CreateProps } from "./type";

const Edit = ({ data, onClose = () => {} }: CreateProps) => {
  const { id, title, note } = data;
  const titleRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const { fetchData } = useData();

  if (!id) {
    return <p className="card">Invalid Data</p>;
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const titleRefValue = titleRef?.current?.value;
    const noteValue = noteRef?.current?.value || null;
    if (!titleRefValue && !noteValue) {
      return;
    }

    updateNote(id, titleRefValue || "", noteValue || "").then(res => {
      fetchData();
      onClose();
    });
  };

  const onDelete = () => {
    deleteNote(id).then(res => {
      fetchData();
      onClose();
    });
  };

  return (
    <form onSubmit={onSubmit} onClick={e => e.stopPropagation()}>
      <div className="card w-full relative ">
        <div className="p-5">
          <input
            ref={titleRef}
            defaultValue={title || ""}
            placeholder="titleRef"
            className="w-full mb-3 font-bold outline-none placeholder"
          />
          <AutoHeightTextarea
            ref={noteRef}
            defaultValue={note || ""}
            placeholder="Take a note."
            className="w-full transform-all min-h-full resize-none outline-none placeholder"
          />
        </div>
        <div
          className={
            "flex justify-between  w-full px-3" +
            (!id ? " pb-0 absolute -bottom-4" : " pb-3")
          }
        >
          {id ? (
            <button
              title="Delete note"
              type="button"
              onClick={() => onDelete()}
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

export default Edit;
