from django.contrib import admin
from django.utils.html import format_html
from .models import User, Photo


class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 1  # Affiche un champ vide pour ajouter une photo
    readonly_fields = ('image_tag',)  # Affiche uniquement la prévisualisation

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 100px; width: auto;" />', obj.image.url)
        return "Pas d'image"
    image_tag.short_description = "Aperçu"

    # Autorise l'ajout et la suppression de photos, mais pas la modification des images existantes
    def has_change_permission(self, request, obj=None):
        return False  # Désactive la modification des images existantes


class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'age')
    inlines = [PhotoInline]  # Ajoute les photos dans l'admin des utilisateurs


admin.site.register(User, UserAdmin)
admin.site.register(Photo)
