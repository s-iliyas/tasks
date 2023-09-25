import axios from "axios";
import { Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const handleRegister = async () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/user/register`,
        {
          email: formData.email?.trim(),
          password: formData.password?.trim(),
          password2: formData.password2?.trim(),
        },
        { headers: { "Content-Type": "application/json" } }
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
        placeholder="Email*"
        className="text-white bg-transparent"
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
        }}
      />
      <Input.Password
        placeholder="Password"
        className="text-white bg-transparent"
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
        }}
      />
      <Input.Password
        placeholder="Re-Type Password"
        className="text-white bg-transparent"
        value={formData.password2}
        onChange={(e) => {
          setFormData({ ...formData, password2: e.target.value });
        }}
      />
      <Link
        onClick={handleRegister}
        className="bg-orange-200 text-black text-xl font-medium hover:bg-orange-300 rounded-md text-center py-1 px-5"
      >
        Register
      </Link>
      {errMsg && <small className="text-red-600">{errMsg}</small>}
    </form>
  );
};

export default Register;
