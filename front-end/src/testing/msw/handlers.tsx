import { http, HttpResponse } from "msw";

const handlers = [
  http.get("http://citybike.localhost/api/v1/stations", () => {
    return HttpResponse.json([
      {
        id: 1,
        station_name: "Kaivopuisto",
        station_address: "Meritori 1",
        latitude: 60.155369615074,
        longitude: 24.9502114714031,
      },
      {
        id: 2,
        station_name: "Laivasillankatu",
        station_address: "Laivasillankatu 14",
        latitude: 60.1609890692806,
        longitude: 24.9565097715858,
      },
      {
        id: 3,
        station_name: "Kapteeninpuistikko",
        station_address: "Tehtaankatu 13",
        latitude: 60.1581769029949,
        longitude: 24.9450181631667,
      },
      {
        id: 4,
        station_name: "Viiskulma",
        station_address: "Fredrikinkatu 19",
        latitude: 60.1609858921764,
        longitude: 24.9417758006418,
      },
      {
        id: 5,
        station_name: "Sepänkatu",
        station_address: "Tehtaankatu 25",
        latitude: 60.157948291819,
        longitude: 24.9362853002102,
      },
    ]);
  }),
  http.get("http://citybike.localhost/api/v1/stations/:id", ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: Number(id),
      station_name: "Laivasillankatu",
      station_address: "Laivasillankatu 14",
      journeys_started: 7052,
      journeys_ended: 7004,
      journeys_started_avg_distance: 2591,
      journeys_started_avg_duration: 1222,
    });
  }),
];

export default handlers;
