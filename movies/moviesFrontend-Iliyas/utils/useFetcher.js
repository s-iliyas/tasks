import axios from "axios";

const useFetcher = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export default useFetcher;
