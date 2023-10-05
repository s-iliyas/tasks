import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const posts = await axios.post("http://localhost:8000/posts", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(posts);
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
