from django.contrib import admin
from django.utils.html import format_html
from .models import User, Photo


class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 1  # Nombre de champs de photo vides pour en ajouter
    readonly_fields = ('image_tag',)  # Affiche une prévisualisation des images

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 100px; width: auto;" />', obj.image.url)
        return "Pas d'image"
    image_tag.short_description = "Aperçu"


class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'age')
    inlines = [PhotoInline]  # Ajoute les photos dans l'admin des utilisateurs


admin.site.register(User, UserAdmin)
admin.site.register(Photo)

