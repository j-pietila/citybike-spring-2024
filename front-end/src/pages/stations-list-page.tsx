import { useEffect, useState } from "react";
import { StationsContext } from "../contexts.tsx";
import { SearchBar, StationsList } from "../components";
import { getStations } from "../services/station-service.tsx";

const StationsListPage = () => {
  const [stations, setStations] = useState(null);
  const [filteredStations, setFilteredStations] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    getStations().then((stations) => {
      setStations(stations);
      setFilteredStations(stations);
    });
  }, []);

  useEffect(() => {
    if (stations) {
      const filteredStations = stations.filter(
        (station) =>
          station.station_name
            .toLowerCase()
            .startsWith(searchFilter.toLowerCase()) ||
          station.station_address
            .toLowerCase()
            .startsWith(searchFilter.toLowerCase())
      );
      setFilteredStations(filteredStations);
    }
  }, [stations, searchFilter]);

  if (!filteredStations) {
    return false;
  }

  return (
    <>
      <SearchBar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <StationsContext.Provider
        value={{
          stations,
          setStations,
          filteredStations,
        }}
      >
        <StationsList />
      </StationsContext.Provider>
    </>
  );
};

export default StationsListPage;
