import { useRouteError } from "react-router-dom";

const ErrorComponent = () => {
  const error = useRouteError();
  return (
    <div className="flex flex-col py-5 space-y-2 items-center">
      <strong className="text-yellow-600 text-4xl">Dang!</strong>
      <p>Something went wrong! Because, </p>
      <strong>{error.statusText || error.message}</strong>
    </div>
  );
};

export default ErrorComponent;
