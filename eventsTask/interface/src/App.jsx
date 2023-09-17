import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/home/Home";
import Form from "./components/events/form";
import ErrorComponent from "./components/errorComponent";
import { ThemeContext } from "../contexts/themeProvider";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/event/:eventId?", element: <Form /> },
].map((route) => ({
  ...route,
  errorElement: <ErrorComponent />,
}));

const router = createBrowserRouter(routes);

function App() {
  const { themeMode } = useContext(ThemeContext);
  return (
    <div
      className={`min-h-screen ${
        themeMode
          ? "text-gray-300 bg-neutral-900"
          : "text-neutral-500 bg-white"
      }`}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
