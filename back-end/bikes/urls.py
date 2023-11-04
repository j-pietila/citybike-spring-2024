from django.urls import path, include
from rest_framework.routers import DefaultRouter

from bikes.views import StationViewSet

API_PREFIX = "api/v1/"

router = DefaultRouter()
router.register(r"stations", StationViewSet, basename="station")

urlpatterns = [
    path(API_PREFIX, include(router.urls)),
]
