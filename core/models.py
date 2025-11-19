from django.db import models
from django.urls import reverse
from django.utils.text import slugify

def gerar_slug_unico(modelo, texto):
    base_slug = slugify(texto)
    slug = base_slug
    contador = 1

    while modelo.objects.filter(slug=slug).exists():
        slug = f"{base_slug}-{contador}"
        contador += 1

    return slug


class MenuPrincipal(models.Model):
    nome = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    ordem = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["ordem"]

    def __str__(self):
        return self.nome

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = gerar_slug_unico(MenuPrincipal, self.nome)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        pagina = Pagina.objects.filter(menu_principal=self).first()
        if pagina:
            return pagina.get_absolute_url()
        return "/"


class Pagina(models.Model):
    titulo = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    menu_principal = models.ForeignKey(
        MenuPrincipal,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    conteudo_html = models.TextField()

    def __str__(self):
        return self.titulo

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = gerar_slug_unico(Pagina, self.titulo)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("pagina", args=[self.slug])


class MenuLateral(models.Model):
    pagina = models.ForeignKey(
        Pagina,
        on_delete=models.CASCADE,
        related_name="menus_laterais"
    )
    nome = models.CharField(max_length=100)
    slug = models.SlugField(blank=True)
    ordem = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["ordem"]

    def __str__(self):
        return f"{self.pagina.titulo} → {self.nome}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = gerar_slug_unico(MenuLateral, self.nome)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("pagina", args=[self.slug])
