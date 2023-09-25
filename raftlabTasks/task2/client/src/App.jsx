import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/home";
import ErrorComponent from "./components/errorComponent";
import Register from "./components/register";
import Login from "./components/login";
import Rooms from "./components/rooms";
import Clients from "./components/clients";
import RoomForm from "./components/rooms/roomForm";
import Events from "./components/events";
import EventsForm from "./components/events/eventsForm";

function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <Home />, errorElement: <ErrorComponent /> },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorComponent />,
    },
    { path: "/login", element: <Login />, errorElement: <ErrorComponent /> },
    { path: "/rooms", element: <Rooms />, errorElement: <ErrorComponent /> },
    {
      path: "/rooms/form",
      element: <RoomForm />,
      errorElement: <ErrorComponent />,
    },
    {
      path: "/clients",
      element: <Clients />,
      errorElement: <ErrorComponent />,
    },
    { path: "/events", element: <Events />, errorElement: <ErrorComponent /> },
    { path: "/events/form", element: <EventsForm />, errorElement: <ErrorComponent /> },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
