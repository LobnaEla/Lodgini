from datetime import timedelta
from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from profile.models import *


class Property(models.Model):
    PROPERTY_TYPES = [
        ("Apartment", "Apartment"),
        ("Vacation House", "Vacation House"),
    ]

    FURNITURE_CHOICES = [
        ("Luxuriously Furnished", "Luxuriously Furnished"),
        ("Modestly Furnished", "Modestly Furnished"),
    ]

    # Basic property details
    name = models.CharField(max_length=255)
    description = models.TextField()
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    furnishing_type = models.CharField(max_length=50, choices=FURNITURE_CHOICES)
    location = models.CharField(max_length=255)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    image1 = models.ImageField(
        upload_to="properties/images/",
        blank=False,
        null=False,
    )
    image2 = models.ImageField(
        upload_to="properties/images/",
        blank=False,
        null=False,
    )
    image3 = models.ImageField(upload_to="properties/images/", blank=True, null=True)
    # Property images

    # Number of stars (rating)
    number_of_stars = models.PositiveIntegerField(
        choices=[(i, i) for i in range(1, 6)], default=3
    )
    # Link to the owner (One-to-many relationship)
    owner = models.ForeignKey(
        OwnerProfile, on_delete=models.CASCADE, related_name="properties", default="1"
    )

    # Property details (rooms, utilities, etc.)
    number_of_bedrooms = models.PositiveIntegerField()
    number_of_living_rooms = models.PositiveIntegerField()
    number_of_bathrooms = models.PositiveIntegerField()
    number_of_dining_rooms = models.PositiveIntegerField()
    max_number_guests = models.PositiveIntegerField(default=4)
    wifi_speed = models.CharField(max_length=100, blank=True, null=True)
    number_of_refrigerators = models.PositiveIntegerField()
    number_of_tvs = models.PositiveIntegerField()

    class Meta:
        verbose_name = "Property"  # Singular name in admin
        verbose_name_plural = "Properties"  # Plural name in admin

    def __str__(self):
        return f"{self.name} - {self.property_type.capitalize()} - {self.get_furnishing_type_display()}"

    def is_available_on(self, start_date, end_date):
        """
        Checks if the property is available between the given start and end dates.
        It checks both booked dates and unavailable dates marked by the owner.
        """
        # Check if the property is marked as unavailable (either by owner or a booking)
        unavailable_dates = PropertyUnavailableDate.objects.filter(
            property=self, date__range=[start_date, end_date]
        )
        booked_dates = Booking.objects.filter(
            property=self, date__range=[start_date, end_date]
        )

        if unavailable_dates.exists() or booked_dates.exists():
            return False
        return True


class PropertyUnavailableDate(models.Model):
    """
    Model to store the unavailable date ranges for a property set by the owner.
    This allows each property to have its own set of unavailable date ranges.
    """
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.property.name} - From {self.start_date} to {self.end_date}"

    def is_within_range(self, date):
        """Helper method to check if a date falls within the unavailable range."""
        return self.start_date <= date <= self.end_date


class Booking(models.Model):
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="bookings"
    )
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=[("Confirmed", "Confirmed"), ("Cancelled", "Cancelled")],
        default="Confirmed",
    )

    def __str__(self):
        return f"Booking for {self.property.name}"

    def save(self, *args, **kwargs):
        """
        """
        super().save(*args, **kwargs)
     
class Review(models.Model):
    property = models.ForeignKey(
        Property, 
        on_delete=models.CASCADE, 
        related_name='reviews',
        null=True,  # Rendre nullable si la critique peut être pour Lodgini
        blank=True
    )  # Clé étrangère vers Property (le bien à reviewer)
    user = models.ForeignKey(
        UserProfile, 
        on_delete=models.CASCADE, 
        related_name='reviews'
    )  # Clé étrangère vers User (l'utilisateur qui fait la review)
    review = models.TextField()  # Champ pour le contenu de la review
    created_at = models.DateTimeField(auto_now_add=True)
    about_lodgini = models.BooleanField(default=False)
    stars = models.IntegerField(
        default=1,
        choices=[(i, f"{i} Star{'s' if i > 1 else ''}") for i in range(1, 6)])  # Date de création

    def __str__(self):
        if not self.about_lodgini:
            return f"Review by {self.user.name} for {self.property.name}"
        else:
            return f"Review by {self.user.name} about lodgini"