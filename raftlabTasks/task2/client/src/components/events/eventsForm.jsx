import { Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EventsForm = () => {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(location.search);
  const title = urlSearchParams.get("title") || "";
  const description = urlSearchParams.get("description") || "";
  const completed = urlSearchParams.get("completed");
  const id = urlSearchParams.get("id");

  const chatToken = localStorage.getItem("chatToken");

  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    title,
    description,
    completed,
  });

  const handleEvent = async () => {
    const data = formData;
    if (id) {
      data.eventId = id;
    }
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/events/${
          title ? "update" : "create"
        }`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: chatToken,
          },
        }
      )
      .then(() => {
        navigate("/events");
      })
      .catch((err) => {
        setErrMsg(
          err?.response?.data?.message?.[0] ||
            err?.response?.data?.error?.errors[0].message ||
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
      <div className="flex flex-col space-y-1 w-full">
        <small>Title*</small>
        <Input
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
          placeholder="Meet client"
          className="text-white bg-transparent"
          autoFocus
        />
      </div>
      <div className="flex flex-col space-y-1 w-full">
        <small>Description</small>
        <Input.TextArea
          rows={6}
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          placeholder="Discuss the architecture.."
          className="text-white bg-transparent"
        />
      </div>
      {title && (
        <div className="flex flex-row items-center space-x-2 w-full">
          <small>Completed</small>
          <input
            type="checkbox"
            name="completed"
            checked={
              formData.completed === "false" || !formData.completed
                ? false
                : true
            }
            onChange={(e) => {
              setFormData({ ...formData, completed: e.target.checked });
            }}
            className="cursor-pointer"
          />
        </div>
      )}
      <Link
        onClick={handleEvent}
        className="bg-orange-200 text-black text-xl font-medium hover:bg-orange-300 rounded-md text-center py-1 px-5"
      >
        {title ? "Update" : "Create"} Event
      </Link>
      {errMsg && <small className="text-red-600">{errMsg}</small>}
    </form>
  );
};

export default EventsForm;
