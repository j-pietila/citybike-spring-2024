import { NavLink } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <>
      <div>
        <h1>Citybike NavBar</h1>
        <p>
          <NavLink to="/">Stations list</NavLink>
        </p>
        <p>
          <NavLink to="map">Stations map</NavLink>
        </p>
      </div>
    </>
  );
};

export default NavigationBar;
