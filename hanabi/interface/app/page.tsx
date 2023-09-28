"use client";

import { useAppDispatch } from "@/hooks/store";
import { setUserDetails } from "@/store/slices/user.slice";
import { Input } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const [username, setUsername] = useState(
    (typeof localStorage !== "undefined" &&
      localStorage.getItem("hanabiUsername")) ||
      ""
  );

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{
    message: string;
    error: boolean;
  } | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (username) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/user/${username}`)
        .then((response) => {
          dispatch(setUserDetails(response?.data));
          localStorage.setItem("hanabiUsername", response?.data?.username);
          push("/form");
        })
        .catch((err) =>
          setMsg({
            message:
              err?.response?.data?.message?.[0] ||
              err?.response?.data?.error ||
              err?.message,
            error: true,
          })
        )
        .finally(() => {
          setLoading(false);
          setMsg(null);
        });
    } else {
      setMsg({
        message: "Username required.",
        error: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
      <form className="flex flex-col p-5 md:w-[40%] mx-auto sm:w-[50%] space-y-5 justify-center items-center">
        <div className="flex flex-col w-full space-y-1">
          <label htmlFor="username">Username:</label>
          <Input
            disabled={loading}
            id="username"
            size="large"
            autoFocus
            name="username"
            className="text-white bg-transparent"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="border-sky-300 border text-xl hover:text-sky-300 rounded-md text-center py-1 px-5"
        >
          {loading ? "Wait.." : "Submit"}
        </button>
      </form>
      {msg && (
        <small className={msg.error ? "text-red-600" : "text-green-600"}>
          {msg.message}
        </small>
      )}
    </div>
  );
}
