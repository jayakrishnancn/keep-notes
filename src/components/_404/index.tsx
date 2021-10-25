import { Link } from "react-router-dom";
import SampleProps from "./types";

const _404 = (props: SampleProps) => {
  return (
    <div className="text-center mt-10">
      <h1>404 Page Not Found</h1>
      <Link to="/" className="text-red-600 hover:underline pt-10 inline-block">
        Home
      </Link>
    </div>
  );
};

export default _404;
