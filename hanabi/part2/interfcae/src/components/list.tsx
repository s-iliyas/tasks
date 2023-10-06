import axios from "axios";
import { useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostProvider";

const List = () => {
  const postContext = useContext(PostContext);

  const getPosts = async () => {
    try {
      const posts = await axios.get("http://localhost:8000/posts");
      postContext?.setPosts(posts.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {postContext?.posts?.map((post, index) => (
        <div key={index}>{post.title}</div>
      ))}
    </div>
  );
};

export default List;
