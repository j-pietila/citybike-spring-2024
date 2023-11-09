import { useNavigate } from "react-router-dom";
import { SortButton } from "./stations-list-sort-button.tsx";
import { getStationDetails } from "../services/station-service.tsx";

export const StationsList = ({
  orgStations,
  setOrgStations,
  stations,
  setStations,
}) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    getStationDetails(id).then((station) => {
      navigate(`/stations/${station.id}`, { state: { station: station } });
    });
  };

  return (
    <div className="station-list">
      <div className="station-list-row items-center text-center font-semibold tracking-wide bg-slate-400 hover:bg-slate-400 hover:cursor-auto">
        <SortButton
          buttonText="Station name"
          sortField="station_name"
          stations={orgStations}
          setStations={setOrgStations}
        />
        <SortButton
          buttonText="Station address"
          sortField="station_address"
          stations={orgStations}
          setStations={setOrgStations}
        />
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
