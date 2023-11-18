document.addEventListener("DOMContentLoaded", () => {
  // variables menu responsive
  const navegacion = document.querySelector("#navegacion");
  const menu_responsive = document.querySelector("#header__responsive");
  const menu__boton = document.querySelector("#header__btn");
  // variables validacion formulario
  const formulario = document.getElementById("miFormulario");
  const nombreInput = document.getElementById("nombreInput");
  const emailInput = document.getElementById("emailInput");
  const mensajeInput = document.getElementById("mensajeInput");
  const mensajeResultado = document.getElementById("mensajeResultado");

  // Funcion para desaparecer el menu en ciertos pixeles
  const posicionDesaparicion = 600;
  function gestionarScroll() {
    const posicionScroll = window.scrollY || window.pageYOffset;
    if (posicionScroll >= posicionDesaparicion) {
      menu__boton.style.display = "none";
    } else {
      menu__boton.style.display = "flex";
    }
  }
  window.addEventListener("scroll", gestionarScroll);

  // Agrega transicion al menu (al abrir y al cerrar)
  menu__boton.addEventListener("click", () => {
    navegacion.style.transition = "display 0.3s ease-in-out";
    navegacion.style.display =
      navegacion.style.display === "none" || navegacion.style.display === ""
        ? "flex"
        : "none";
    menu_responsive.style.transition = "background 0.3s ease-in-out";
    menu_responsive.style.background =
      navegacion.style.display === "none" ? "transparent" : "#f2f2f2";

    menu__boton.style.transition = "transform 0.3s ease-in-out";
    menu__boton.classList.toggle("bx-menu-alt-right");
    menu__boton.classList.toggle("bx-x");
  });
  document.addEventListener("click", (e) => {
    if (
      navegacion.style.display === "flex" &&
      !navegacion.contains(e.target) &&
      e.target !== menu__boton
    ) {
      navegacion.style.display = "none";
      menu_responsive.style.background = "transparent";
      menu__boton.classList.remove("bx-x");
      menu__boton.classList.add("bx-menu-alt-right");
    }
  });

  // Función para cerrar el menú
  function cerrarMenu() {
    navegacion.style.display = "none";
    menu_responsive.style.background = "transparent";
    menu__boton.classList.remove("bx-x");
    menu__boton.classList.add("bx-menu-alt-right");
  }
  const enlacesMenu = document.querySelectorAll(".navegacion__enlace");
  enlacesMenu.forEach((enlace, index) => {
    enlace.addEventListener("click", function (e) {
      if (index === enlacesMenu.length - 1) {
        return false;
      }
      cerrarMenu();
    });
  });

  // Validacion formulario
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      nombreInput.value.trim() === "" ||
      emailInput.value.trim() === "" ||
      mensajeInput.value.trim() === ""
    ) {
      mostrarMensaje("Por favor, complete todos los campos.", "error");
    } else {
      mostrarMensaje("¡Formulario enviado con éxito!", "exito");
    }
  });

  function mostrarMensaje(mensaje, tipo) {
    mensajeResultado.textContent = mensaje;
    mensajeResultado.className = tipo;

    setTimeout(function () {
      mensajeResultado.textContent = "";
      mensajeResultado.className = "";
    }, 5000);
  }
});
