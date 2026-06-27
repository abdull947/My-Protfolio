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
class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    github_link = models.URLField()
    live_link = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order', '-created_at']

#Experience
class Experience(models.Model):
    job_title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_date = models.CharField(max_length=20)   # e.g. "Jan 2026"
    end_date = models.CharField(max_length=20)      # e.g. "Feb 2026" ya "Present"
    responsibilities = models.TextField()            # har line alag responsibility
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.job_title} at {self.company}"

    def get_responsibilities_list(self):
        return [line.strip() for line in self.responsibilities.split('\n') if line.strip()]

    class Meta:
        ordering = ['order', '-id']

    #Education
class Education(models.Model):
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    start_date = models.CharField(max_length=20)   # e.g. "Jan 2026"
    end_date = models.CharField(max_length=20)      # e.g. "Feb 2026" ya "Present"
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.degree} at {self.institution}"

    class Meta:
        ordering = ['order', '-id']

class Certification(models.Model):
    icon = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    organization = models.CharField(max_length=100)
    certificate_file = models.FileField(upload_to='certificates/', blank=True, null=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order', '-id']

class Profile(models.Model):
    bio = models.TextField()
    location = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    technical_skills = models.TextField()   # comma-separated: "Python, Django, FastAPI"
    languages = models.TextField()          # comma-separated: "Urdu - Native, English - Intermediate"

    def __str__(self):
        return "About Me Profile"

    def get_skills_list(self):
        return [s.strip() for s in self.technical_skills.split(',') if s.strip()]

    def get_languages_list(self):
        return [l.strip() for l in self.languages.split(',') if l.strip()]