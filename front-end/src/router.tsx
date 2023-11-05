import { createBrowserRouter } from "react-router-dom";
import { NavigationOutlet } from "./components/navigation-outlet.tsx";
import { ErrorPage, StationsListPage, StationsMapPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationOutlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <StationsListPage />,
        index: true,
      },
      {
        path: "map",
        element: <StationsMapPage />,
      },
    ],
  },
]);
