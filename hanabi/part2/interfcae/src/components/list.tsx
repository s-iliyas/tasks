import axios from "axios";
import { useEffect } from "react";

const List = () => {

  const getPosts = async () => {
    try {
      const posts = await axios.get("http://localhost:8000/posts");
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  return <div>{posts.map((post)=><div>
    
  </div>)}</div>;
};

export default List;
