document.addEventListener('DOMContentLoaded', () => {
  const itemForm = document.getElementById('itemForm');
  const itemIdInput = document.getElementById('itemId');
  const nombreInput = document.getElementById('nombre');
  const descripcionInput = document.getElementById('descripcion');
  const cancelEditBtn = document.getElementById('cancelEdit');
  const itemList = document.getElementById('itemList');
  const searchInput = document.getElementById('search');

  // Cargar items al inicio
  fetchTipos();

  // Agregar o actualizar item
  itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const item = {
      nombre: nombreInput.value,
      descripcion: descripcionInput.value,
    };

    if (itemIdInput.value) {
      // Actualizar
      await fetch(`/api/items/${itemIdInput.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      resetForm();
    } else {
      // Agregar
      await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      resetForm();
    }
    fetchTipos();
  });

  // Cancelar edición
  cancelEditBtn.addEventListener('click', resetForm);

  // Buscar items
  searchInput.addEventListener('input', fetchTipos);

  // Obtener y mostrar items
  async function fetchTipos() {
    const searchTerm = searchInput.value.toLowerCase();
    const response = await fetch('/api/items');
    const items = await response.json();
    itemList.innerHTML = '';

    items
      .filter(item => item.nombre.toLowerCase().includes(searchTerm))
      .forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${item.nombre} - ${item.descripcion} 
          (Creado: ${new Date(item.fechaCreacion).toLocaleDateString()})
          <div>
            <button onclick="editItem('${item._id}', '${item.nombre}', '${item.descripcion}')">Editar</button>
            <button class="delete" onclick="deleteItem('${item._id}')">Borrar</button>
          </div>
        `;
        itemList.appendChild(li);
      });
  }

  // Editar item
  window.editItem = (id, nombre, descripcion) => {
    itemIdInput.value = id;
    nombreInput.value = nombre;
    descripcionInput.value = descripcion;
    cancelEditBtn.style.display = 'inline';
    itemForm.querySelector('button[type="submit"]').textContent = 'Actualizar';
  };

  // Borrar item
  window.deleteItem = async (id) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    fetchTipos();
  };

  // Resetear formulario
  function resetForm() {
    itemForm.reset();
    itemIdInput.value = '';
    cancelEditBtn.style.display = 'none';
    itemForm.querySelector('button[type="submit"]').textContent = 'Guardar';
  }
});