import { useEffect, useState } from "react";
import { SearchBar } from "../components/search-bar.tsx";
import { StationsList } from "../components/stations-list.tsx";
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
      <StationsList
        orgStations={stations}
        setOrgStations={setStations}
        stations={filteredStations}
        setStations={setFilteredStations}
      />
    </>
  );
};

export default StationsListPage;
