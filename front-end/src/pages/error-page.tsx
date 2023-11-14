import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  const parseErrorMessage = (error: unknown) => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else {
      return "Unknown error";
    }
  };

  return (
    <div>
      <h1>Oops!</h1>
      <p>An unexpected error has occurred</p>
      <p>
        <i>{parseErrorMessage(error)}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
