# Generated by Django 4.0.3 on 2022-09-20 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_usuario_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='departament',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='verified',
            field=models.BooleanField(default=False),
        ),
    ]