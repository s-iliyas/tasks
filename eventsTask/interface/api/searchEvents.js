import axios from "axios";

const searchEvents = async ({ name_like, date }) => {
  let url;
  let searchData = {};
  if (name_like) {
    searchData.name_like = name_like;
  }
  if (date) {
    searchData.date_like = date;
  }
  const params = new URLSearchParams(searchData);
  url = `${import.meta.env.VITE_BACKEND_BASE_URL}/events?${params.toString()}`;
  try {
    const response = await axios.get(url);
    return response.status === 200 ? response.data : [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export default searchEvents;
