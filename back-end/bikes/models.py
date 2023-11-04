from django.db import models


class Journey(models.Model):
    departure_date_time = models.DateTimeField(blank=True, null=True)
    return_date_time = models.DateTimeField(blank=True, null=True)
    departure_station = models.ForeignKey(
        to="Station",
        on_delete=models.SET_NULL,
        related_name="journey_departure_station_set",
        blank=True,
        null=True,
    )
    return_station = models.ForeignKey(
        to="Station",
        on_delete=models.SET_NULL,
        related_name="journey_return_station_set",
        blank=True,
        null=True,
    )
    distance = models.IntegerField(blank=True, null=True)
    duration = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = "journey"


class Station(models.Model):
    station_name = models.CharField(max_length=100)
    station_address = models.CharField(max_length=100)
    coordinate_x = models.CharField(max_length=100)
    coordinate_y = models.CharField(max_length=100)

    class Meta:
        db_table = "station"

    @property
    def journeys_started(self) -> int:
        """
        Return count of journeys started from station.
        """
        return self.journey_departure_station_set.all().count()

    @property
    def journeys_ended(self) -> int:
        """
        Return count of journeys ended to station.
        """
        return self.journey_return_station_set.all().count()

    @property
    def journeys_started_avg_distance(self) -> int:
        """
        Return average distance of journeys started from the station.
        """
        avg_distance = self.journey_departure_station_set.all().aggregate(
            models.Avg("distance", default=0)
        )
        return int(avg_distance["distance__avg"])

    @property
    def journeys_started_avg_duration(self) -> int:
        """
        Return average duration of journeys started from the station.
        """
        avg_duration = self.journey_departure_station_set.all().aggregate(
            models.Avg("duration", default=0)
        )
        return int(avg_duration["duration__avg"])
