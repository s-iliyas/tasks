/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import getEvents from "../../../api/getEvents";
import deleteEvent from "../../../api/deleteEvent";
import { setEvents } from "../../../store/events-slice";

const DeleteButton = ({ eventId, condition }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const status = await deleteEvent(eventId);
    if (status && condition) {
      const events = await getEvents();
      dispatch(setEvents(events));
      navigate("/");
    } else {
      console.log("Something went wrong");
      navigate("/")
    }
  };
  return (
    <Link onClick={handleDelete} className="text-red-600">
      <FiTrash2 />
    </Link>
  );
};

export default DeleteButton;
