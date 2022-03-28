# Generated by Django 4.0.3 on 2022-03-27 22:55

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('local_id', models.UUIDField()),
                ('title', models.CharField(max_length=40)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(help_text='date created on frontend')),
                ('last_edited', models.DateTimeField(help_text='last edited on frontend')),
                ('initial_sync', models.DateTimeField(auto_now_add=True, help_text='time of the first sync')),
                ('last_sync', models.DateTimeField(auto_now=True, help_text='last time this was synced')),
                ('favorite', models.BooleanField(default=False)),
                ('trash', models.BooleanField(default=False)),
                ('client', models.CharField(max_length=20, null=True)),
                ('client_version', models.CharField(max_length=20, null=True)),
            ],
        ),
    ]