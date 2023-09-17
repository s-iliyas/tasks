import axios from "axios";

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/events/${id}`
    );
    return response.status === 200 ? true : false;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export default deleteEvent;
