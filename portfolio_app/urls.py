from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('submit-comment/', views.submit_comment, name='submit_comment'),
    path('get-comments/', views.get_comments, name='get_comments'),
    path('projects/', views.projects, name='projects'),
    path('experience/', views.experience, name='experience'),
    path('education/', views.education, name='education'),
    path('certifications/', views.certifications, name='certifications'),
    path('profile/', views.profile, name='profile')
]
