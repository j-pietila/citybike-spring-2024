import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StationsContext } from "../contexts.tsx";
import { StationsListSortButton } from "./stations-list-sort-button.tsx";
import { getStationDetails } from "../services/station-service.tsx";

export const StationsList = () => {
  const { filteredStations } = useContext(StationsContext);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    getStationDetails(id).then((station) => {
      navigate(`/stations/${station.id}`, { state: { station: station } });
    });
  };

  return (
    <div className="station-list">
      <div className="station-list-row items-center text-center font-semibold tracking-wide bg-slate-400 hover:bg-slate-400 hover:cursor-auto">
        <StationsListSortButton
          buttonText="Station name"
          sortField="station_name"
        />
        <StationsListSortButton
          buttonText="Station address"
          sortField="station_address"
        />
        <div>Latitude</div>
        <div>Longitude</div>
      </div>
      {filteredStations.map((station, index) => (
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
