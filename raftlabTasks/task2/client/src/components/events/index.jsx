import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const chatToken = localStorage.getItem("chatToken");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/events`, {
          headers: { Authorization: chatToken },
        })
        .then((response) => {
          setEvents(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    })();
  }, [chatToken]);

  const handleDelete = async (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/events?eventId=${id}`, {
        headers: { Authorization: chatToken },
      })
      .then((response) => {
        setEvents(response.data);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-start p-5 py-10 space-y-4 lg:w-[60%] md:w-[80%] mx-auto">
      <div className="flex flex-row space-x-5 items-end">
        <Link to={"/"} className=" hover:text-sky-300 text-md py-1">
          {"<"} <small className="underline"> Go back</small>
        </Link>
        <strong className="text-5xl">Manage Events</strong>
      </div>
      <Link
        to={"/events/form"}
        className="border-orange-200 hover:text-orange-300 border text-md hover:border-orange-300 rounded-md text-center py-2 px-5"
      >
        Create Event
      </Link>
      {loading && <small>Loading..</small>}
      {events.length === 0 && "No events."}
      {events.map((event, index) => (
        <div key={index} className="border p-2 flex flex-col rounded-md w-full">
          <div className="flex flex-wrap justify-between items-center">
            <small>
              {index + 1}. {event.title}
            </small>
            <div className="flex flex-row space-x-2">
              <Link
                className="text-xs underline hover:text-sky-600"
                to={`/events/form?title=${event.title}&description=${event.description}&completed=${event.completed}&id=${event.id}`}
              >
                Edit
              </Link>
              <Link
                className="text-xs underline hover:text-red-600"
                onClick={() => {
                  handleDelete(event.id);
                }}
              >
                Delete
              </Link>
            </div>
          </div>
          {event.completed ? (
            <small className="text-green-600">Completed</small>
          ) : (
            <small className="text-yellow-600">Pending</small>
          )}
          <br />
          <small>{event.description}</small>
        </div>
      ))}
    </div>
  );
};

export default Events;
