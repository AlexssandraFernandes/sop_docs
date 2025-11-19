from django.contrib.auth.views import LogoutView
from django.contrib import admin
from django.urls import path, include
from core.views import *
from admin_site.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"),
    path('', include('core.urls')),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('painel/', include('admin_site.urls')),
]
