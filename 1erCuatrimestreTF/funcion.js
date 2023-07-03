// Agregar un evento de clic al botón para mostrar u ocultar el menú desplegable
document.addEventListener("DOMContentLoaded", function () {
  var botonLogin = document.getElementById("botonlogin");
  var dropdownContent = document.querySelector(".menudesplegable");
  botonLogin.addEventListener("click", function () {
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  });
});

function openRegistro() {
  var contenedorRegistro = document.getElementById("contenedorRegistro");
  var contenedorLogin = document.getElementById("contenedorLogin");
  var contenedorLista = document.getElementById("contenedorLista");

  contenedorRegistro.style.display = "block";
  contenedorLogin.style.display = "none";
  contenedorLista.style.display = "none";
}
function openLogin() {
  var contenedorRegistro = document.getElementById("contenedorRegistro");
  var contenedorLogin = document.getElementById("contenedorLogin");
  var contenedorLista = document.getElementById("contenedorLista");

  contenedorRegistro.style.display = "none";
  contenedorLogin.style.display = "block";
  contenedorLista.style.display = "none";
}


const CLAVE_LOCALSTORAGE = "lista_tareas";
document.addEventListener("DOMContentLoaded", () => {
  let tareas = []; // El arreglo global que vamos a manejar
  // Declaración de elementos del DOM
  const $contenedorTareas = document.querySelector("#contenedorTareas"),
    $btnGuardarTarea = document.querySelector("#btnAgregarTarea"),
    $inputNuevaTarea = document.querySelector("#inputNuevaTarea");

  // Escuchar clic del botón para agregar nueva tarea
  $btnGuardarTarea.onclick = () => {
    const tarea = $inputNuevaTarea.value;
    if (!tarea) {
      return;
    }
    tareas.push({
      tarea: tarea,
      terminada: false,
    });
    $inputNuevaTarea.value = "";
    guardarTareasEnAlmacenamiento();
    refrescarListaDeTareas();
  };

  const obtenerTareasDeAlmacenamiento = () => {
    const posibleLista = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE));
    if (posibleLista) {
      return posibleLista;
    } else {
      return [];
    }
  };
  //[]array lista de cosas//

  const guardarTareasEnAlmacenamiento = () => {
    localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(tareas));
  };

  // Definir función que refresca la lista de tareas a partir del arreglo global//
  const refrescarListaDeTareas = () => {
    $contenedorTareas.innerHTML = "";
    for (const [indice, tarea] of tareas.entries()) {
      // Crear el enlace para eliminar la tarea y pregunta si realmente se quiere eliminar cartel de alerta
      const $enlaceParaEliminar = document.createElement("a");
      $enlaceParaEliminar.classList.add("enlace-eliminar");
      $enlaceParaEliminar.innerHTML = "&times;";
      $enlaceParaEliminar.href = "";
      $enlaceParaEliminar.onclick = (evento) => {
        evento.preventDefault();
        if (!confirm("¿Eliminar tarea?")) {
          return;
        }
        tareas.splice(indice, 1);
        // Guardar los cambios
        guardarTareasEnAlmacenamiento(tareas);
        refrescarListaDeTareas();
      };
      // El input para marcar la tarea como terminada tachar tarea
      const $checkbox = document.createElement("input");
      $checkbox.type = "checkbox";
      $checkbox.onchange = function () { // No es una función flecha porque quiero acceder al elemento a través de this
        if (this.checked) {
          tareas[indice].terminada = true;
        } else {
          tareas[indice].terminada = false;
        }
        guardarTareasEnAlmacenamiento(tareas);
        refrescarListaDeTareas();
      }

      // El span que llevará el contenido de la tarea
      const $span = document.createElement("span");
      $span.textContent = tarea.tarea;
      // Y finalmente el elemento de la lista
      const $li = document.createElement("li");
      // Verificamos si la tarea está tildada para tachar los elementos
      if (tarea.terminada) {
        $checkbox.checked = true;
        $span.classList.add("tachado");
      }
      $li.appendChild($checkbox);
      $li.appendChild($span);
      $li.appendChild($enlaceParaEliminar);
      $contenedorTareas.appendChild($li);
    }
  };

  // Llamar a la función la primera vez
  tareas = obtenerTareasDeAlmacenamiento();
  refrescarListaDeTareas();
});
//evento que hace aparecer la lista de tareas en la pag una vez q se clickea en el menu
function openLista() {
  var contenedorLista = document.getElementById("contenedorLista");
  contenedorLista.style.display = "block";
}
// saludo sin usuario y menu desplegable//
function saludaryabrirRegistro() {
  console.log("Hola Usuario, coloca tus datos para poder comenzar")
  var contenedorRegistro = document.getElementById("contenedorRegistro");
  var contenedorLogin = document.getElementById("contenedorLogin");
  var contenedorLista = document.getElementById("contenedorLista");

  contenedorRegistro.style.display = "block";
  contenedorLogin.style.display = "none";
  contenedorLista.style.display = "none";

}
//saludo con usuario//
function registroconsola() {
  let nodoInput = document.getElementById("nombreInput");
  let nombre = nodoInput.value;
  console.log("Buenisimo " + nombre + ", ya realizaste tu registro.");
}



