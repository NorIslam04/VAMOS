# Generated by Django 5.1.3 on 2025-01-03 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agence', '0003_remove_voyage_titre_voyage_activités_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='agence',
            name='password',
            field=models.CharField(default='password', max_length=50),
        ),
    ]