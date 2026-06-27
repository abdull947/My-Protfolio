from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Certification, Comment, Profile, Project , Experience , Education ,Profile
import json
def home(request):
    comments = Comment.objects.all()
    projects = Project.objects.all()
    return render(request, 'portfolio_app/home.html', {
        'comments': comments,
        'projects': projects
    })
@csrf_exempt
def submit_comment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name', '').strip()
            email = data.get('email', '').strip()
            message = data.get('message', '').strip()
            rating = int(data.get('rating', 5))

            if not name or not message or rating < 1 or rating > 5:
                return JsonResponse({'success': False, 'error': 'Invalid data'}, status=400)

            comment = Comment.objects.create(
                name=name,
                email=email if email else None,
                message=message,
                rating=rating
            )
            return JsonResponse({
                'success': True,
                'comment': {
                    'name': comment.name,
                    'email': comment.email or '',
                    'message': comment.message,
                    'rating': comment.rating,
                    'date': comment.created_at.strftime('%d %b %Y')
                }
            })
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def get_comments(request):
    comments = Comment.objects.all()
    data = [{
        'name': c.name,
        'email': c.email or '',
        'message': c.message,
        'rating': c.rating,
        'date': c.created_at.strftime('%d %b %Y')
    } for c in comments]
    return JsonResponse({'comments': data, 'count': len(data)})
def projects(request):
    projects = Project.objects.all()
    return render(request, 'portfolio_app/projects.html', {'projects': projects})

def experience(request):
    experiences = Experience.objects.all()
    return render(request, 'portfolio_app/experience.html', {'experiences': experiences})
def education(request):
    educations = Education.objects.all()
    return render(request, 'portfolio_app/education.html', {'educations': educations})
def certifications(request):
    certifications = Certification.objects.all()
    return render(request, 'portfolio_app/certifications.html', {'certifications': certifications})
def profile(request):
    profile = Profile.objects.first()
    return render(request, 'portfolio_app/profile.html', {'profile': profile})