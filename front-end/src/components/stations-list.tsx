import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StationsContext } from "../contexts.tsx";
import { StationsListSortButton } from "./stations-list-sort-button.tsx";
import { getStationDetails } from "../services/station-service.tsx";
import { SortFields } from "../enums.tsx";

export const StationsList = () => {
  const { stations } = useContext(StationsContext);
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    getStationDetails(id).then((station) => {
      navigate(`/stations/${station.id}`, { state: { station: station } });
    });
  };

  return (
    <div className="station-list-grid">
      <div className="station-list-subgrid station-list-subgrid-tw sticky top-0 font-semibold tracking-wide bg-slate-400">
        <StationsListSortButton
          buttonText="Station name"
          sortField={SortFields.STATION_NAME}
        />
        <StationsListSortButton
          buttonText="Station address"
          sortField={SortFields.STATION_ADDRESS}
        />
        <div className="flex justify-center items-center hover:cursor-auto hover:bg-slate-400">
          Latitude
        </div>
        <div className="flex justify-center items-center hover:cursor-auto hover:bg-slate-400">
          Longitude
        </div>
      </div>
      <>
        {stations.map((station, index) => (
          <div
            className={`station-list-subgrid station-list-subgrid-tw hover:bg-gray-400 hover:cursor-pointer ${
              index % 2 === 0 ? "bg-slate-200" : "bg-slate-100"
            }`}
            key={station.id}
            onClick={() => handleRowClick(String(station.id))}
          >
            <div>{station.station_name}</div>
            <div>{station.station_address}</div>
            <div>{station.latitude}</div>
            <div>{station.longitude}</div>
          </div>
        ))}
      </>
    </div>
  );
};

export default StationsList;
