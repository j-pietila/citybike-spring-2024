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
