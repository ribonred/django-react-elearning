from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class ModelViewsetPaginate(viewsets.ModelViewSet):
    def paginate_queryset(self, queryset, view=None):
        if 'paginate' in self.request.query_params:
            return self.paginator.paginate_queryset(queryset, self.request, view=self)
        else:
            return None
