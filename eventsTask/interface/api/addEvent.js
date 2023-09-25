import axios from "axios";

const addEvent = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/events`,
      data
    );
    return response.status === 201 ? true : false;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export default addEvent;
