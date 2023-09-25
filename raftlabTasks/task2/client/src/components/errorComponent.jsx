import { useRouteError } from "react-router-dom";

const ErrorComponent = () => {
  const error = useRouteError();
  return (
    <div className="flex flex-col p-24 items-center justify-center">
      <h1 className="text-yellow-500 text-5xl"> {"Oops"}</h1>
      <br />
      <small>{error.statusText || error.message}</small>
    </div>
  );
};

export default ErrorComponent;
