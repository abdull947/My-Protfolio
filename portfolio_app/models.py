from django.db import models

class Comment(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    message = models.TextField()
    rating = models.IntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.rating}★ - {self.created_at.strftime('%d %b %Y')}"
