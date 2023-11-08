import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StationListRow } from "../components/station-list-row.tsx";
import {
  getStations,
  getStationDetails,
} from "../services/station-service.tsx";

const StationsListPage = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState(null);

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

  if (!stations) {
    return false;
  }

  return (
    <div className="station-list">
      <div className="station-list-row text-center font-inter font-semibold tracking-wide bg-slate-400 hover:bg-slate-400 hover:cursor-auto">
        <div>Station name</div>
        <div>Station address</div>
        <div>Latitude</div>
        <div>Longitude</div>
      </div>
      {stations.map((station, index) => (
        <div
          key={station.id}
          className={`station-list-row ${
            index % 2 === 0 ? "bg-slate-100" : "bg-white"
          }`}
          onClick={() => handleClick(station.id)}
        >
          <StationListRow station={station} />
        </div>
      ))}
    </div>
  );
};

export default StationsListPage;
