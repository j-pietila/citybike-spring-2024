from rest_framework import serializers

from bikes.models import Station


class StationSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="coordinate_y")
    longitude = serializers.FloatField(source="coordinate_x")

    class Meta:
        model = Station
        fields = [
            "id",
            "station_name",
            "station_address",
            "latitude",
            "longitude",
        ]


class StationDetailSerializer(serializers.ModelSerializer):
    journeys_started = serializers.IntegerField()
    journeys_ended = serializers.IntegerField()
    journeys_started_avg_distance = serializers.IntegerField()
    journeys_started_avg_duration = serializers.IntegerField()

    class Meta:
        model = Station
        fields = [
            "id",
            "station_name",
            "station_address",
            "journeys_started",
            "journeys_ended",
            "journeys_started_avg_distance",
            "journeys_started_avg_duration",
        ]
