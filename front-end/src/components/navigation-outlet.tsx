import { Outlet } from "react-router-dom";
import { NavigationBar } from "./navigation-bar";

export const NavigationOutlet = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default NavigationOutlet;
