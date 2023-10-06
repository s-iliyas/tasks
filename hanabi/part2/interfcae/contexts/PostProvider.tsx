import React, {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
} from "react";

interface PostInterface {
  title: string;
  content: string;
  id: string;
  date: string;
}

interface PostContextProps {
  posts: PostInterface[];
  setPosts: Dispatch<SetStateAction<PostInterface[]>>;
}

export const PostContext = createContext<PostContextProps | undefined>(
  undefined
);

const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const contextValue: PostContextProps = {
    posts,
    setPosts,
  };

  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
};

export default PostProvider;
