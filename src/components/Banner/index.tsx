import { useEffect, useState } from "react";
import { useNotification } from "../../contexts/NotificationContext";

const Banner = () => {
  const { data } = useNotification();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    let timeoutId = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [data]);

  const { message } = data || {};

  return (
    <div
      className={
        "max-w-lg fixed transition-all  left-0 mx-auto px-2 py-1  z-50 " +
        (show ? "top-1" : "-top-full")
      }
    >
      <div className="border-4 border-red-500 bg-yellow-200 shadow-md text-center border-double p-1 px-3 rounded mb-5">
        {!message
          ? "THIS PAGE IS PUBLIC. TO MAKE PRIVATE NOTES. PLEASE LOGIN"
          : message}
      </div>
    </div>
  );
};

export default Banner;
