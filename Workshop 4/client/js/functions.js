async function createTeacher() {
  let teacher = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    cedula: document.getElementById('cedula').value,
    age: document.getElementById('age').value
  };

  try {
    const response = await fetch("http://localhost:3001/api/teachers", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teacher)
    });

    if (response.ok) {
      const savedTeacher = await response.json();
      console.log('Teacher saved', savedTeacher);
      alert('Usuario guardado');
    } else {
      const errorData = await response.json();
      alert('Error al guardar el usuario: ' + errorData.error);
    }
  } catch (error) {
    console.error('Network error:', error);
    alert("Shit's on fire!");
  }
}

async function getTeachers() {
  try {
    const response = await fetch("http://localhost:3001/api/teachers");
    const teachers = await response.json();
    console.log('teachers:', teachers);

    if (teachers) {
      const container = document.getElementById('result');
      container.innerHTML = '';
      teachers.forEach(element => {
        const item = document.createElement('li');
        item.innerHTML = `${element.first_name} ${element.last_name} <a href="" class="edit_button" id="${element._id}">Edit</a>`;
        item.setAttribute('data-id', element._id);
        container.appendChild(item);
      });
    }
  } catch (error) {
    console.error('Error fetching teachers:', error);
  }
}
