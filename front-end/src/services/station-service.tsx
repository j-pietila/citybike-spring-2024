import axios from "axios";

export const getStations = async () => {
  const response = await axios.get("http://citybike.localhost/api/v1/stations");
  const stations = await response.data;
  return stations;
};

export const getStationDetails = async (id: string | undefined) => {
  const response = await axios.get(
    `http://citybike.localhost/api/v1/stations/${id}`
  );
  const station = await response.data;
  return station;
};
