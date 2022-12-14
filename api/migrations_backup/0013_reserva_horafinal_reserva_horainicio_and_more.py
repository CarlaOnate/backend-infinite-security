# Generated by Django 4.0.3 on 2022-09-23 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_remove_lugar_idproductos_lugar_idproductos'),
    ]

    operations = [
        migrations.AddField(
            model_name='reserva',
            name='horaFinal',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='reserva',
            name='horaInicio',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='lugar',
            name='idProductos',
            field=models.ManyToManyField(to='api.producto'),
        ),
    ]
