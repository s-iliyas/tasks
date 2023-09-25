import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import socket from "../../socker";

const Rooms = () => {
  const userEmail = localStorage.getItem("userEmail");
  const chatToken = localStorage.getItem("chatToken");

  const [rooms, setRooms] = useState([]);
  const [roomMessages, setRoomMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState("");

  const messagesEndRef = useRef(null);

  const getRooms = async () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/rooms`, {
        headers: { Authorization: chatToken },
      })
      .then((response) => {
        setRooms(response.data);
        setCurrentRoom(response.data[0].name);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCurrentRoom = async (room) => {
    setCurrentRoom(room);
  };

  useEffect(() => {
    getRooms();

    function onListenRoomMessage(data) {
      setRoomMessages((prevMessages) => [...prevMessages, data]);
    }

    socket.on("messageReceived", onListenRoomMessage);

    return () => {
      socket.off("messageReceived", onListenRoomMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("currentRoom", currentRoom);
    socket.emit("joinRoom", { room: currentRoom }, (data) => {
      setRoomMessages(data);
    });
  }, [currentRoom]);

  const handleMessage = async () => {
    socket.emit(
      "sendMessage",
      {
        recipientId: currentRoom,
        message,
        senderId: userEmail,
        room: currentRoom,
        messageId: `${socket.id}${Math.random()}`,
      },
      () => {
        setMessage("");
      }
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

  return (
    <section className="min-h-screen flex p-2 space-y-4 flex-col justify-center items-center">
      <div className="flex flex-row w-full px-4">
        <Link className="mr-auto text-sm hover:text-sky-300" to={"/"}>
          {"< Go Back"}
        </Link>
      </div>
      <div className="flex md:flex-row flex-col w-full gap-2">
        <div className="flex flex-col gap-2 p-2 w-full md:w-[25%] bg-slate-200 rounded-md h-[90vh] text-gray-900">
          <small>{rooms.length === 0 && "No"} Rooms</small>
          <Link
            to={"/rooms/form"}
            className="border-orange-200 hover:text-orange-300 border text-md hover:border-orange-300 rounded-md text-center py-2 px-5"
          >
            Create Room
          </Link>
          {loading ? (
            <small>Loading...</small>
          ) : (
            rooms.map((room, index) => (
              <Link
                className="w-full flex flex-row gap-2 rounded-md p-2 hover:!bg-slate-400"
                style={{
                  backgroundColor:
                    currentRoom === room.name
                      ? "rgb(148 163 184)"
                      : "rgb(203 213 225)",
                }}
                key={room.name}
                onClick={() => {
                  handleCurrentRoom(room.name);
                }}
              >
                <small>{index + 1}.</small>
                <div className="flex flex-col">
                  <small>{room.name}</small>
                  <p className=" text-xs">
                    {room.description?.length > 15
                      ? `${room.description.slice(15)}...`
                      : room.description}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="flex flex-col gap-2 p-2 w-full md:w-[75%] h-[90vh] bg-gray-200 rounded-md text-gray-900 relative">
          <small className="text-center">Room Chat</small>
          <div className="overflow-y-auto h-[84%]" id="chat-window">
            {roomMessages?.map((message) => (
              <div
                key={message?.messageId}
                className={`${
                  message.senderId === userEmail
                    ? "ml-auto flex-row-reverse"
                    : "mr-auto flex-row"
                } flex`}
              >
                <div className="flex flex-col">
                  <small
                    className={`${
                      message.senderId === userEmail ? "ml-auto" : "mr-auto"
                    } text-xs p-1`}
                  >
                    {message.senderId === userEmail ? <br /> : message.senderId}
                  </small>
                  <div
                    className={`${
                      message.senderId === userEmail
                        ? " flex-row-reverse"
                        : "flex-row"
                    } flex items-start justify-start gap-1`}
                  >
                    <img src="/user.png" alt="" className="h-6" />
                    <div
                      className={`${
                        message.senderId === userEmail
                          ? " bg-slate-300"
                          : " bg-neutral-300"
                      } p-1 rounded-md`}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex flex-row items-center absolute bottom-0 p-2 w-full">
            <Input
              className="grow border-2 border-orange-300"
              id="chat-input"
              autoFocus
              placeholder="Message..."
              size="large"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleMessage()}
            />
            <Link
              className="bg-orange-200 py-2 px-5 hover:bg-orange-300 rounded-md mx-2"
              onClick={handleMessage}
            >
              Send
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
