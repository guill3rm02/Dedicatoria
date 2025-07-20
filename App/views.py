import os
from urllib import request
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView
from .models import FotoGaleria
from .forms import FotoGaleriaForm
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


# Create your views here.


def base(request):
    return render(request, "base.html")

def iniciar(request):
    if request.method == 'GET':
        return render(request, 'login/login.html')
    else:
        user = authenticate(
            request, 
            username=request.POST["usuario"], 
            password=request.POST["password"]
        )

        if user is None:
            return render(request, 'login/login.html', {
                "error": "Usuario o contraseña incorrecta",
            })
        else:
            login(request, user)
            return redirect('galeria')  # Cambiado a 'galeria'

@login_required
def inicio(request):
    return redirect('galeria')

@login_required
def agregar_foto(request):
    if request.method == 'POST':
        form = FotoGaleriaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
        return redirect('galeria')
    return redirect('galeria')

class GaleriaView(ListView):
    model = FotoGaleria
    template_name = 'secret.html'
    context_object_name = 'fotos'
    ordering = ['-fecha_subida']
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['dancing_script'] = True
        context['form'] = FotoGaleriaForm()  # Agrega el formulario aquí
        return context


@require_http_methods(["DELETE"])
@login_required
def eliminar_foto(request, id):
    try:
        foto = get_object_or_404(FotoGaleria, id=id)
        foto.delete()  # Esto ya maneja la eliminación del archivo físico
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

@login_required
def cerrar_sesion(request):
    logout(request)
    return redirect('iniciar')
    