import { Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RoomForm = () => {
  const navigate = useNavigate();

  const params = new URLSearchParams(location.href);
  const name = params.get("name") || "";
  const description = params.get("description") || "";

  const [formData, setFormData] = useState({
    name,
    description,
  });
  const [errMsg, setErrMsg] = useState("");

  const chatToken = localStorage.getItem("chatToken");

  const handleRoom = async () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/rooms/${
          name ? "update" : "create"
        }`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: chatToken,
          },
        }
      )
      .then(() => {
        navigate("/rooms");
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
      <Link
        className="mr-auto text-sm hover:text-sky-300"
        onClick={() => history.back()}
      >
        {"< Go Back"}
      </Link>
      <Input
        value={formData.name}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
        }}
        placeholder="Name*"
        className="text-white bg-transparent"
      />
      <Input.TextArea
        rows={6}
        value={formData.description}
        onChange={(e) => {
          setFormData({ ...formData, description: e.target.value });
        }}
        placeholder="Description"
        className="text-white bg-transparent"
      />
      <Link
        onClick={handleRoom}
        className="bg-orange-200 text-black text-lg font-medium hover:bg-orange-300 rounded-md text-center py-1 px-5"
      >
        {name ? "Update" : "Create"} Room
      </Link>
      {errMsg && <small className="text-red-600">{errMsg}</small>}
    </form>
  );
};

export default RoomForm;
