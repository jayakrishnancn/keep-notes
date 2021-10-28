import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useRef } from "react";
import { useData } from "../../contexts/DataProvider";
import { useNotification } from "../../contexts/NotificationContext";
import { createNotes } from "../../services/notes/services";
import AutoHeightTextarea from "../AutoHeightTextArea";
import { CreateProps } from "./type";

const Create = ({ data }: CreateProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const { fetchData } = useData();
  const { setMessage } = useNotification();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const titleValue = titleRef?.current?.value;
    const noteValue = notesRef?.current?.value || null;
    if (!titleValue && !noteValue) {
      return;
    }
    createNotes(titleValue || "", noteValue || "")
      .then(() => {
        setMessage("Note Created");
        formRef?.current?.reset();
        fetchData();
      })
      .catch(err => {
        console.error(err);
        setMessage("Error occurred while creating note.");
      });
  };

  return (
    <form onSubmit={onSubmit} ref={formRef} onClick={e => e.stopPropagation()}>
      <div className="card w-full relative ">
        <div className="p-5">
          <AutoHeightTextarea
            ref={titleRef}
            defaultValue={data?.title || ""}
            placeholder="Title"
            onKeyDown={e => {
              if (e.key === "Enter") {
                notesRef?.current?.focus();
                e.preventDefault();
              }
            }}
            className="w-full font-bold outline-none  placeholder"
          />
          <AutoHeightTextarea
            ref={notesRef}
            rows={3}
            defaultValue={data?.note || ""}
            placeholder="Take a note."
            className="w-full min-h-full outline-none placeholder"
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
