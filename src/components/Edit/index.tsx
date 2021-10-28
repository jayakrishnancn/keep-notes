import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, SyntheticEvent, useRef } from "react";
import { useData } from "../../contexts/DataProvider";
import { useNotification } from "../../contexts/NotificationContext";
import { deleteNote, updateNote } from "../../services/notes";
import { captchaWrapper } from "../../utils/captchaWrapper";
import AutoHeightTextarea from "../AutoHeightTextArea";
import { CreateProps } from "./type";
// import ReCAPTCHA from "react-google-recaptcha";
const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));

const Edit = ({ data, onClose = () => {} }: CreateProps) => {
  const { id, title, note } = data;
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<any>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const { fetchData } = useData();
  const { setMessage } = useNotification();

  if (!id) {
    return <p className="card">Invalid Data</p>;
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    captchaWrapper(recaptchaRef)
      .then(() => {
        const titleRefValue = titleRef?.current?.value;
        const noteRefValue = noteRef?.current?.value || null;
        if (!titleRefValue && !noteRefValue) {
          return setMessage("Title and Note cannot be empty");
        }
        updateNote(id, titleRefValue || "", noteRefValue || "")
          .then(() => {
            setMessage("Note Updated");
            formRef?.current?.reset();
            fetchData();
            onClose();
          })
          .catch(err => {
            console.error(err);
            setMessage("Error occurred while updating note.");
          });
      })
      .catch(err => {
        console.error(err);
        setMessage("Captcha Failed Please retry." + err);
      })
      .finally(() => {
        recaptchaRef?.current?.reset();
      });
  };

  const onDelete = () => {
    captchaWrapper(recaptchaRef)
      .then(() => {
        deleteNote(id)
          .then(() => {
            setMessage("Note Deleted");
            fetchData();
            onClose();
          })
          .catch(err => {
            console.error(err);
            setMessage("Error occurred while deleting note.");
          });
      })
      .catch(err => {
        console.error(err);
        setMessage("Captcha Failed Please retry." + err);
      })
      .finally(() => {
        recaptchaRef?.current?.reset();
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY || ""}
      />
      <div className="card w-full relative" onClick={e => e.stopPropagation()}>
        <div className="p-5">
          <AutoHeightTextarea
            ref={titleRef}
            defaultValue={title || ""}
            placeholder="Title"
            onKeyDown={e => {
              if (e.key === "Enter") {
                noteRef?.current?.focus();
                e.preventDefault();
              }
            }}
            className="w-full mb-3 font-bold outline-none placeholder"
          />
          <AutoHeightTextarea
            ref={noteRef}
            minHeight={50}
            defaultValue={note || ""}
            placeholder="Take a note."
            className="w-full min-h-full resize-none outline-none placeholder"
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
