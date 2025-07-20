from django import forms
from .models import FotoGaleria

class FotoGaleriaForm(forms.ModelForm):
    class Meta:
        model = FotoGaleria
        fields = ['imagen']  # Solo el campo de imagen

