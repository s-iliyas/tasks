import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import socket from "../../socker";

const Clients = () => {
  const userEmail = localStorage.getItem("userEmail");

  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentClient, setCurrentClient] = useState(userEmail);
  const messagesEndRef = useRef(null);

  const getClients = async () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/user`)
      .then((response) => {
        const filteredEmails = response?.data?.users?.filter(
          (user) => user !== userEmail
        );
        setClients(filteredEmails);
        setCurrentClient(filteredEmails[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCurrentClient = async (client) => {
    setCurrentClient(client);
  };

  useEffect(() => {
    getClients();

    function onListenClientMessage(data) {
      setMessages((prevMessages) => [...prevMessages, data?.data]);
      setOnline(data?.online);
    }

    socket.on("clients", onListenClientMessage);

    return () => {
      socket.off("clients", onListenClientMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessage = async () => {
    socket.emit(
      "clients",
      {
        recipientId: currentClient,
        message,
        senderId: userEmail,
        id: `${socket.id}${Math.random()}`,
      },
      (data) => {
        setMessages((prevMessages) => [...prevMessages, data.data]);
        setOnline(data?.online);
        setMessage("");
      }
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <section className="min-h-screen flex p-2 space-y-4 flex-col justify-center items-center">
      <div className="flex flex-row w-full px-4">
        <Link className="mr-auto text-sm hover:text-sky-300" to={"/"}>
          {"< Go Back"}
        </Link>
      </div>
      <div className="flex md:flex-row flex-col w-full gap-2">
        <div className="flex flex-col gap-2 p-2 w-full md:w-[25%] bg-slate-200 rounded-md h-[90vh] text-gray-900">
          <small>Clients</small>
          {loading ? (
            <small>Loading...</small>
          ) : clients.length === 0 ? (
            <small>No clients</small>
          ) : (
            clients.map((client) => (
              <Link
                className="w-full flex flex-row gap-2 rounded-md p-2 hover:bg-slate-400"
                style={{
                  backgroundColor:
                    currentClient === client
                      ? "rgb(148 163 184)"
                      : "rgb(203 213 225)",
                }}
                key={client}
                onClick={() => {
                  handleCurrentClient(client);
                }}
              >
                <img
                  src="/user.png"
                  alt={`${client}'s logo`}
                  className="h-10"
                />
                <div className="flex flex-col">
                  <small>{client}</small>
                  <p className=" text-xs">
                    {online?.includes(client) ? (
                      <>
                        <strong className="text-green-900">*</strong> Online
                      </>
                    ) : (
                      <>
                        <strong>-</strong> Offline
                      </>
                    )}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="flex flex-col gap-2 p-2 w-full md:w-[75%] h-[90vh] bg-gray-200 rounded-md text-gray-900 relative">
          <small className="text-center">
            {currentClient} {"Client's"} Chat
          </small>
          <div className="overflow-y-auto h-[88%]" >
            {messages
              ?.filter(
                (message) =>
                  (message.recipientId === currentClient &&
                    message.senderId === userEmail) ||
                  (message.recipientId === userEmail &&
                    message.senderId === currentClient)
              )
              ?.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.senderId === userEmail
                      ? "ml-auto flex-row-reverse"
                      : "mr-auto flex-row"
                  } flex m-1 items-start justify-start`}
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

export default Clients;
