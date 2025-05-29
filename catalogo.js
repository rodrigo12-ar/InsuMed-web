let productosData = [];
let productosSeleccionados = [];

async function cargarProductos() {
  try {
    const response = await fetch('productos.json');
    productosData = await response.json();
    renderizarProductos(productosData);
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

function renderizarProductos(productos) {
  const contenedor = document.getElementById("productos-container");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "card-producto";

    const isChecked = productosSeleccionados.includes(producto.nombre);

    card.innerHTML = `
      <input type="checkbox" class="checkbox-producto" 
             onchange="toggleSeleccion('${producto.nombre}', this.checked)" 
             ${isChecked ? "checked" : ""}>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p class="descripcion">${producto.descripcion}</p>
      <p class="precio">$${producto.precio.toLocaleString()}</p>
    `;

    contenedor.appendChild(card);
  });

  actualizarResumenPedido();
}

function toggleSeleccion(nombre, estaSeleccionado) {
  if (estaSeleccionado) {
    productosSeleccionados.push(nombre);
  } else {
    productosSeleccionados = productosSeleccionados.filter(p => p !== nombre);
  }
  actualizarResumenPedido();
}

function actualizarResumenPedido() {
  const resumen = document.getElementById("resumen-pedido");
  if (!resumen) return;

  if (productosSeleccionados.length === 0) {
    resumen.innerHTML = "<p>No hay productos seleccionados.</p>";
  } else {
    resumen.innerHTML = `
      <p><strong>${productosSeleccionados.length}</strong> productos seleccionados</p>
      <button onclick="enviarPedidoWhatsApp()">Enviar pedido por WhatsApp</button>
    `;
  }
}

function enviarPedidoWhatsApp() {
  const empresaInput = document.getElementById("empresa");
  const empresa = empresaInput.value.trim();

  if (!empresa) {
    alert("Por favor ingresá el nombre de tu empresa antes de enviar el pedido.");
    empresaInput.focus();
    return;
  }

  if (productosSeleccionados.length === 0) {
    alert("No hay productos seleccionados.");
    return;
  }

  const mensaje = encodeURIComponent(
    `Hola, soy de ${empresa}, quiero hacer un pedido:\n\n` +
    productosSeleccionados.map((p, i) => `${i + 1}. ${p}`).join("\n")
  );

  window.open(`https://wa.me/542645072923?text=${mensaje}`, '_blank');
}

document.getElementById("buscador")?.addEventListener("input", filtrar);
document.getElementById("filtro-categoria")?.addEventListener("change", filtrar);

function filtrar() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const categoria = document.getElementById("filtro-categoria").value;

  const filtrados = productosData.filter(producto => {
    const coincideTexto = producto.nombre.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "todos" || producto.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  renderizarProductos(filtrados);
}

cargarProductos();

