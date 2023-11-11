import { createContext } from "react";
import { ListStation } from "./pages/stations-list-page";
import { SortDirection, SortFields } from "./enums";

interface StationsContextProps {
  stations: ListStation[];
}
interface StationsSortContextProps {
  setSort: React.Dispatch<React.SetStateAction<SortDirection>> | VoidFunction;
  setSortField: React.Dispatch<React.SetStateAction<SortFields>> | VoidFunction;
}

export const StationsContext = createContext<StationsContextProps>({
  stations: [],
});

export const StationsSortContext = createContext<StationsSortContextProps>({
  setSort: () => {},
  setSortField: () => {},
});
