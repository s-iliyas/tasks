"use client";

import axios from "axios";
import Link from "next/link";
import { Input } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { RootState } from "@/store";
import { setUserDetails } from "@/store/slices/user.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store";

const Form = () => {
  // Retrieve dispatch function from custom hook
  const dispatch = useAppDispatch();

  // Get user details from Redux store using custom hook and selector
  const userDetails = useAppSelector(
    (state: RootState) => state.user.userDetails
  );

  // Access the router for navigation
  const { push } = useRouter();

  // Get the username from local storage
  const username =
    typeof localStorage !== "undefined" &&
    localStorage.getItem("hanabiUsername");

  // Redirect to the homepage if the user's username doesn't match
  if (userDetails?.username !== username) {
    push("/");
  }

  // Initialize form data state
  const [formData, setFormData] = useState({
    email: userDetails.email || "",
    name: userDetails.name || "",
    phoneNumber: userDetails.phoneNumber || "",
    username: username || userDetails.username,
    dob: userDetails.dob || "",
  });

  // Initialize state for messages and loading
  const [msg, setMsg] = useState<{
    message: string;
    error: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `http://localhost:8000/user/${
          Object.keys(userDetails).length > 1 ? "update" : "create"
        }`,
        {
          email: formData.email?.trim(),
          name: formData.name?.trim(),
          phoneNumber: formData.phoneNumber?.trim(),
          username: formData.username?.trim(),
          dob: formData.dob?.trim(),
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        // Dispatch an action to update user details in Redux store
        dispatch(setUserDetails(response?.data));
        // Redirect to the confirmation page
        push("/confirmation");
      })
      .catch((err) => {
        setMsg({
          message:
            (err?.response?.data?.statusCode !== 404 &&
              err?.response?.data?.message?.[0]) ||
            err?.response?.data?.error ||
            err?.message,
          error: true,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="flex flex-col p-5 md:w-[40%] mx-auto sm:w-[50%] space-y-5 justify-center items-center">
      <strong className="pt-16 text-xl">
        Hello, {formData.username}. Manage Your Profile
      </strong>
      <div className="flex flex-col w-full ">
        <strong>Name*</strong>
        <Input
          placeholder="John wick"
          name="name"
          size="large"
          className="text-white bg-transparent"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col w-full">
        <strong>Phone Number:</strong>
        <Input
          placeholder="+919559595959"
          size="large"
          name="phone number"
          className="text-white bg-transparent"
          value={formData.phoneNumber}
          onChange={(e) => {
            setFormData({ ...formData, phoneNumber: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col w-full">
        <strong>Email:</strong>{" "}
        <Input
          placeholder="john@gmail.com"
          name="email"
          size="large"
          className="text-white bg-transparent"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col w-full">
        <strong>Date of Birth:</strong>
        <Input
          name="dob"
          size="large"
          placeholder="DD-MM-YYYY"
          className="text-white bg-transparent"
          value={formData.dob}
          onChange={(e) => {
            setFormData({ ...formData, dob: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-row space-x-3 w-full">
        <button
          onClick={handleRegister}
          className="border grow border-sky-200  text-xl font-medium hover:text-sky-300 rounded-md text-center py-1 px-5"
        >
          {loading ? "Wait..." : "Submit"}
        </button>
        <Link
          href={"/"}
          className="border grow border-orange-200  text-xl font-medium hover:text-orange-300 rounded-md text-center py-1 px-5"
        >
          Cancel
        </Link>
      </div>
      {msg && (
        <small className={msg.error ? "text-red-600" : "text-green-600"}>
          {msg.message}
        </small>
      )}
    </form>
  );
};

export default Form;
