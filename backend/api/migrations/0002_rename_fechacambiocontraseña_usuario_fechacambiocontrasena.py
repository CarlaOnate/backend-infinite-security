# Generated by Django 4.1.2 on 2022-10-12 20:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="usuario",
            old_name="fechaCambioContraseña",
            new_name="fechaCambioContrasena",
        ),
    ]
