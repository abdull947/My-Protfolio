==============================================
  MUHAMMAD ABDULLAH — DJANGO PORTFOLIO
  Step-by-Step Setup Guide
==============================================

STEP 1 — INSTALL DJANGO
------------------------
VS Code mein Terminal kholen (Ctrl + `)
Yeh command chalayein:

    pip install django

STEP 2 — FOLDER KHOLEN
-----------------------
VS Code mein:
File > Open Folder > "portfolio_django" folder select karein

STEP 3 — DATABASE SETUP
------------------------
Terminal mein yeh commands ek ek kar ke chalayein:

    python manage.py makemigrations
    python manage.py migrate

STEP 4 — ADMIN USER BANAYEIN
------------------------------
    python manage.py createsuperuser

Apna username, email aur password enter karein.
(Yahi se aap comments dekh sakenge!)

STEP 5 — SERVER CHALAYEIN
--------------------------
    python manage.py runserver

STEP 6 — BROWSER MEIN KHOLEIN
-------------------------------
Portfolio:   http://127.0.0.1:8000
Admin Panel: http://127.0.0.1:8000/admin

==============================================
  ADMIN PANEL MEIN COMMENTS KAISE DEKHEIN
==============================================

1. http://127.0.0.1:8000/admin par jayen
2. Username aur password enter karein
3. "Comments" section mein click karein
4. Saare comments database se dekh saktey hain!
5. Comments delete, edit bhi kar saktey hain!

==============================================
  PROJECT STRUCTURE
==============================================

portfolio_django/
├── manage.py               ← Server chalane ke liye
├── requirements.txt        ← Dependencies
├── db.sqlite3              ← Database (auto create hoga)
├── portfolio_project/
│   ├── settings.py         ← Project settings
│   └── urls.py             ← Main URLs
└── portfolio_app/
    ├── models.py           ← Comment database model
    ├── views.py            ← Logic
    ├── urls.py             ← App URLs
    ├── admin.py            ← Admin panel config
    └── templates/
        └── portfolio_app/
            └── index.html  ← Portfolio website

==============================================
© 2026 Muhammad Abdullah
==============================================
