# Generated by Django 5.1.3 on 2025-01-03 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usr', '0002_usr_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='usr',
            name='phoneNumber',
            field=models.CharField(default='0000000000', max_length=50),
        ),
    ]
