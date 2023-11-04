from rest_framework import status, viewsets, mixins
from rest_framework.response import Response

from bikes.models import Station
from bikes.serializers import StationSerializer, StationDetailSerializer


class StationViewSet(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    """
    Station model related views.
    """

    lookup_field = "id"

    def list(self, request, *args, **kwargs):
        queryset = Station.objects.all().order_by("id")
        serializer = StationSerializer(queryset, many=True)

        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        try:
            queryset = Station.objects.get(id=kwargs["id"])
        except Station.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = StationDetailSerializer(queryset)

        return Response(serializer.data)
