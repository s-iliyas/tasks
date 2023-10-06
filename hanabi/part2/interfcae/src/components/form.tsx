import { useContext, useState } from "react";
import axios from "axios";
import { PostContext } from "../../contexts/PostProvider";

const Form = () => {
  const initialData = { title: "", content: "" };

  const [formData, setFormData] = useState(initialData);

  const postContext = useContext(PostContext);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/posts",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const newPost = response.data;
      postContext?.setPosts((prevPosts) => [...prevPosts, newPost]);
      setFormData(initialData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <input
        type="text"
        placeholder="title"
        value={formData.title}
        onChange={(e) => {
          setFormData({ ...formData, title: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="content"
        value={formData.content}
        onChange={(e) => {
          setFormData({ ...formData, content: e.target.value });
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default Form;
