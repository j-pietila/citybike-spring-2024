import { useNavigate } from "react-router-dom";
import { getStationDetails } from "../services/station-service.tsx";

export const StationsList = ({ stations }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    getStationDetails(id).then((station) => {
      navigate(`/stations/${station.id}`, { state: { station: station } });
    });
  };

  return (
    <div className="station-list">
      <div className="station-list-row text-center font-semibold tracking-wide bg-slate-400 hover:bg-slate-400 hover:cursor-auto">
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
          onClick={() => handleRowClick(station.id)}
        >
          <div className="station-list-row-item">{station.station_name}</div>
          <div className="station-list-row-item">{station.station_address}</div>
          <div className="station-list-row-item">{station.latitude}</div>
          <div className="station-list-row-item">{station.longitude}</div>
        </div>
      ))}
    </div>
  );
};

export default StationsList;
