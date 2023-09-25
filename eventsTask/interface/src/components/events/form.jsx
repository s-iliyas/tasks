import { Input, Select } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";

import Footer from "../footer";
import Navbar from "../navbar";
import timeSet from "../../../timeSet";
import DeleteButton from "./deleteButton";
import addEvent from "../../../api/addEvent";
import editEvent from "../../../api/editEvent";

const Form = () => {
  const navigate = useNavigate();

  const { eventId } = useParams();

  const events = useSelector((state) => state.events.events);
  const event = events?.filter((event) => event.id === Number(eventId))[0];
  const data = event
    ? event
    : {
        name: "",
        description: "",
        month: "",
        time: "",
        year: "",
        day: "",
        duration: "",
      };

  const [formData, setFormData] = useState(data);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (eventId && !event) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const condition = (status) => {
    if (!status) {
      throw new Error("Oops");
    } else {
      navigate("/");
    }
  };

  const date = `${formData?.day}-${formData?.month}-${formData?.year}`;

  const checkDate = () => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (dateRegex.test(`${date}`)) {
      setErrMsg()
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (formData?.name === "") {
      setErrMsg("Name required");
      return;
    } else if (formData?.description === "") {
      setErrMsg("Description required");
      return;
    } else if (formData?.duration === "") {
      setErrMsg("Duration required");
      return;
    } else if (isNaN(formData?.duration)) {
      setErrMsg("Duration should be number");
      return;
    } else if (formData?.time === "") {
      setErrMsg("Time required");
      return;
    } else {
      const status = checkDate();
      if (status) {
        try {
          if (event) {
            const editEventStatus = await editEvent(eventId, {
              ...formData,
              date,
            });
            condition(editEventStatus);
          } else {
            const addEventStatus = await addEvent({
              ...formData,
              date,
            });
            condition(addEventStatus);
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        setErrMsg("Invalid DD-MM-YYYY");
      }
    }
  };

  return (
    <>
      <Navbar />
      <form className="flex flex-col justify-center items-center space-y-5 p-3">
        {errMsg ? <small className="text-red-600">{errMsg}</small> : <br />}
        <div className="flex-col flex space-y-1 w-[20rem] md:min-w-[30rem]">
          <div className="flex flex-row space-x-2 items-center justify-end w-full">
            <Link
              onClick={() => {
                history.back();
              }}
            >
              <FiArrowLeft />
            </Link>
            <DeleteButton eventId={eventId} />
          </div>
          <small>Name</small>
          <Input
            placeholder="Zoro.."
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>
        <div className="flex-col flex space-y-1 w-[20rem] md:min-w-[30rem]">
          <small>Description</small>
          <Input.TextArea
            placeholder="Gotta meet my client.."
            rows={"6"}
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-[20rem] md:min-w-[30rem]">
          <div className="flex-col flex space-y-1 grow">
            <small>Date</small>
            <Input
              placeholder="DD"
              value={formData.day}
              onChange={(e) => {
                setFormData({ ...formData, day: e.target.value });
              }}
            />
          </div>
          <div className="flex-col flex space-y-1 grow">
            <small>Month</small>
            <Input
              placeholder="MM"
              value={formData.month}
              onChange={(e) => {
                setFormData({ ...formData, month: e.target.value });
              }}
            />
          </div>
          <div className="flex-col flex space-y-1 grow">
            <small>Year</small>
            <Input
              placeholder="YYYY"
              value={formData.year}
              onChange={(e) => {
                setFormData({ ...formData, year: e.target.value });
              }}
            />
          </div>
          <div className="flex-col flex grow space-y-1 min-w-[10rem]">
            <small>Time</small>
            <Select
              value={formData.time}
              options={timeSet}
              onChange={(e) => {
                setFormData({ ...formData, time: e });
              }}
            />
          </div>
        </div>
        <div className="flex-col flex space-y-1 w-[20rem] md:min-w-[30rem]">
          <small>Duration (*Minutes)</small>
          <Input
            placeholder="30"
            value={formData.duration}
            onChange={(e) => {
              setFormData({ ...formData, duration: e.target.value });
            }}
          />
        </div>
        <Link
          onClick={handleSubmit}
          className="border py-1 px-4 rounded-lg hover:text-sky-500 border-sky-500"
        >
          {eventId ? "Update" : "Schedule"}
        </Link>
      </form>
      <Footer />
    </>
  );
};

export default Form;
