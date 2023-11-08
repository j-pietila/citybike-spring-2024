import { Outlet } from "react-router-dom";
import { NavigationBar } from "./navigation-bar";

export const NavigationOutlet = () => {
  return (
    <div className="app-root">
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default NavigationOutlet;
