from django import urls
from rest_framework import status
from rest_framework.test import APITestCase

from bikes.models import Station


class StationTest(APITestCase):
    def setUp(self) -> None:
        self.create_test_stations_data()
        return super().setUp()

    def tearDown(self) -> None:
        self.delete_test_data()
        return super().tearDown()

    def test_get_all_stations(self):
        """
        Test GET all stations returns all stations with all station data ordered
        by station id. Note coordinate naming changed to latitude and longitude
        from db model to response objects.
        """
        url = urls.reverse("bikes:station-list")

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        stations = [station for station in response.data]
        self.assertEqual(len(stations), 3)

        self.assertEqual(stations[0]["station_name"], self.station.station_name)
        self.assertEqual(stations[0]["station_address"], self.station.station_address)
        self.assertEqual(stations[0]["latitude"], float(self.station.coordinate_y))
        self.assertEqual(stations[0]["longitude"], float(self.station.coordinate_x))

        self.assertEqual(stations[1]["station_name"], self.station2.station_name)
        self.assertEqual(stations[1]["station_address"], self.station2.station_address)
        self.assertEqual(stations[1]["latitude"], float(self.station2.coordinate_y))
        self.assertEqual(stations[1]["longitude"], float(self.station2.coordinate_x))

        self.assertEqual(stations[2]["station_name"], self.station3.station_name)
        self.assertEqual(stations[2]["station_address"], self.station3.station_address)
        self.assertEqual(stations[2]["latitude"], float(self.station3.coordinate_y))
        self.assertEqual(stations[2]["longitude"], float(self.station3.coordinate_x))

    def create_test_stations_data(self):
        self.station = Station.objects.create(
            station_name="Test station 1",
            station_address="Test street 1",
            coordinate_x="24.9305373005364",
            coordinate_y="60.1831601093456",
        )

        self.station2 = Station.objects.create(
            station_name="Test station 2",
            station_address="Test street 2",
            coordinate_x="24.8828103623042",
            coordinate_y="60.1674572921424",
        )

        self.station3 = Station.objects.create(
            station_name="Test station 3",
            station_address="Test street 3",
            coordinate_x="24.8567965996401",
            coordinate_y="60.2363305501839",
        )

    def delete_test_data(self):
        Station.objects.all().delete()
