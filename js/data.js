document.addEventListener("DOMContentLoaded", function () {
  // Ruta del archivo JSON
  const rutaJson = "../data/base_datos.json";

  // Elementos del DOM
  const contenedorInstrumentos = document.getElementById(
    "productos__contenedor"
  );
  const selectCategorias = document.getElementById("categorias");

  const elemento__producto = document.querySelector(".elemento__producto");
  const elemento__precio = document.querySelector(".elemento__precio");
  // Función para cargar y renderizar instrumentos
  function renderizarInstrumentos(instrumentos) {
    // Limpiar el contenedor antes de agregar nuevos elementos
    contenedorInstrumentos.innerHTML = "";

    instrumentos.forEach((instrumento) => {
      const elementoInstrumento = document.createElement("div");
      elementoInstrumento.classList.add("producto");

      // Crear el HTML para cada instrumento
      elementoInstrumento.innerHTML = `
        <img class="producto__imagen" src="${instrumento.imagen}" alt="imagen ${instrumento.marca} ${instrumento.modelo}">
        <div class="producto__contenido">
          <h3 class="producto__nombre">${instrumento.marca} ${instrumento.modelo}</h3>
          <p class="producto__descripcion">${instrumento.descripcion}</p>
          <p class="producto__precio">${instrumento.precio}</p>
          <a class="producto__enlace agregar-carrito" data-id="${instrumento.id}">Agregar al Carrito</a>
        </div>
      `;

      // Agregar el elemento al contenedor
      contenedorInstrumentos.appendChild(elementoInstrumento);
    });
  }
  // Función para cargar y renderizar productos según la categoría seleccionada
  function cargarYRenderizarProductos(categoria) {
    fetch(rutaJson)
      .then((response) => response.json())
      .then((data) => {
        let instrumentos = [];

        // Filtrar instrumentos según la categoría seleccionada
        if (categoria === "guitarrasElectricas") {
          instrumentos = data.guitarrasElectricas;
        } else if (categoria === "guitarrasClasicas") {
          instrumentos = data.guitarrasClasicas;
        } else if (categoria === "baterias") {
          instrumentos = data.baterias;
        } else {
          // Si la categoría seleccionada es "Todos", mostrar todos los productos
          instrumentos = [
            ...data.guitarrasElectricas,
            ...data.guitarrasClasicas,
            ...data.baterias,
          ];
        }

        // Llamar a la función para renderizar los instrumentos
        renderizarInstrumentos(instrumentos);
      })
      .catch((error) =>
        console.error("Error al cargar y renderizar productos", error)
      );
  }

  // Cargar y renderizar todos los productos al principio
  cargarYRenderizarProductos("todos");

  // Manejar cambios en el select
  selectCategorias.addEventListener("change", function () {
    // Obtener el valor seleccionado
    const categoriaSeleccionada = selectCategorias.value;

    // Cargar y renderizar productos según la categoría seleccionada
    cargarYRenderizarProductos(categoriaSeleccionada);
  });
});
