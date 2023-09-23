import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/home";
import ErrorComponent from "./components/errorComponent";
import Register from "./components/register";
import Login from "./components/login";
import Rooms from "./components/rooms";
import Clients from "./components/clients";

function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <Home />, errorElement: <ErrorComponent /> },
    { path: "/register", element: <Register />, errorElement: <ErrorComponent /> },
    { path: "/login", element: <Login />, errorElement: <ErrorComponent /> },
    { path: "/rooms", element: <Rooms />, errorElement: <ErrorComponent /> },
    { path: "/clients", element: <Clients />, errorElement: <ErrorComponent /> },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
