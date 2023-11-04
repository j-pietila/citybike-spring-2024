from rest_framework import viewsets, mixins
from rest_framework.response import Response

from bikes.models import Station
from bikes.serializers import StationSerializer


class StationViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    """
    Station model related views.
    """

    def list(self, request, *args, **kwargs):
        queryset = Station.objects.all().order_by("id")
        serializer = StationSerializer(queryset, many=True)

        return Response(serializer.data)
