// ============================================
// EDIT FUNCTIONS FOR ALL ELEMENTS
// ============================================

// PROJECTS
function editProject(id) {
  const item = projs.find(p => p.id === id);
  if (!item) return;
  
  document.getElementById('projectName').value = item.name;
  document.getElementById('projectDesc').value = item.desc;
  
  const modal = document.getElementById('projectModal');
  modal.querySelector('h3').textContent = 'Edit Project';
  const addBtn = modal.querySelector('.btn');
  addBtn.textContent = 'Update Project';
  addBtn.onclick = () => updateProject(id);
  
  openModal('projectModal');
}

async function updateProject(id) {
  const name = document.getElementById('projectName').value;
  const desc = document.getElementById('projectDesc').value;
  if (!name || !desc) {alert('Please fill all fields'); return;}
  
  try {
    const response = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, desc})
    });
    if (response.ok) {
      loadProjects();
      closeModal('projectModal');
      resetProjectForm();
    } else {
      alert('Error updating project');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

function resetProjectForm() {
  document.getElementById('projectName').value = '';
  document.getElementById('projectDesc').value = '';
  const modal = document.getElementById('projectModal');
  modal.querySelector('h3').textContent = 'Add Project';
  modal.querySelector('.btn').textContent = 'Add Project';
  modal.querySelector('.btn').onclick = addProject;
}

// SERVICES
function editService(id) {
  const item = services.find(s => s.id === id);
  if (!item) return;
  
  document.getElementById('serviceTitle').value = item.title;
  document.getElementById('servicePrice').value = item.price;
  document.getElementById('serviceFeatures').value = item.features.join(', ');
  
  const modal = document.getElementById('serviceModal');
  modal.querySelector('h3').textContent = 'Edit Service';
  const addBtn = modal.querySelector('.btn');
  addBtn.textContent = 'Update Service';
  addBtn.onclick = () => updateService(id);
  
  openModal('serviceModal');
}

async function updateService(id) {
  const title = document.getElementById('serviceTitle').value;
  const price = document.getElementById('servicePrice').value;
  const features = document.getElementById('serviceFeatures').value.split(',').map(f => f.trim());
  
  if (!title || !price || features.length === 0) {alert('Please fill all fields'); return;}
  
  try {
    const response = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, price, features})
    });
    if (response.ok) {
      loadServices();
      closeModal('serviceModal');
      resetServiceForm();
    } else {
      alert('Error updating service');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

function resetServiceForm() {
  document.getElementById('serviceTitle').value = '';
  document.getElementById('servicePrice').value = '';
  document.getElementById('serviceFeatures').value = '';
  const modal = document.getElementById('serviceModal');
  modal.querySelector('h3').textContent = 'Add Service';
  modal.querySelector('.btn').textContent = 'Add Service';
  modal.querySelector('.btn').onclick = addService;
}

// COURSES
function editCourse(id) {
  const item = courses.find(c => c.id === id);
  if (!item) return;
  
  document.getElementById('courseName').value = item.name;
  document.getElementById('courseStatus').value = item.status;
  document.getElementById('courseProgress').value = item.progress || 0;
  
  const modal = document.getElementById('courseModal');
  modal.querySelector('h3').textContent = 'Edit Course';
  const addBtn = modal.querySelector('.btn');
  addBtn.textContent = 'Update Course';
  addBtn.onclick = () => updateCourse(id);
  
  openModal('courseModal');
}

async function updateCourse(id) {
  const name = document.getElementById('courseName').value;
  const status = document.getElementById('courseStatus').value;
  const progress = parseInt(document.getElementById('courseProgress').value) || 0;
  
  if (!name || !status) {alert('Please fill all fields'); return;}
  
  try {
    const response = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, status, progress})
    });
    if (response.ok) {
      loadCourses();
      closeModal('courseModal');
      resetCourseForm();
    } else {
      alert('Error updating course');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

function resetCourseForm() {
  document.getElementById('courseName').value = '';
  document.getElementById('courseStatus').value = 'In Progress';
  document.getElementById('courseProgress').value = 0;
  const modal = document.getElementById('courseModal');
  modal.querySelector('h3').textContent = 'Add Course';
  modal.querySelector('.btn').textContent = 'Add Course';
  modal.querySelector('.btn').onclick = addCourse;
}

// DIPLOMAS
function editDiploma(id) {
  const item = degrees.find(d => d.id === id);
  if (!item) return;
  
  document.getElementById('diplomaName').value = item.name;
  document.getElementById('diplomaYear').value = item.year;
  document.getElementById('diplomaImg').value = item.img || '';
  
  const modal = document.getElementById('diplomaModal');
  modal.querySelector('h3').textContent = 'Edit Degree';
  const addBtn = modal.querySelector('.btn');
  addBtn.textContent = 'Update Degree';
  addBtn.onclick = () => updateDiploma(id);
  
  openModal('diplomaModal');
}

async function updateDiploma(id) {
  const name = document.getElementById('diplomaName').value;
  const year = document.getElementById('diplomaYear').value;
  const img = document.getElementById('diplomaImg').value;
  
  if (!name || !year) {alert('Please fill all fields'); return;}
  
  try {
    const response = await fetch(`${API_BASE}/diplomas/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, year, img})
    });
    if (response.ok) {
      loadDiplomas();
      closeModal('diplomaModal');
      resetDiplomaForm();
    } else {
      alert('Error updating diploma');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

function resetDiplomaForm() {
  document.getElementById('diplomaName').value = '';
  document.getElementById('diplomaYear').value = '';
  document.getElementById('diplomaImg').value = '';
  const modal = document.getElementById('diplomaModal');
  modal.querySelector('h3').textContent = 'Add Degree';
  modal.querySelector('.btn').textContent = 'Add Degree';
  modal.querySelector('.btn').onclick = addDiploma;
}
