from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
admin.site.site_header = "Abdul Tech Admin"
admin.site.site_title = "Abdul Tech Admin Portal"
admin.site.index_title = "Welcome to Abdul Tech Admin Portal"
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio_app.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)