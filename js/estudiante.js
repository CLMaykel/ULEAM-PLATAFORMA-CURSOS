// BASE DE DATOS DE CURSOS
const COURSES_DATA = [
  { id: 1, title: "Ingeniería de Requisitos", desc: "Captura, especificación y gestión de requisitos de software.", category: "Tecnología", instructor: "Adolfo Meneses", enrolled: true },
  { id: 2, title: "Desarrollo Web", desc: "Construcción de interfaces con HTML, CSS y JavaScript.", category: "Tecnología", instructor: "Adolfo Meneses", enrolled: true },
  { id: 3, title: "Marketing Digital", desc: "Estrategias de posicionamiento en mercados digitales.", category: "Negocios", instructor: "Mariana López", enrolled: false },
  { id: 4, title: "Diseño UI/UX con Figma", desc: "Creación de prototipos e interfaces interactivas.", category: "Diseño", instructor: "Carlos Méndez", enrolled: false }
];

// RENDERIZAR EXPLORAR CURSOS
function renderCatalog() {
  const container = document.getElementById('catalog-container');
  if (!container) return;
  container.innerHTML = '';
  
  COURSES_DATA.forEach(course => {
    const div = document.createElement('div');
    div.className = 'course-card';
    div.innerHTML = `
      <div>
        <span class="badge-tag">${course.category}</span>
        <h3>${course.title}</h3>
        <p>${course.desc}</p>
        <small><strong>Profesor:</strong> ${course.instructor}</small>
      </div>
      <div style="margin-top: 15px;">
        ${course.enrolled 
          ? `<button class="btn btn-outline btn-full" disabled>Ya matriculado</button>` 
          : `<button class="btn btn-secondary btn-full" onclick="enrollCourse(${course.id})">Inscribirme</button>`
        }
      </div>
    `;
    container.appendChild(div);
  });
}

// MATRICULARSE EN CURSO (LÍMITE MÁXIMO DE 3 CURSOS)
function enrollCourse(courseId) {
  const enrolledCount = COURSES_DATA.filter(c => c.enrolled).length;
  if (enrolledCount >= 3) {
    alert("⚠ Límite alcanzado: Un estudiante solo puede matricularse en un máximo de 3 cursos simultáneamente.");
    return;
  }
  const course = COURSES_DATA.find(c => c.id === courseId);
  if (course) {
    course.enrolled = true;
    alert(`✔ Te has matriculado correctamente en: ${course.title}`);
    renderCatalog();
    renderMyCourses();
  }
}

// RENDERIZAR MIS CURSOS
function renderMyCourses() {
  const container = document.getElementById('enrolled-container');
  if (!container) return;
  container.innerHTML = '';
  
  const enrolledCourses = COURSES_DATA.filter(c => c.enrolled);
  const countBadge = document.getElementById('summary-courses-count');
  if (countBadge) countBadge.innerText = enrolledCourses.length;

  enrolledCourses.forEach(course => {
    const div = document.createElement('div');
    div.className = 'course-card';
    div.innerHTML = `
      <div>
        <span class="badge-tag">${course.category}</span>
        <h3>${course.title}</h3>
        <p>${course.desc}</p>
      </div>
      <button class="btn btn-primary btn-full" onclick="openCourseDetail(${course.id})">Acceder al curso</button>
    `;
    container.appendChild(div);
  });
}

// DETALLE DEL CURSO Y PESTAÑAS
function openCourseDetail(courseId) {
  const course = COURSES_DATA.find(c => c.id === courseId);
  if (!course) return;
  
  document.getElementById('detail-title').innerText = course.title;
  document.getElementById('detail-desc').innerText = course.desc;
  document.getElementById('detail-info-body').innerText = `Contenido temático y planificación para el aprendizaje de ${course.title}.`;
  document.getElementById('detail-instructor').innerText = course.instructor;

  document.getElementById('enrolled-list-view').classList.add('hidden');
  document.getElementById('course-detail-view').classList.remove('hidden');
  switchTab('info');
}

function backToEnrolledList() {
  document.getElementById('course-detail-view').classList.add('hidden');
  document.getElementById('enrolled-list-view').classList.remove('hidden');
  closeTaskModal();
}

function switchTab(tabName) {
  document.getElementById('tab-info').classList.add('hidden');
  document.getElementById('tab-lessons').classList.add('hidden');
  document.getElementById('tab-tasks').classList.add('hidden');
  
  const btns = document.querySelectorAll('.course-tabs .tab-btn');
  btns.forEach(b => b.classList.remove('active'));

  if (tabName === 'info') {
    btns[0].classList.add('active');
    document.getElementById('tab-info').classList.remove('hidden');
  } else if (tabName === 'lessons') {
    btns[1].classList.add('active');
    document.getElementById('tab-lessons').classList.remove('hidden');
  } else if (tabName === 'tasks') {
    btns[2].classList.add('active');
    document.getElementById('tab-tasks').classList.remove('hidden');
  }
}

// MODAL DE TAREAS Y EVALUACIONES
function openTaskModal(title, status, deadline, instructions) {
  document.getElementById('modal-task-title').innerText = title;
  document.getElementById('modal-task-status').innerText = status;
  document.getElementById('modal-task-deadline').innerText = deadline;
  document.getElementById('modal-task-instructions').innerText = instructions;
  document.getElementById('task-modal').classList.remove('hidden');
}

function closeTaskModal() {
  const modal = document.getElementById('task-modal');
  if (modal) modal.classList.add('hidden');
}

// NAVEGACIÓN PRINCIPAL
function showSection(secId) {
  document.getElementById('sec-resumen').classList.add('hidden');
  document.getElementById('sec-explorar').classList.add('hidden');
  document.getElementById('sec-mis-cursos').classList.add('hidden');
  document.getElementById('sec-perfil').classList.add('hidden');
  
  document.getElementById(`sec-${secId}`).classList.remove('hidden');

  if (secId === 'mis-cursos') {
    backToEnrolledList();
  }
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  renderMyCourses();
});