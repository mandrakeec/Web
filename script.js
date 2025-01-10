document.addEventListener('DOMContentLoaded', () => {
  // Recuperar requerimientos almacenados en localStorage
  const requerimientos = JSON.parse(localStorage.getItem('requerimientos')) || [];

  // Simulando usuarios registrados
  const usuarios = [
    { usuario: 'soporte', clave: 'soporte' },
    { usuario: 'admin', clave: 'admin123' },
  ];

  // Formulario de login
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Validar credenciales
      const user = usuarios.find(
        (u) => u.usuario === username && u.clave === password
      );

      if (user) {
        // Redirigir al dashboard si las credenciales son correctas
        window.location.href = 'dashboard.html';
      } else {
        loginError.textContent = 'Usuario o clave incorrectos';
      }
    });
  }

  // Formulario de registro de requerimientos
  const requerimientoForm = document.getElementById('requerimientoForm');

  if (requerimientoForm) {
    requerimientoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Crear un nuevo requerimiento con los datos del formulario
      const nuevoRequerimiento = {
        usuario: document.getElementById('usuario').value,
        departamento: document.getElementById('departamento').value,
        turno: document.getElementById('turno').value,
        tecnico: document.getElementById('tecnico').value,
        medio: document.getElementById('medio').value,
        fechaInicio: document.getElementById('fechaInicio').value,
        fechaFin: document.getElementById('fechaFin').value,
        ubicacion: document.getElementById('ubicacion').value,
        problema: document.getElementById('problema').value,
        solucion: document.getElementById('solucion').value,
        tipoProblema: document.getElementById('tipoProblema').value,
        id: Date.now(),
      };

      // Validar los campos obligatorios
      if (!nuevoRequerimiento.usuario || !nuevoRequerimiento.problema || !nuevoRequerimiento.fechaInicio) {
        alert('Por favor, completa los campos obligatorios.');
        return;
      }

      // Guardar el nuevo requerimiento en localStorage
      requerimientos.push(nuevoRequerimiento);
      localStorage.setItem('requerimientos', JSON.stringify(requerimientos));

      alert('Requerimiento registrado con éxito.');
      requerimientoForm.reset();
      actualizarTabla(); // Actualizar la tabla inmediatamente después del registro
    });
  }

  // Cargar los requerimientos registrados en la tabla
  const requerimientosTableBody = document.getElementById('requerimientosTableBody');

  if (requerimientosTableBody) {
    actualizarTabla();
  }

  // Función para cargar los datos en la tabla
  function actualizarTabla() {
    requerimientosTableBody.innerHTML = ''; // Limpiar la tabla

    if (requerimientos.length === 0) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 12;
      cell.textContent = 'No hay requerimientos registrados.';
      cell.style.textAlign = 'center';
      row.appendChild(cell);
      requerimientosTableBody.appendChild(row);
      return;
    }

    requerimientos.forEach((req) => {
      const row = document.createElement('tr');

      // Mostrar los datos en columnas
      Object.keys(req).forEach((key) => {
        if (key !== 'id') { // No mostrar el ID en la tabla
          const cell = document.createElement('td');
          cell.textContent = req[key] || 'N/A';
          row.appendChild(cell);
        }
      });

      // Botón de eliminar para cada registro
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.className = 'delete-btn';
      deleteButton.addEventListener('click', () => {
        const index = requerimientos.findIndex((r) => r.id === req.id);
        if (index !== -1) {
          requerimientos.splice(index, 1);
          localStorage.setItem('requerimientos', JSON.stringify(requerimientos));
          actualizarTabla();
          alert('Requerimiento eliminado con éxito.');
        }
      });
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);

      requerimientosTableBody.appendChild(row);
    });
  }

  // Botón para eliminar todos los requerimientos
  const clearButton = document.getElementById('vaciarRegistros');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas eliminar todos los requerimientos?')) {
        localStorage.removeItem('requerimientos');
        requerimientos.length = 0; // Limpiar el array
        actualizarTabla();
        alert('Todos los requerimientos han sido eliminados.');
      }
    });
  }
});
