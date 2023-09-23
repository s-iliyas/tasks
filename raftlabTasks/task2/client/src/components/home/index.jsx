import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("chatToken");

  const navigate = useNavigate();
  
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      {token ? (
        <div className="flex flex-col space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="border-orange-200 hover:text-orange-300 border text-md hover:border-orange-300 rounded-md text-center py-2 px-5"
            >
              Logout
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
