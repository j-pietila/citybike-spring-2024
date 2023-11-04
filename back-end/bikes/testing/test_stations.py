from datetime import datetime, timedelta, timezone

from django import urls
from rest_framework import status
from rest_framework.test import APITestCase

from bikes.models import Journey, Station


class StationTest(APITestCase):
    def setUp(self) -> None:
        self.delete_test_data()
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
        self.create_test_stations_data()

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

    def test_get_single_station(self):
        """
        Test GET single station by id returns station with correct response data.
        """
        self.create_test_stations_data()
        self.create_test_journeys_data()

        url = urls.reverse("bikes:station-detail", args=[self.station.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        station = response.data

        avg_distance = (
            self.station_journey.distance
            + self.station_journey2.distance
            + self.station_journey3.distance
        ) / 3

        avg_duration = (
            self.station_journey.duration
            + self.station_journey2.duration
            + self.station_journey3.duration
        ) / 3

        self.assertEqual(station["station_name"], self.station.station_name)
        self.assertEqual(station["station_address"], self.station.station_address)
        self.assertEqual(station["journeys_started"], 3)
        self.assertEqual(station["journeys_ended"], 1)
        self.assertEqual(station["journeys_started_avg_distance"], int(avg_distance))
        self.assertEqual(station["journeys_started_avg_duration"], int(avg_duration))

    def test_get_single_station_null_values_in_journey(self):
        """
        Test GET single station by id request and data is not affected
        by possible null values in database.
        """
        self.create_test_stations_data()
        self.create_test_journeys_data()

        self.station_journey.distance = None
        self.station_journey.duration = None
        self.station_journey.save()

        url = urls.reverse("bikes:station-detail", args=[self.station.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        station = response.data

        avg_distance = (
            self.station_journey2.distance + self.station_journey3.distance
        ) / 2

        avg_duration = (
            self.station_journey2.duration + self.station_journey3.duration
        ) / 2

        self.assertEqual(station["station_name"], self.station.station_name)
        self.assertEqual(station["station_address"], self.station.station_address)
        self.assertEqual(station["journeys_started"], 3)
        self.assertEqual(station["journeys_ended"], 1)
        self.assertEqual(station["journeys_started_avg_distance"], int(avg_distance))
        self.assertEqual(station["journeys_started_avg_duration"], int(avg_duration))

    def test_get_single_station_id_not_found(self):
        """
        Test GET single station returns HTTP 404 if no station found with given id.
        """
        url = urls.reverse("bikes:station-detail", args=[123])

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_single_station_invalid_id_parameter(self):
        """
        Test GET single station returns HTTP 400 if URL parameter is not an integer.
        """
        url = urls.reverse("bikes:station-detail", args=["invalid"])

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

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

    def create_test_journeys_data(self):
        # Journeys from station one
        self.station_journey = Journey.objects.create(
            departure_date_time=datetime.now(timezone.utc),
            return_date_time=datetime.now(timezone.utc) + timedelta(seconds=1182),
            departure_station=self.station,
            return_station=self.station2,
            distance=2865,
            duration=1182,
        )

        self.station_journey2 = Journey.objects.create(
            departure_date_time=datetime.now(timezone.utc),
            return_date_time=datetime.now(timezone.utc) + timedelta(seconds=1328),
            departure_station=self.station,
            return_station=self.station3,
            distance=3267,
            duration=1328,
        )

        self.station_journey3 = Journey.objects.create(
            departure_date_time=datetime.now(timezone.utc),
            return_date_time=datetime.now(timezone.utc) + timedelta(seconds=1226),
            departure_station=self.station,
            return_station=self.station3,
            distance=3316,
            duration=1226,
        )

        # Journeys from other stations
        Journey.objects.create(
            departure_date_time=datetime.now(timezone.utc),
            return_date_time=datetime.now(timezone.utc) + timedelta(seconds=982),
            departure_station=self.station2,
            return_station=self.station3,
            distance=1982,
            duration=982,
        )

        Journey.objects.create(
            departure_date_time=datetime.now(timezone.utc),
            return_date_time=datetime.now(timezone.utc) + timedelta(seconds=1162),
            departure_station=self.station3,
            return_station=self.station,
            distance=3198,
            duration=1162,
        )

    def delete_test_data(self):
        Journey.objects.all().delete()
        Station.objects.all().delete()
