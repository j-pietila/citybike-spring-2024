import { useEffect, useMemo, useState } from "react";
import { StationsContext, StationsSortContext } from "../contexts.tsx";
import { SearchBar, StationsList } from "../components";
import { SortDirection, SortFields } from "../enums.tsx";
import { getStations } from "../services/station-service.tsx";

export interface ListStation {
  id: number;
  station_name: string;
  station_address: string;
  latitude: number;
  longitude: number;
}

const StationsListPage = () => {
  const [stations, setStations] = useState<ListStation[]>([]);
  const [sort, setSort] = useState<SortDirection>(SortDirection.DESCENDING);
  const [sortField, setSortField] = useState<SortFields>(SortFields.UNSORTED);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const sortedStations = useMemo(() => {
    if (sortField === SortFields.UNSORTED) return stations;

    if (sort === SortDirection.ASCENDING) {
      return [...stations].sort((s1, s2) =>
        s1[sortField] > s2[sortField] ? 1 : -1
      );
    } else {
      return [...stations].sort((s1, s2) =>
        s1[sortField] < s2[sortField] ? 1 : -1
      );
    }
  }, [stations, sort, sortField]);

  const filteredStations = useMemo(() => {
    if (searchFilter === "") return sortedStations;

    return sortedStations.filter(
      (station) =>
        station.station_name
          .toLowerCase()
          .startsWith(searchFilter.toLowerCase()) ||
        station.station_address
          .toLowerCase()
          .startsWith(searchFilter.toLowerCase())
    );
  }, [sortedStations, searchFilter]);

  useEffect(() => {
    getStations().then((stations) => {
      setStations(stations);
    });
  }, []);

  if (stations.length === 0 && filteredStations.length === 0) {
    return false;
  }

  return (
    <div className="station-list-page">
      <SearchBar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <StationsContext.Provider value={{ stations: filteredStations }}>
        <StationsSortContext.Provider value={{ setSort, setSortField }}>
          <StationsList />
        </StationsSortContext.Provider>
      </StationsContext.Provider>
    </div>
  );
};

export default StationsListPage;
