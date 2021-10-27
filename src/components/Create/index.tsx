import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useRef } from "react";
import { useData } from "../../contexts/DataProvider";
import { createNotes } from "../../services/notes/services";
import AutoHeightTextarea from "../AutoHeightTextArea";
import { CreateProps } from "./type";

const Create = ({ data }: CreateProps) => {
  const title = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLTextAreaElement>(null);
  const { fetchData } = useData();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const titleValue = title?.current?.value;
    const noteValue = notes?.current?.value || null;
    if (!titleValue && !noteValue) {
      return;
    }
    createNotes(titleValue || "", noteValue || "").then(res => {
      fetchData();
    });
  };

  return (
    <form onSubmit={onSubmit} onClick={e => e.stopPropagation()}>
      <div className="card w-full relative ">
        <div className="p-5">
          <input
            ref={title}
            defaultValue={data?.title || ""}
            placeholder="Title"
            className="w-full mb-3 font-bold outline-none placeholder"
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
            "flex justify-between  flex-row-reverse w-full px-3" +
            (!data?.id ? " pb-0 absolute -bottom-4" : " pb-3")
          }
        >
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

export default Create;
