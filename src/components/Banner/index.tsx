import { Link } from "react-router-dom";

const Banner = (props: any) => {
  return (
    <div className="border-4 border-red-500 bg-yellow-200 shadow-md text-center max-w-lg fixed top-1 opacity-60 hover:opacity-100 transition-all left-0 right-0 mx-auto px-2 py-1 border-double  rounded">
      THIS PAGE IS PUBLIC. TO MAKE PRIVATE NOTES. PLEASE{" "}
      <Link className="underline" to="/login">
        LOGIN
      </Link>
    </div>
  );
};

export default Banner;
