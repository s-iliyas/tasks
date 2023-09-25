import { Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const handleLogin = async () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/user/login`,
        {
          email: formData.email?.trim(),
          password: formData.password?.trim(),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        localStorage.setItem("chatToken", response?.data?.token);
        localStorage.setItem("userEmail", response?.data?.email);
        window.location.href = "/";
      })
      .catch((err) => {
        setErrMsg(
          err?.response?.data?.message?.[0] ||
            err?.response?.data?.error ||
            err?.message
        );
      });
  };

  return (
    <form className="flex flex-col p-5 md:w-[40%] mx-auto sm:w-[50%] space-y-5 min-h-screen justify-center items-center">
      <Link className="mr-auto text-sm hover:text-sky-300" to={"/"}>
        {"< Go Back"}
      </Link>
      <Input
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
        }}
        placeholder="Email*"
        className="text-white bg-transparent"
      />
      <Input.Password
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
        }}
        placeholder="Password"
        className="text-white bg-transparent"
      />
      <Link
        onClick={handleLogin}
        className="bg-orange-200 text-black text-xl font-medium hover:bg-orange-300 rounded-md text-center py-1 px-5"
      >
        Login
      </Link>
      {errMsg && <small className="text-red-600">{errMsg}</small>}
    </form>
  );
};

export default Login;
