from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('submit-comment/', views.submit_comment, name='submit_comment'),
    path('get-comments/', views.get_comments, name='get_comments'),
]
