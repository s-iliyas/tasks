import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { socket } from "../../socker";

const Clients = () => {
  const userEmail = localStorage.getItem("userEmail");

  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [currentClient, setCurrentClient] = useState(userEmail);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const getClients = async () => {
    // Listen for incoming messages from the server
    socket.on("clients", () => {
      console.log("Connected");
    });

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
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(message) {
      console.log(message);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("clients", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessage = async () => {
    socket.emit("clients", { message }, (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[currentClient] = newMessages[currentClient]?.length
          ? [...newMessages[currentClient], message]
          : [message];
        return newMessages;
      });
    });
  };

  return (
    <section className="min-h-screen flex p-2 space-y-4 flex-col justify-center items-center">
      <div className="flex flex-row w-full px-4">
        <Link className="mr-auto text-sm hover:text-sky-300" to={"/"}>
          {"< Go Back"} {isConnected && "Socket connected"}
        </Link>
      </div>
      <div className="flex md:flex-row flex-col w-full gap-2">
        <div className="flex flex-col gap-2 p-2 w-full md:w-[25%] bg-slate-200 rounded-md h-[90vh] text-gray-900">
          <small>Clients</small>
          {loading ? (
            <small>Loading...</small>
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
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="flex flex-col gap-2 p-2 w-full md:w-[75%] h-[90vh] bg-gray-200 rounded-md text-gray-900 relative">
          {messages[currentClient]?.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
          <div className="flex flex-row items-center absolute bottom-0 p-2 w-full">
            <Input
              className="grow border-2 border-orange-300"
              id="chat-input"
              autoFocus
              placeholder="Message..."
              size="large"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
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
