from django.contrib import admin
from .models import Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
