import { useEffect, useState } from "react";
import { StationListRow } from "../components/station-list-row.tsx";

const StationsListPage = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch("http://citybike.localhost/api/v1/stations", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
      });
  }, []);

  return (
    <div class="station-list-page">
      <div class="station-list">
        <div class="station-list-row">
          <div class="font-inter font-bold">Name</div>
          <div class="font-inter font-bold">Address</div>
          <div class="font-inter font-bold">Latitude</div>
          <div class="font-inter font-bold">Longitude</div>
        </div>
        {stations.map((station) => (
          <StationListRow station={station} />
        ))}
      </div>
    </div>
  );
};

export default StationsListPage;
