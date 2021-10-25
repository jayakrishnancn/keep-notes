import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { token, setToken } = useAuth();
  return (
    <div className="text-center">
      <div className="mb-5">Dashboard with token {token}</div>

      <button
        className="btn-danger m-5 leading-7"
        onClick={() => setToken(null)}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
