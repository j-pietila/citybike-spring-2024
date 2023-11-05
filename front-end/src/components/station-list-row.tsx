export const StationListRow = ({ station }) => {
  return (
    <div class="station-list-row">
      <div class="station-list-row-item">{station.station_name}</div>
      <div class="station-list-row-item">{station.station_address}</div>
      <div class="station-list-row-item">{station.latitude}</div>
      <div class="station-list-row-item">{station.longitude}</div>
    </div>
  );
};

export default StationListRow;
