from django.contrib import admin
from django.urls import path
from accounts.views import user_login
from rooms.views import room_list
from bookings.views import create_booking
from payments.views import make_payment
from reports.views import dashboard

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', room_list, name='room_list'),
    path('login/', user_login, name='login'),
    path('book/<int:room_id>/', create_booking, name='create_booking'),
    path('payment/<int:booking_id>/', make_payment, name='payment'),
    path('dashboard/', dashboard, name='dashboard'),
]