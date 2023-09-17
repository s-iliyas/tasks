import axios from "axios";

const editEvent = async (id, data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/events/${id}`,
      data
    );
    return response.status === 200 ? true : false;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export default editEvent;
