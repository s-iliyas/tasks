import React, { useState } from "react";
import { createContext } from "react";

const PostContext = createContext<{
  posts: never[];
  setPosts: React.Dispatch<React.SetStateAction<never[]>>;
} | null>(null);

const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState([]);
  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
