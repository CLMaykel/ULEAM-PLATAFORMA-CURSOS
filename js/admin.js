// CAMBIO DE VISTAS ADMINISTRADOR
function showAdminSection(secId) {
  document.getElementById('admin-sec-overview').classList.add('hidden');
  document.getElementById('admin-sec-crear-curso').classList.add('hidden');
  document.getElementById(`admin-sec-${secId}`).classList.remove('hidden');
}

// CREACIÓN DE CURSO Y ASIGNACIÓN DE PROFESOR/CUPO
function addCourseByAdmin() {
  const name = document.getElementById('admin-course-name').value;
  const teacher = document.getElementById('admin-course-teacher').value;
  const limit = document.getElementById('admin-course-limit').value;

  const tbody = document.getElementById('admin-courses-tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${name}</td>
    <td>${teacher}</td>
    <td>${limit} Est.</td>
    <td><span class="badge-status">Activo</span></td>
  `;
  tbody.prepend(tr);

  alert(`✔ Curso "${name}" creado con éxito. Profesor asignado: ${teacher}. Cupo: ${limit} estudiantes.`);
  
  let count = parseInt(document.getElementById('admin-courses-count').innerText);
  document.getElementById('admin-courses-count').innerText = count + 1;

  document.getElementById('admin-course-name').value = '';
  document.getElementById('admin-course-desc').value = '';
}