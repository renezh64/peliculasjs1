document.addEventListener('DOMContentLoaded', () => {
  const TipoForm = document.getElementById('TipoForm');
  const TipoIdInput = document.getElementById('TipoId');
  const nombreInput = document.getElementById('nombre');
  const descripcionInput = document.getElementById('descripcion');
  const cancelEditBtn = document.getElementById('cancelEdit');
  const TipoList = document.getElementById('TipoList');
  const searchInput = document.getElementById('search');

  // Cargar myTipos al inicio
  fetchTipos();

  // Agregar o actualizar myTipo
  TipoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const myTipo = {
      nombre: nombreInput.value,
      descripcion: descripcionInput.value,
    };

    if (TipoIdInput.value) {
      // Actualizar
      await fetch(`/tipo/${TipoIdInput.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(myTipo),
      });
      resetForm();
    } else {
      // Agregar
      await fetch('tipo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(myTipo),
      });
      resetForm();
    }
    fetchTipos();
  });

  // Cancelar edición
  cancelEditBtn.addEventListener('click', resetForm);

  // Buscar myTipos
  searchInput.addEventListener('input', fetchTipos);

  // Obtener y mostrar myTipos
  async function fetchTipos() {
    const searchTerm = searchInput.value.toLowerCase();
    const response = await fetch('/tipo');
    const myTipo = await response.json();
    TipoList.innerHTML = '';

    myTipo
      .filter(myTipo => myTipo.nombre.toLowerCase().includes(searchTerm))
      .forEach(myTipo => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${myTipo.nombre} - ${myTipo.descripcion} 
          (Creado: ${new Date(myTipo.fechaCreacion).toLocaleDateString()})
          <div>
            <button onclick="editmyTipo('${myTipo._id}', '${myTipo.nombre}', '${myTipo.descripcion}')">Editar</button>
            <button class="delete" onclick="deletemyTipo('${myTipo._id}')">Borrar</button>
          </div>
        `;
        TipoList.appendChild(li);
      });
  }

  // Editar myTipo
  window.editmyTipo = (id, nombre, descripcion) => {
    TipoIdInput.value = id;
    nombreInput.value = nombre;
    descripcionInput.value = descripcion;
    cancelEditBtn.style.display = 'inline';
    myTipoForm.querySelector('button[type="submit"]').textContent = 'Actualizar';
  };

  // Borrar myTipo
  window.deletemyTipo = async (id) => {
    await fetch(`/tipo/${id}`, { method: 'DELETE' });
    fetchTipos();
  };

  // Resetear formulario
  function resetForm() {
    myTipoForm.reset();
    TipoIdInput.value = '';
    cancelEditBtn.style.display = 'none';
    myTipoForm.querySelector('button[type="submit"]').textContent = 'Guardar';
  }
});