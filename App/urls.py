from django.urls import path 
from .import views
from .views import agregar_foto, GaleriaView

urlpatterns = [
    path('', views.iniciar, name='iniciar'),
    path('inicio/', views.inicio, name='inicio'),  # Vista función básica
    path('galeria/', GaleriaView.as_view(), name='galeria'),  # Nueva URL para la vista clase
    path('agregar-foto/', agregar_foto, name='agregar_foto'),
    path('eliminar-foto/<int:id>/', views.eliminar_foto, name='eliminar_foto'),
    path('cerrar/',views.cerrar_sesion,name="cerrar"),
]

    