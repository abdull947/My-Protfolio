from django.contrib import admin
from .models import Comment, Project ,Experience ,Education ,Certification ,Profile


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'created_at']
    list_filter = ['created_at']
    search_fields = ['title', 'description']
    ordering = ['order', '-created_at']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['job_title', 'company', 'start_date', 'end_date', 'order']
    list_filter = ['company']
    search_fields = ['job_title', 'company']
    ordering = ['order', '-id']

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'start_date', 'end_date', 'order']
    list_filter = ['institution']
    search_fields = ['degree', 'institution']
    ordering = ['order', '-id']
@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'organization', 'order']
    search_fields = ['name', 'organization']
    ordering = ['order', '-id']

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['email', 'phone', 'location']
    search_fields = ['email', 'phone', 'location']