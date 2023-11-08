import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getStationDetails } from "../services/station-service.tsx";

const StationDetailsPage = () => {
  const [station, setStation] = useState(null);
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (location.state && location.state.station) {
      setStation(location.state.station);
    } else {
      getStationDetails(id).then((station) => {
        setStation(station);
      });
    }
  }, [id, location]);

  if (!station) {
    return false;
  }

  return (
    <div className="station-details">
      <p className="mb-1 font-semibold text-4xl">{station.station_name}</p>
      <p className="mb-8 text-3xl">{station.station_address}</p>
      <p className="mb-1 text-2xl font-semibold decoration-slate-600">
        Journeys
      </p>
      <p className="text-xl">Started from station {station.journeys_started}</p>
      <p className="mb-4 text-xl">Ended to station {station.journeys_ended}</p>
      <p className="mb-1 text-2xl font-semibold decoration-slate-600">
        Started journeys
      </p>
      <p className="text-xl">
        Average distance {station.journeys_started_avg_distance} meters
      </p>
      <p className="text-xl">
        Average duration{" "}
        {Math.floor(station.journeys_started_avg_duration / 60)} minutes{" "}
        {station.journeys_started_avg_duration % 60} seconds
      </p>
    </div>
  );
};

export default StationDetailsPage;
