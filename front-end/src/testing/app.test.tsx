import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { server } from "./msw/server";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import App from "../app";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("app", () => {
  it("renders all components", async () => {
    render(<App />);

    expect(await screen.findByLabelText("navigation-bar")).toBeInTheDocument();
    expect(await screen.findByLabelText("search-bar")).toBeInTheDocument();
    expect(await screen.findByLabelText("station-list")).toBeInTheDocument();
  });

  it("renders navbar with links pointing to correct page locations", async () => {
    const user = userEvent.setup();

    render(<App />);

    const navbarMenuButton = await screen.findByRole("button", {
      name: /city bikes/i,
    });

    user.click(navbarMenuButton);

    const stationListPageLink = await screen.findByRole("link", {
      name: /station list/i,
    });

    expect(stationListPageLink.getAttribute("href")).toEqual("/");

    const stationMapPageLink = await screen.findByRole("link", {
      name: /station map/i,
    });

    expect(stationMapPageLink.getAttribute("href")).toEqual("/map");
  });
});
