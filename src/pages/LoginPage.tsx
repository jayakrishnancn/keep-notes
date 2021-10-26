import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { setToken, token } = useAuth();
  const history = useHistory();
  return (
    <div className="text-center">
      <div className="mb-5">Login Page {token ? "with" : "without"} token </div>
      <button
        className="btn-danger m-5 leading-7"
        onClick={e => {
          setToken("some token");
          history.push("/");
        }}
      >
        LOGIN
      </button>
      <Link to="/asdasd">Some Broken Links</Link>
      <Link to="/404">404</Link>
    </div>
  );
};

export default LoginPage;
