import { Link, useNavigate } from "react-router-dom";
import socket from "../../socket";

const Home = () => {
  const token = localStorage.getItem("chatToken");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      {token ? (
        <div className="flex flex-col space-y-5 items-center justify-center">
          <strong>Holaa, {userId}</strong>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <Link
              onClick={() => {
                localStorage.clear();
                socket.close();
                navigate("/");
              }}
              className="border-orange-200 hover:text-orange-300 border text-md hover:border-orange-300 rounded-md text-center py-2 px-5"
            >
              Logout
            </Link>
            <Link
              to={"/events"}
              className="border-orange-200 hover:text-orange-300 border text-md hover:border-orange-300 rounded-md text-center py-2 px-5"
            >
              Events
            </Link>
            <Link
              to={"/rooms"}
              className="border-orange-200 hover:text-orange-300 border text-md hover:border-orange-300 rounded-md text-center py-2 px-5"
            >
              Rooms
            </Link>
            <Link
              to={"/clients"}
              className="border-orange-200 hover:text-orange-300 border text-md hover:border-orange-300 rounded-md text-center py-2 px-5"
            >
              Clients
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5  ">
          <Link
            to={"/login"}
            className="bg-orange-200 text-black text-xl font-medium hover:bg-orange-300 rounded-md text-center py-1 px-5"
          >
            Login
          </Link>
          <p>
            New user?{" "}
            <Link
              to={"/register"}
              className="text-sky-200 hover:text-orange-300 underline"
            >
              <small>Register</small>
            </Link>
          </p>
        </div>
      )}
    </section>
  );
};

export default Home;
