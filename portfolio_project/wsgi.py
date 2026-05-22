import os
import sys

path = '/home/Abdull947/My-Protfolio'
if path not in sys.path:
    sys.path.append(path)

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'portfolio_project.settings'
)

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()