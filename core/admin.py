from django.contrib import admin
from .models import MenuPrincipal, Pagina, MenuLateral

@admin.register(MenuPrincipal)
class MenuPrincipalAdmin(admin.ModelAdmin):
    list_display = ("nome", "ordem")
    prepopulated_fields = {"slug": ("nome",)}


class MenuLateralInline(admin.TabularInline):
    model = MenuLateral
    extra = 1
    prepopulated_fields = {"slug": ("nome",)}


@admin.register(Pagina)
class PaginaAdmin(admin.ModelAdmin):
    list_display = ("titulo", "menu_principal")
    prepopulated_fields = {"slug": ("titulo",)}
    inlines = [MenuLateralInline]


admin.site.register(MenuLateral)
