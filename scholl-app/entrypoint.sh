#!bin/bash
pip install -r requirements.txt
pip install channels-redis 
python manage.py makemigrations
python manage.py migrate
python manage.py defaultuseradmin
python manage.py proses
python manage.py runserver 0.0.0.0:8000 --settings=config.settings.prod