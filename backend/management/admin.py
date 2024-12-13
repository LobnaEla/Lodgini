from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(Property)
admin.site.register( PropertyUnavailableDate)
admin.site.register(Booking)
admin.site.register(Review)


