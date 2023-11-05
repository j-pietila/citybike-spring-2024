import { createBrowserRouter } from "react-router-dom";
import { NavigationOutlet } from "./components/navigation-outlet.tsx";
import {
  ErrorPage,
  StationDetailsPage,
  StationsListPage,
  StationsMapPage,
} from "./pages";

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
        path: "stations/:id",
        element: <StationDetailsPage />,
      },
      {
        path: "map",
        element: <StationsMapPage />,
      },
    ],
  },
]);
