from django.db import models
import os
# Create your models here.


def ruta_imagen_galeria( intsance,filename):
    return f'galeria/{filename}'

class FotoGaleria(models.Model):
    imagen = models.ImageField(
        upload_to=ruta_imagen_galeria,
        verbose_name="Imagen"
    )
    fecha_subida = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Foto de Galería"
        verbose_name_plural = "Fotos de Galería"
        ordering = ['-fecha_subida']

    def delete(self, *args, **kwargs):
        """Elimina el archivo físico cuando se borra el modelo"""
        if self.imagen and os.path.exists(self.imagen.path):
            os.remove(self.imagen.path)
        super().delete(*args, **kwargs)


