// ===== ESTADO =====
// Toda la información que cambia vive en este objeto.
const estado = {
  indice: 0,               // Posición de la tarjeta actual
  mostrarRespuesta: false, // Si la respuesta está visible u oculta
};

// ===== REFERENCIAS AL DOM =====
// Se buscan una sola vez para no repetir document.getElementById
const elementos = {
  relleno: document.getElementById("progresoRelleno"),
  porcentaje: document.getElementById("progresoPorcentaje"),
  contador: document.getElementById("progresoContador"),
  pregunta: document.getElementById("tarjetaPregunta"),
  respuesta: document.getElementById("tarjetaRespuesta"),
  botonAnterior: document.getElementById("botonAnterior"),
  botonVoltear: document.getElementById("botonVoltear"),
  botonSiguiente: document.getElementById("botonSiguiente"),
};

// ===== RENDERIZADO =====
// Lee el estado y actualiza la pantalla. Se llama cada vez que el estado cambia.
function dibujar() {
  const total = tarjetas.length;
  const tarjeta = tarjetas[estado.indice];
  const porcentaje = Math.round(((estado.indice + 1) / total) * 100);

  // Barra de progreso (ej.: 5 de 20 = 25%)
  elementos.relleno.style.width = porcentaje + "%";
  elementos.porcentaje.textContent = porcentaje + "%";
  elementos.porcentaje.style.left = "calc(" + porcentaje + "% + 10px)"; // El texto acompaña al relleno
  elementos.contador.textContent = (estado.indice + 1) + " de " + total;

  // Contenido de la tarjeta
  elementos.pregunta.textContent = tarjeta.pregunta;
  elementos.respuesta.textContent = tarjeta.respuesta;

  // Se muestra la pregunta o la respuesta con la clase "oculto"
  elementos.pregunta.classList.toggle("oculto", estado.mostrarRespuesta);
  elementos.respuesta.classList.toggle("oculto", !estado.mostrarRespuesta);

  // Texto del botón central según el estado
  elementos.botonVoltear.textContent = estado.mostrarRespuesta ? "Ocultar respuesta" : "Mostrar respuesta";
}

// ===== ACCIONES =====
// Avanza a la siguiente tarjeta; al llegar al final vuelve a la primera
function siguiente() {
  estado.indice = (estado.indice + 1) % tarjetas.length;
  estado.mostrarRespuesta = false; // La nueva tarjeta inicia con la pregunta
  dibujar();
}

// Retrocede; desde la primera salta a la última
function anterior() {
  estado.indice = (estado.indice - 1 + tarjetas.length) % tarjetas.length;
  estado.mostrarRespuesta = false;
  dibujar();
}

// Alterna entre mostrar y ocultar la respuesta
function voltear() {
  estado.mostrarRespuesta = !estado.mostrarRespuesta;
  dibujar();
}

// ===== EVENTOS =====
elementos.botonSiguiente.addEventListener("click", siguiente);
elementos.botonAnterior.addEventListener("click", anterior);
elementos.botonVoltear.addEventListener("click", voltear);

// Atajos de teclado: flechas para navegar y Espacio/Enter para voltear
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") siguiente();
  if (e.key === "ArrowLeft") anterior();
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault(); // Evita que el botón enfocado se active dos veces
    voltear();
  }
});

// Primer dibujo al cargar la página
dibujar();