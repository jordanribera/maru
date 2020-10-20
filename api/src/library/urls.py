from django.urls import path

from library.views import MediaFileListAPIView

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('files', MediaFileListAPIView.as_view(), name="files"),
]
