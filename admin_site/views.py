from django.shortcuts import render, redirect, get_object_or_404
from django.utils.text import slugify
from django.contrib import messages
from django.db.models import Q
from core.models import *

def criar_pagina(request):
    menus = MenuPrincipal.objects.all()

    if request.method == "POST":
        titulo = request.POST.get("titulo")
        conteudo = request.POST.get("conteudo")
        menu_id = request.POST.get("menu_principal")

        if not titulo or not conteudo:
            messages.error(request, "Preencha todos os campos.")
            return redirect("criar_pagina")

        base_slug = slugify(titulo)
        slug = base_slug
        contador = 1

        while Pagina.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{contador}"
            contador += 1

        menu_principal = MenuPrincipal.objects.filter(id=menu_id).first()

        Pagina.objects.create(
            titulo=titulo,
            slug=slug,
            conteudo_html=conteudo,
            menu_principal=menu_principal
        )

        messages.success(request, "Página criada com sucesso!")
        return redirect("criar_pagina")

    return render(request, "criar_pagina.html", {"menus": menus})


def adicionar_menu_lateral(request, pagina_id):
    pagina = get_object_or_404(Pagina, id=pagina_id)

    if request.method == "POST":
        nome = request.POST.get("nome")
        ordem = request.POST.get("ordem") or 0

        if not nome:
            messages.error(request, "O nome do item é obrigatório.")
            return redirect("adicionar_menu_lateral", pagina_id=pagina.id)

        base_slug = slugify(nome)
        slug = base_slug
        contador = 1

        while MenuLateral.objects.filter(slug=slug, pagina=pagina).exists():
            slug = f"{base_slug}-{contador}"
            contador += 1

        MenuLateral.objects.create(
            pagina=pagina,
            nome=nome,
            slug=slug,
            ordem=ordem,
        )

        messages.success(request, "Item de menu lateral adicionado.")
        return redirect("adicionar_menu_lateral", pagina_id=pagina.id)

    itens = pagina.menus_laterais.all()

    return render(request, "adicionar_menu_lateral.html", {
        "pagina": pagina,
        "itens": itens
    })


def listar_paginas(request):
    titulo = request.GET.get("titulo", "")
    menu_principal_id = request.GET.get("menu_principal", "")
    menu_lateral_id = request.GET.get("menu_lateral", "")

    paginas = Pagina.objects.all()

    # Filtro por título
    if titulo:
        paginas = paginas.filter(titulo__icontains=titulo)

    # Filtro por menu principal
    if menu_principal_id:
        paginas = paginas.filter(menu_principal_id=menu_principal_id)

    # Filtro por menu lateral
    if menu_lateral_id:
        paginas = paginas.filter(menus_laterais__id=menu_lateral_id).distinct()

    menus_principais = MenuPrincipal.objects.all()
    menus_laterais = MenuLateral.objects.all()

    return render(request, "listar_paginas.html", {
        "paginas": paginas,
        "menus_principais": menus_principais,
        "menus_laterais": menus_laterais
    })


def criar_menu_principal(request):

    if request.method == "POST":
        nome = request.POST.get("nome")
        ordem = request.POST.get("ordem") or 0

        if not nome:
            messages.error(request, "O nome do menu é obrigatório.")
            return redirect("criar_menu_principal")

        # Gerar slug único
        slug = gerar_slug_unico(MenuPrincipal, nome)

        MenuPrincipal.objects.create(
            nome=nome,
            slug=slug,
            ordem=ordem,
        )

        messages.success(request, "Menu principal criado com sucesso!")
        return redirect("criar_menu_principal")

    # Listar menus já existentes
    menus = MenuPrincipal.objects.all()

    return render(request, "criar_menu_principal.html", {
        "menus": menus
    })


def listar_menus_principais(request):
    nome = request.GET.get("nome", "")

    menus = MenuPrincipal.objects.all()

    if nome:
        menus = menus.filter(nome__icontains=nome)

    return render(request, "listar_menus_principais.html", {
        "menus": menus,
    })
