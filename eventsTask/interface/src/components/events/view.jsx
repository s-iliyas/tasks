import { Link } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { Drawer, Input } from "antd";
import { FiCalendar, FiList, FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import EventView from "./eventView";
import getEvents from "../../../api/getEvents";
import { setEvents, setSearch, setView } from "../../../store/events-slice";
import { ThemeContext } from "../../../contexts/themeProvider";
import searchEvents from "../../../api/searchEvents";

const View = () => {
  const dispatch = useDispatch();

  const { themeMode } = useContext(ThemeContext);

  const view = useSelector((state) => state.events.view);
  const search = useSelector((state) => state.events.search);
  const events = useSelector((state) => state.events.events);
  const searchData = useSelector((state) => state.events.searchData);

  const [open, setOpen] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [formData, setFormData] = useState(searchData);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;

  const getEventsData = useCallback(async () => {
    const events = await getEvents();
    dispatch(setEvents(events));
    setIsLoading(false);
  }, [dispatch]);

  const toggleView = useCallback(async () => {
    if (view) {
      const searchEventsData = await searchEvents({ date: formattedDate });
      dispatch(setEvents(searchEventsData));
    } else {
      getEventsData();
    }
    dispatch(setView(!view));
  }, [view, dispatch, formattedDate, getEventsData]);

  const checkDate = (e) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    const date = e.target.value;
    setFormData((prev) => ({
      ...prev,
      date,
    }));
    if (dateRegex.test(`${date}`)) {
      setErrMsg();
    } else {
      date === "" ? setErrMsg() : setErrMsg("Invalid DD-MM-YYYY");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getEventsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-5 w-full">
      <div className="flex flex-row md:justify-around justify-center px-10 w-full">
        <div></div>
        <div className="flex flex-row space-x-2 items-center justify-center">
          <Link onClick={toggleView} className="hover:text-sky-600">
            {view ? <FiCalendar /> : <FiList />}
          </Link>
          <Link
            className="hover:text-sky-600"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FiFilter />
          </Link>
          <Link
            to={"/event"}
            className="border py-1 px-2 rounded-lg hover:text-sky-500 text-sm border-sky-500"
          >
            Schedule Event
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center items-center space-y-2 py-16">
        {isLoading ? "Loading..." : <EventView events={events} />}
      </div>
      <Drawer
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        closable={false}
        className={
          themeMode
            ? "!text-gray-300 !bg-neutral-900"
            : "!text-neutral-500 !bg-white"
        }
      >
        <div className="flex flex-col space-y-3 items-center justify-center">
          <Link
            className="flex justify-end p-2 w-full text-lg hover:text-sky-600"
            onClick={() => {
              setOpen(false);
            }}
          >
            X
          </Link>
          <strong className="text-3xl">Filter Events</strong>
          {errMsg ? <small className="text-red-600">{errMsg}</small> : <br />}
          <div className="flex-col flex space-y-1 w-full">
            <small>Name (optional)</small>
            <Input
              placeholder="Laundry..."
              value={formData.name_like}
              onChange={(e) => {
                setFormData({ ...formData, name_like: e.target.value });
              }}
            />
          </div>
          <div className="flex-col flex space-y-1 w-full">
            <small>Date (optional)</small>
            <Input
              placeholder="DD-MM-YYYY..."
              value={
                formData.date
                  ? formData.date
                  : searchData.date
                  ? searchData.date
                  : formattedDate
              }
              onChange={checkDate}
            />
          </div>
          <br />
          <div className="flex w-full gap-2">
            <Link
              onClick={async () => {
                if (searchData.date) {
                  const searchEventsData = await searchEvents({
                    date: searchData.date,
                  });
                  dispatch(setEvents(searchEventsData));
                  dispatch(setSearch(true));
                  setOpen(false);
                } else if (search) {
                  dispatch(setSearch(false));
                  setFormData({});
                  const events = await getEvents();
                  dispatch(setEvents(events));
                  setOpen(false);
                }
              }}
              className="border-2 grow text-center rounded-md border-yellow-600 hover:text-yellow-600 px-2 py-1"
            >
              <strong>Clear</strong>
            </Link>
            <Link
              onClick={async () => {
                if (!errMsg) {
                  const data = { ...formData };
                  if (!view && !formData.date) {
                    data.date = formattedDate;
                  }
                  const searchEventsData = await searchEvents(data);
                  dispatch(setEvents(searchEventsData));
                  dispatch(setSearch(true));
                  setOpen(false);
                }
              }}
              className="border-2 grow text-center rounded-md border-sky-600 hover:text-sky-600 px-2 py-1"
            >
              <strong>Filter</strong>
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default View;
