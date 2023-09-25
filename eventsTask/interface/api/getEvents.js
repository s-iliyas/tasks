import axios from "axios";

const getEvents = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/events`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export default getEvents;
