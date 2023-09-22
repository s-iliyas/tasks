import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/home";
import ErrorComponent from "./components/errorElement";

const routes = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorComponent /> },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
