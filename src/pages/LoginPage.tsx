import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { setToken, token } = useAuth();

  return (
    <div className="text-center">
      <div className="mb-5">Login Page with token {token} </div>
      <button
        className="btn-danger m-5 leading-7"
        onClick={e => setToken("some token")}
      >
        LOGIN
      </button>
    </div>
  );
};

export default LoginPage;
