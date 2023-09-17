/* eslint-disable react/prop-types */

import { useState } from "react";
import { Calendar } from "antd";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DeleteButton from "./deleteButton";
import searchEvents from "../../../api/searchEvents";
import { setEvents, setSearchData } from "../../../store/events-slice";

const EventView = ({ events }) => {
  const dispatch = useDispatch();

  const [showTextId, setShowTextId] = useState();

  const view = useSelector((state) => state.events.view);

  const onPanelChange = async (value) => {
    const date = value.format("DD-MM-YYYY");
    const searchEventsData = await searchEvents({
      date,
    });
    dispatch(setEvents(searchEventsData));
    dispatch(setSearchData({ date }));
  };

  return (
    <div className="flex flex-col items-center space-y-2 w-[100%] sm:w-[40rem] lg:w-[50rem]">
      {!view ? <Calendar fullscreen={false} onChange={onPanelChange} /> : ""}
      {!events || events?.length === 0 ? (
        <>
          <img src="/browser.png" className="h-56 w-56" />
          <strong>No events</strong>
        </>
      ) : (
        events?.map((event, index) => {
          return (
            <div
              key={event.id}
              className="border p-2 w-full rounded-lg flex flex-col space-y-1"
            >
              <div className="flex flex-row justify-between items-center">
                <small>{index + 1}.</small>
                <div className="ml-auto flex flex-row space-x-2">
                  <Link className="text-sky-600" to={`/event/${event.id}`}>
                    <FiEdit />
                  </Link>
                  <DeleteButton eventId={event.id} condition={view} />
                </div>
              </div>
              <strong>{event.name}</strong>
              <small>{`${event.day}-${event.month}-${event.year} | ${event.time} | ${event.duration} Minutes`}</small>
              <hr />
              <small>
                {showTextId === event.id
                  ? event.description
                  : event.description.length > 300
                  ? event.description.slice(0, 300)
                  : event.description}
                {event.description.length > 300 && (
                  <Link
                    onClick={() => {
                      showTextId ? setShowTextId() : setShowTextId(event.id);
                    }}
                    className="text-sky-600 hover:text-gray-600"
                  >
                    {showTextId === event.id ? (
                      <small className="underline">cancel</small>
                    ) : (
                      <>
                        ...
                        <small className="underline">more</small>
                      </>
                    )}
                  </Link>
                )}
              </small>
            </div>
          );
        })
      )}
    </div>
  );
};

export default EventView;
