export const StationListRow = ({ station }) => {
  return (
    <>
      <div className="station-list-row-item">{station.station_name}</div>
      <div className="station-list-row-item">{station.station_address}</div>
      <div className="station-list-row-item">{station.latitude}</div>
      <div className="station-list-row-item">{station.longitude}</div>
    </>
  );
};

export default StationListRow;
