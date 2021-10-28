import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, SyntheticEvent, useRef } from "react";
import { useData } from "../../contexts/DataProvider";
import { useNotification } from "../../contexts/NotificationContext";
import { createNotes } from "../../services/notes";
import { captchaWrapper } from "../../utils/captchaWrapper";
import AutoHeightTextarea from "../AutoHeightTextArea";
import { CreateProps } from "./type";
// import ReCAPTCHA from "react-google-recaptcha";
const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));

const Create = ({ data }: CreateProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const recaptchaRef = useRef<any>(null);

  const { fetchData } = useData();
  const { setMessage } = useNotification();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    captchaWrapper(recaptchaRef)
      .then(() => {
        const title = titleRef?.current?.value || "";
        const note = notesRef?.current?.value || "";
        if (!title && !note) {
          return setMessage("Title and Note cannot be empty");
        }
        createNotes(title, note || "")
          .then(() => {
            setMessage("Note Created");
            formRef?.current?.reset();
            fetchData();
          })
          .catch(err => {
            console.error(err);
            setMessage("Error occurred while creating note.");
          });
      })
      .catch(err => {
        console.error(err);
        setMessage("Captcha Failed Please retry.");
      })
      .finally(() => {
        recaptchaRef?.current?.reset();
      });
  };

  return (
    <form onSubmit={onSubmit} ref={formRef} onClick={e => e.stopPropagation()}>
      <div className="card w-full relative ">
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.REACT_APP_RECAPTCHA_KEY || ""}
        />
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
            minHeight={50}
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
