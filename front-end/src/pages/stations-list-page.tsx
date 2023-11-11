import { useEffect, useMemo, useState } from "react";
import { StationsContext } from "../contexts.tsx";
import { SearchBar, StationsList } from "../components";
import { getStations } from "../services/station-service.tsx";

const StationsListPage = () => {
  const [stations, setStations] = useState(null);
  const [sort, setSort] = useState("");
  const [sortField, setSortField] = useState("unsorted");
  const [searchFilter, setSearchFilter] = useState("");

  const sortedStations = useMemo(() => {
    if (sortField === "unsorted") return stations;

    if (sort === "ascending") {
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

  if (!filteredStations) {
    return false;
  }

  return (
    <div className="station-list-page">
      <SearchBar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <StationsContext.Provider
        value={{
          filteredStations,
          setSort,
          setSortField,
        }}
      >
        <StationsList />
      </StationsContext.Provider>
    </div>
  );
};

export default StationsListPage;
