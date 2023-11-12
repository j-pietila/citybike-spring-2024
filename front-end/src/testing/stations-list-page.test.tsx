import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { server } from "./msw/server";
import { MemoryRouter } from "react-router-dom";
import { StationsListPage } from "../pages";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  vi.restoreAllMocks();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("stations list page", () => {
  it("renders stations list", async () => {
    render(<StationsListPage />, { wrapper: MemoryRouter });

    const stationsListHeader = await screen.findByLabelText(
      "station-list-header"
    );

    expect(
      within(stationsListHeader).getByRole("button", { name: /station name/i })
    ).toBeInTheDocument();

    expect(
      within(stationsListHeader).getByRole("button", {
        name: /station address/i,
      })
    ).toBeInTheDocument();

    expect(
      within(stationsListHeader).getByText(/latitude/i)
    ).toBeInTheDocument();

    expect(
      within(stationsListHeader).getByText(/longitude/i)
    ).toBeInTheDocument();

    const stationsList = await screen.findByLabelText("station-list");
    const stations = within(stationsList).getAllByRole("listitem");

    expect(stations.length).toBe(5);
    expect(stations[0].textContent).toContain("Kaivopuisto");
    expect(stations[0].textContent).toContain("Meritori 1");
    expect(stations[0].textContent).toContain("60.155369615074");
    expect(stations[0].textContent).toContain("24.9502114714031");
  });

  it("sorts stations list by station name or station address", async () => {
    const user = userEvent.setup();

    render(<StationsListPage />, { wrapper: MemoryRouter });

    const sortByNameButton = await screen.findByRole("button", {
      name: /station name/i,
    });

    const sortByAddressButton = await screen.findByRole("button", {
      name: /station address/i,
    });

    // Original stations list order from back-end by id
    let stationsList = await screen.findByLabelText("station-list");
    let stations = within(stationsList).getAllByRole("listitem");

    expect(stations.length).toBe(5);
    expect(stations[0].textContent).toContain("Kaivopuisto");
    expect(stations[1].textContent).toContain("Laivasillankatu");
    expect(stations[2].textContent).toContain("Kapteeninpuistikko");
    expect(stations[3].textContent).toContain("Viiskulma");
    expect(stations[4].textContent).toContain("Sepänkatu");

    // Ascending sort by station name
    await user.click(sortByNameButton);
    stationsList = await screen.findByLabelText("station-list");
    stations = within(stationsList).getAllByRole("listitem");

    expect(stations[0].textContent).toContain("Kaivopuisto");
    expect(stations[1].textContent).toContain("Kapteeninpuistikko");
    expect(stations[2].textContent).toContain("Laivasillankatu");
    expect(stations[3].textContent).toContain("Sepänkatu");
    expect(stations[4].textContent).toContain("Viiskulma");

    // Ascending sort by station address
    await user.click(sortByAddressButton);
    stationsList = await screen.findByLabelText("station-list");
    stations = within(stationsList).getAllByRole("listitem");

    expect(stations[0].textContent).toContain("Fredrikinkatu 19");
    expect(stations[1].textContent).toContain("Laivasillankatu 14");
    expect(stations[2].textContent).toContain("Meritori 1");
    expect(stations[3].textContent).toContain("Tehtaankatu 13");
    expect(stations[4].textContent).toContain("Tehtaankatu 25");

    // Descending sort by station name
    await user.click(sortByNameButton);
    stationsList = await screen.findByLabelText("station-list");
    stations = within(stationsList).getAllByRole("listitem");

    expect(stations[0].textContent).toContain("Viiskulma");
    expect(stations[1].textContent).toContain("Sepänkatu");
    expect(stations[2].textContent).toContain("Laivasillankatu");
    expect(stations[3].textContent).toContain("Kapteeninpuistikko");
    expect(stations[4].textContent).toContain("Kaivopuisto");

    // Descending sort by station address
    await user.click(sortByAddressButton);
    stationsList = await screen.findByLabelText("station-list");
    stations = within(stationsList).getAllByRole("listitem");

    expect(stations[0].textContent).toContain("Tehtaankatu 25");
    expect(stations[1].textContent).toContain("Tehtaankatu 13");
    expect(stations[2].textContent).toContain("Meritori 1");
    expect(stations[3].textContent).toContain("Laivasillankatu 14");
    expect(stations[4].textContent).toContain("Fredrikinkatu 19");
  });

  it("filters stations list by station name or station address", async () => {
    const user = userEvent.setup();

    render(<StationsListPage />, { wrapper: MemoryRouter });

    const searchStation = await screen.findByLabelText("station-list-search");

    let stationsList = await screen.findByLabelText("station-list");
    let stations = within(stationsList).getAllByRole("listitem");
    expect(stations.length).toBe(5);

    await user.click(searchStation);
    await user.keyboard("ka");
    stationsList = await screen.findByLabelText("station-list");
    stations = within(stationsList).getAllByRole("listitem");

    expect(stations.length).toBe(2);
    expect(stations[0].textContent).toContain("Kaivopuisto");
    expect(stations[1].textContent).toContain("Kapteeninpuistikko");

    await user.click(searchStation);
    await user.keyboard("p");
    stationsList = await screen.findByLabelText("station-list");
    stations = within(stationsList).getAllByRole("listitem");

    expect(stations.length).toBe(1);
    expect(stations[0].textContent).toContain("Kapteeninpuistikko");

    await user.click(searchStation);
    await user.keyboard("i");
    stationsList = await screen.findByLabelText("station-list");
    stations = within(stationsList).queryAllByRole("listitem");

    expect(stations).toEqual([]);

    await user.click(searchStation);
    await user.keyboard("{BackSpace}{BackSpace}{BackSpace}{BackSpace}f");
    stationsList = await screen.findByLabelText("station-list");
    stations = within(stationsList).getAllByRole("listitem");

    expect(stations.length).toBe(1);
    expect(stations[0].textContent).toContain("Fredrikinkatu 19");
  });

  it("sorts and filters stations list at the same time", async () => {
    const user = userEvent.setup();

    render(<StationsListPage />, { wrapper: MemoryRouter });

    const searchStation = await screen.findByLabelText("station-list-search");

    const sortByNameButton = await screen.findByRole("button", {
      name: /station name/i,
    });

    await user.click(searchStation);
    await user.keyboard("ka");
    let stationsList = await screen.findByLabelText("station-list");
    let stations = within(stationsList).getAllByRole("listitem");

    expect(stations.length).toBe(2);
    expect(stations[0].textContent).toContain("Kaivopuisto");
    expect(stations[1].textContent).toContain("Kapteeninpuistikko");

    // Stations happen to be ordered by ascending on the response.
    // Double click should sort filtered list by descending order
    await user.click(sortByNameButton);
    await user.click(sortByNameButton);
    stationsList = await screen.findByLabelText("station-list");
    stations = within(stationsList).getAllByRole("listitem");

    expect(stations.length).toBe(2);
    expect(stations[0].textContent).toContain("Kapteeninpuistikko");
    expect(stations[1].textContent).toContain("Kaivopuisto");
  });

  it("fetches station details and redirects to station detail page when list row is clicked", async () => {
    const user = userEvent.setup();

    render(<StationsListPage />, { wrapper: MemoryRouter });

    const stationsList = await screen.findByLabelText("station-list");
    const stations = within(stationsList).getAllByRole("listitem");

    const stationDetails = {
      id: 2,
      station_name: "Laivasillankatu",
      station_address: "Laivasillankatu 14",
      journeys_started: 7052,
      journeys_ended: 7004,
      journeys_started_avg_distance: 2591,
      journeys_started_avg_duration: 1222,
    };

    await user.click(stations[1]);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/stations/${stationDetails.id}`,
      {
        state: { station: stationDetails },
      }
    );
  });
});
