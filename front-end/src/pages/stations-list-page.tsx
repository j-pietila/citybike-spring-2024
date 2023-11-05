import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StationListRow } from "../components/station-list-row.tsx";
import {
  getStations,
  getStationDetails,
} from "../services/station-service.tsx";

const StationsListPage = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);

  useEffect(() => {
    getStations().then((stations) => {
      setStations(stations);
    });
  }, []);

  const handleClick = (id) => {
    getStationDetails(id).then((station) => {
      navigate(`/stations/${station.id}`, { state: { station: station } });
    });
  };

  return (
    <div className="station-list-page">
      <div className="station-list">
        <div className="station-list-row hover:bg-white hover:cursor-auto">
          <div className="font-inter font-bold">Name</div>
          <div className="font-inter font-bold">Address</div>
          <div className="font-inter font-bold">Latitude</div>
          <div className="font-inter font-bold">Longitude</div>
        </div>
        {stations.map((station) => (
          <div
            key={station.id}
            className="station-list-row"
            onClick={() => handleClick(station.id)}
          >
            <StationListRow station={station} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationsListPage;
