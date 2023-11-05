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
    return null;
  }

  return (
    <div className="station-detail">
      <div className="font-bold text-4xl mb-4">
        {station.station_name} - {station.station_address}
      </div>
      <div className="font-semibold text-2xl">
        Journeys started: {station.journeys_started}
      </div>
      <div className="font-semibold text-2xl">
        Journeys ended: {station.journeys_ended}
      </div>
      <div className="font-semibold text-2xl">
        Average distance of started journeys:{" "}
        {station.journeys_started_avg_distance} meters
      </div>
      <div className="font-semibold text-2xl">
        Average duration of started journeys:{" "}
        {Math.floor(station.journeys_started_avg_duration / 60)} minutes{" "}
        {station.journeys_started_avg_duration % 60} seconds
      </div>
    </div>
  );
};

export default StationDetailsPage;
