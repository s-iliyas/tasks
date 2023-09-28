"use client";

import axios from "axios";
import { Input } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/hooks/store";
import { setUserDetails } from "@/store/slices/user.slice";

export default function Home() {
  const dispatch = useAppDispatch();

  const { push } = useRouter();

  // State to manage the username input field
  const [username, setUsername] = useState(
    (typeof localStorage !== "undefined" &&
      localStorage.getItem("hanabiUsername")) ||
      ""
  );

  // State to manage loading state during the API request
  const [loading, setLoading] = useState(false);

  // State to manage and display error/success messages
  const [msg, setMsg] = useState<{
    message: string;
    error: boolean;
  } | null>(null);

  // Function to handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (username) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/user/${username}`)
        .then((response) => {
          // Dispatch an action to update user details in Redux store
          dispatch(setUserDetails(response?.data));
          // Store the username in local storage
          localStorage.setItem("hanabiUsername", response?.data?.username);
          // Redirect to the form page
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
      {/* Display error or success message */}
      {msg && (
        <small className={msg.error ? "text-red-600" : "text-green-600"}>
          {msg.message}
        </small>
      )}
    </div>
  );
}
