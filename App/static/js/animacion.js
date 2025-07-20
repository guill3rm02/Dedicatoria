// Variables globales
let primeraReproduccion = true;
let primerMensajeMusica = true;
const audioPlayer = document.querySelector('audio');
const galeria = document.getElementById('galeria');

// Función para mostrar fotos con animación secuencial
function mostrarFotosSecuencialmente() {
    const fotos = document.querySelectorAll('.gallery-card');
    let delay = 600;
    
    fotos.forEach((foto, index) => {
        setTimeout(() => {
            foto.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            foto.style.opacity = '1';
            foto.style.transform = 'translateY(0)';
            
            if ((index + 1) % 3 === 0) {
                crearConfeti({ y: 0.6 }, 50, 50, ['#ff6b81', '#33aad6']);
            }
        }, delay);
        delay += 1200;
    });
}


// Función para crear efectos de confeti
function crearConfeti(origin, particleCount, spread, colors) {
    confetti({
        particleCount: particleCount || 100,
        spread: spread || 70,
        origin: origin || { y: 0.6 },
        colors: colors || ['#ff6b81', '#ffb8c6', '#ff4757', '#ff8e9e', '#d63384']
    });
}

// Controlador del reproductor de audio
function configurarReproductorAudio() {
    audioPlayer.addEventListener('play', function() {
        galeria.style.display = 'block';
        
        // Mensaje de las fotos (solo primera vez)
        if (primeraReproduccion) {
            const mensajeFotos = document.createElement('div');
            mensajeFotos.id = 'mensaje-romantico';
            mensajeFotos.innerHTML = `
                <div class="text-center mb-4" style="animation: fadeIn 1s forwards;">
                    <p class="dancing-script" style="color: #ff6b81; font-size: 1.3rem;">
                        Cada foto es un recuerdo especial de nuestro amor...
                    </p>
                </div>
            `;
            galeria.insertBefore(mensajeFotos, galeria.firstChild.nextSibling);
            primeraReproduccion = false;
        }
        
        // Mensaje de la música (solo primera vez)
        if (primerMensajeMusica) {
            const mensajeMusica = document.createElement('div');
            mensajeMusica.innerHTML = `
                <div class="text-center mb-4" style="animation: fadeIn 1s forwards;">
                    <p style="color: #33aad6; font-style: italic;">
                        Disfruta de estos momentos mientras escuchas nuestra melodía...
                    </p>
                </div>
            `;
            document.getElementById('galeria').prepend(mensajeMusica);
            primerMensajeMusica = false;
        }
        
        setTimeout(mostrarFotosSecuencialmente, 2000);
    });
    
    audioPlayer.addEventListener('ended', function() {
        document.querySelectorAll('.gallery-card').forEach(foto => {
            foto.style.opacity = '0';
            foto.style.transform = 'translateY(20px)';
        });
    });
}

// Configuración de mensajes secretos
function configurarMensajesSecretos() {
    const messages = document.querySelectorAll('.secret-message');
    
    messages.forEach(message => {
        message.addEventListener('click', function(e) {
            this.classList.toggle('flipped');
            if (this.classList.contains('flipped')) {
                crearConfetiEffect(e.currentTarget);
            }
        });
        
        if (window.innerWidth > 768) {
            message.addEventListener('mouseenter', function() {
                this.classList.add('flipped');
                crearConfetiEffect(this);
            });
            
            message.addEventListener('mouseleave', function() {
                this.classList.remove('flipped');
            });
        }
    });
    
    function crearConfetiEffect(element) {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = Math.random() * 100 + '%';
                confetti.style.backgroundColor = getRandomColor();
                confetti.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                element.appendChild(confetti);
                
                const animation = confetti.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration: 1000 + Math.random() * 1000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
                });
                
                animation.onfinish = () => confetti.remove();
            }, i * 100);
        }
    }
    
    function getRandomColor() {
        const colors = ['#ff6b81', '#ffb8c6', '#ff4757', '#ff8e9e', '#d63384'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Contador de tiempo juntos
function calcularTiempoJuntos() {
    const fechaInicio = new Date('2021-03-08');
    const fechaActual = new Date();
    
    let años = fechaActual.getFullYear() - fechaInicio.getFullYear();
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    
    if (mesActual < 2 || (mesActual === 2 && diaActual < 8)) {
        años--;
    }
    
    let meses;
    if (mesActual > 2 || (mesActual === 2 && diaActual >= 8)) {
        meses = mesActual - 2;
    } else {
        meses = 12 - (2 - mesActual);
    }
    
    let dias = diaActual - 8;
    if (dias < 0) {
        const ultimoDiaMesAnterior = new Date(
            fechaActual.getFullYear(),
            fechaActual.getMonth(),
            0
        ).getDate();
        dias = ultimoDiaMesAnterior - 8 + diaActual;
        meses--;
    }
    
    document.getElementById('tiempo-juntos').innerHTML = `
        <span class="counter-number">${años}</span> años, 
        <span class="counter-number">${meses}</span> meses y 
        <span class="counter-number">${dias}</span> días
    `;
}

// Gestión de fotos
function configurarGestionFotos() {
    const btnMostrar = document.getElementById('mostrar-form-foto');
    const formFoto = document.getElementById('form-agregar-foto');
    const btnOcultar = document.getElementById('ocultar-form-foto');

    if (btnMostrar && formFoto) {
        btnMostrar.addEventListener('click', function() {
            formFoto.style.display = 'block';
            btnMostrar.style.display = 'none';
        });
    }
    
    if (btnOcultar && formFoto && btnMostrar) {
        btnOcultar.addEventListener('click', function() {
            formFoto.style.display = 'none';
            btnMostrar.style.display = 'inline-block';
        });
    }
}

function eliminarFoto(event, id, url) {
    event.stopPropagation();
    if (confirm('¿Estás seguro de querer eliminar esta foto?')) {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': '{{ csrf_token }}',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                alert('Error al eliminar la foto');
            }
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Efecto inicial de confeti
    crearConfeti();
    
    // Configurar componentes
    configurarReproductorAudio();
    configurarMensajesSecretos();
    configurarGestionFotos();
    
    // Lightbox para galería
    GLightbox({ selector: '.glightbox' });
    
    // Contador de tiempo
    calcularTiempoJuntos();
    setInterval(calcularTiempoJuntos, 86400000);
});


/* // Efecto de mensajes que aparecen secuencialmente
const messages = [
    "Eres mi persona favorita en el mundo",
    "No puedo esperar para verte de nuevo",
    "Te amo más que a nada"
];

let current = 0;
function showMessage() {
    document.querySelector('.message').textContent = messages[current];
    current = (current + 1) % messages.length;
    setTimeout(showMessage, 3000);
}
showMessage(); */