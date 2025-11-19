from django.shortcuts import render, get_object_or_404
from .models import *

def home(request):
    menus_principais = MenuPrincipal.objects.all()
    context= {
        "menus_principais": menus_principais,
    }
    return render(request, "home.html", context)

def pagina(request, slug):
    pagina_obj = get_object_or_404(Pagina, slug=slug)
    menus_principais = MenuPrincipal.objects.all()
    menus_laterais = pagina_obj.menus_laterais.all()

    context= {
        "pagina": pagina_obj,
        "menus_principais": menus_principais,
        "menus_laterais": menus_laterais
    }

    return render(request, "pagina.html", context)
