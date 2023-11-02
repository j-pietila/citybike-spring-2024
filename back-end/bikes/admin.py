from django.contrib import admin

from bikes.models import Journey, Station


@admin.register(Journey)
class JourneyAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "departure_station_name",
        "departure_date_time",
        "return_station_name",
        "return_date_time",
        "distance",
        "duration",
    ]

    @admin.display(description="Departure station name")
    def departure_station_name(self, obj):
        departure_station_name = obj.departure_station.station_name
        return departure_station_name

    @admin.display(description="Return station name")
    def return_station_name(self, obj):
        return_station_name = obj.return_station.station_name
        return return_station_name


@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "station_name",
        "station_address",
        "coordinate_x",
        "coordinate_y",
    ]
