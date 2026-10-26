// MODAL DE CALIFICACIÓN
function openGradeModal(student, task) {
  document.getElementById('student-target-name').innerText = student;
  document.getElementById('task-target-name').innerText = task;
  document.getElementById('grade-panel').classList.remove('hidden');
}

// CAMBIO DE VISTAS DOCENTE
function showDocSection(sec) {
  document.getElementById('doc-sec-gestion').classList.add('hidden');
  document.getElementById('doc-sec-calificar').classList.add('hidden');
  document.getElementById(`doc-sec-${sec}`).classList.remove('hidden');
}