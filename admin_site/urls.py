from django.urls import path
from .views import *

urlpatterns = [
    path("criar-pagina/", criar_pagina, name="criar_pagina"),
    path("paginas/", listar_paginas, name="listar_paginas"),
    path("pagina/<int:pagina_id>/menus-laterais/", adicionar_menu_lateral, name="adicionar_menu_lateral"),
    path("criar-menu-principal/", criar_menu_principal, name="criar_menu_principal"),
    path("menus-principais/", listar_menus_principais, name="listar_menus_principais"),
]
