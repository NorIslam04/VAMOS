# Generated by Django 5.1.3 on 2024-12-30 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usr', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usr',
            name='image',
            field=models.ImageField(default='photos/default.jpg', upload_to='photos'),
        ),
    ]