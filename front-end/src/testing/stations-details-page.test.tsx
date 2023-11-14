import { render, screen } from "@testing-library/react";
import { server } from "./msw/server";
import { MemoryRouter } from "react-router-dom";
import { StationDetailsPage } from "../pages";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";

interface MockLocation {
  state: object;
}

const mockLocationValue: MockLocation = {
  state: {
    station: {
      id: 62,
      station_name: "Välimerenkatu",
      station_address: "Välimerenkatu 9",
      journeys_started: 15692,
      journeys_ended: 15574,
      journeys_started_avg_distance: 2446,
      journeys_started_avg_duration: 1020,
    },
  },
};

const mockIdValue = { id: "2" };

vi.mock("react-router-dom", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn().mockImplementation(() => {
      return mockLocationValue;
    }),
    useParams: vi.fn().mockImplementation(() => {
      return mockIdValue;
    }),
  };
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("station details page", () => {
  it("renders station details correctly from stations list navigate state", async () => {
    render(<StationDetailsPage />, { wrapper: MemoryRouter });

    const stationDetails = await screen.findByLabelText("station-details");

    expect(stationDetails.textContent).toContain("Välimerenkatu");
    expect(stationDetails.textContent).toContain("Välimerenkatu 9");
    expect(stationDetails.textContent).toContain("Started from station 15692");
    expect(stationDetails.textContent).toContain("Ended to station 15574");
    expect(stationDetails.textContent).toContain(
      "Average distance 2446 meters"
    );
    expect(stationDetails.textContent).toContain(
      "Average duration 17 minutes 0 seconds"
    );
  });

  it("renders station details correctly while fetching details", async () => {
    mockLocationValue.state = {};

    render(<StationDetailsPage />, { wrapper: MemoryRouter });

    const stationDetails = await screen.findByLabelText("station-details");

    expect(stationDetails.textContent).toContain("Laivasillankatu");
    expect(stationDetails.textContent).toContain("Laivasillankatu 14");
    expect(stationDetails.textContent).toContain("Started from station 7052");
    expect(stationDetails.textContent).toContain("Ended to station 7004");
    expect(stationDetails.textContent).toContain(
      "Average distance 2591 meters"
    );
    expect(stationDetails.textContent).toContain(
      "Average duration 20 minutes 22 seconds"
    );
  });
});
