// Función para cargar los registros guardados en el localStorage
function loadRecords() {
    let records = JSON.parse(localStorage.getItem('inscriptions')) || [];
    const recordsContainer = document.getElementById('records-container');
    recordsContainer.innerHTML = '<h2>Inscripciones Registradas</h2>';

    records.forEach(record => {
        const recordDiv = document.createElement('div');
        recordDiv.classList.add('user-record');

        recordDiv.innerHTML = `
            <div class="user-data-content">
                <p><strong>Nombre:</strong> ${record.name}</p>
                <p><strong>Apellido:</strong> ${record.surname}</p>
                <p><strong>Cédula:</strong> ${record.idCard}</p>
                <p><strong>Fecha de Inscripción:</strong> ${record.dob}</p>
                <p><strong>Expiración:</strong> ${record.expiration}</p>
            </div>
            <div class="user-photo">
                <img src="${record.photo}" alt="Foto de perfil">
            </div>
        `;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function () {
            deleteRecord(record.name);
        };
        recordDiv.appendChild(deleteButton);

        recordsContainer.appendChild(recordDiv);
    });
}

// Función para guardar los registros en el localStorage
function saveRecord(name, surname, idCard, dob, expiration, photo) {
    let records = JSON.parse(localStorage.getItem('inscriptions')) || [];
    records.push({
        name: name,
        surname: surname,
        idCard: idCard,
        dob: dob,
        expiration: expiration,
        photo: photo
    });
    localStorage.setItem('inscriptions', JSON.stringify(records));
}

// Función para eliminar un registro
function deleteRecord(name) {
    let records = JSON.parse(localStorage.getItem('inscriptions')) || [];
    records = records.filter(record => record.name !== name); // Filtramos el registro por nombre
    localStorage.setItem('inscriptions', JSON.stringify(records)); // Guardamos los cambios
    loadRecords(); // Volver a cargar los registros actualizados
}

// Función para manejar el envío del formulario
function submitForm() {
    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const idCard = document.getElementById('idCard').value;
    const dob = document.getElementById('dob').value;
    const expiration = document.getElementById('expiration').value;
    const photoInput = document.getElementById('photo');

    let fileName = document.getElementById('file-name').textContent;
    let photoData = '';

    // Si el usuario ha cargado una foto, convertirla a base64
    if (photoInput.files.length > 0) {
        const file = photoInput.files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            photoData = reader.result; // La imagen convertida a base64
            saveRecord(name, surname, idCard, dob, expiration, photoData); // Guardar el registro
            loadRecords(); // Volver a cargar los registros
        };
        reader.readAsDataURL(file); // Convertir la imagen a base64
    } else {
        saveRecord(name, surname, idCard, dob, expiration, fileName || 'default-photo.jpg');
        loadRecords();
    }

    // Limpiar el formulario
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('idCard').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('expiration').value = '';
    document.getElementById('photo').value = '';
    document.getElementById('file-name').textContent = '';
}


// Función para filtrar los registros según la búsqueda
function filterRecords() {
    const query = document.getElementById('search').value.toLowerCase();
    const records = JSON.parse(localStorage.getItem('inscriptions')) || [];
    const filteredRecords = records.filter(record => 
        record.name.toLowerCase().includes(query) || 
        record.surname.toLowerCase().includes(query) || 
        record.idCard.includes(query) || 
        record.dob.includes(query) ||
        record.expiration.includes(query)
    );
    
    const recordsContainer = document.getElementById('records-container');
    recordsContainer.innerHTML = '<h2>Inscripciones Registradas</h2>';
    
    filteredRecords.forEach(record => {
        const recordDiv = document.createElement('div');
        recordDiv.classList.add('user-record');
        
        recordDiv.innerHTML = `
            <div class="user-data-content">
                <p><strong>Nombre:</strong> ${record.name}</p>
                <p><strong>Apellido:</strong> ${record.surname}</p>
                <p><strong>Cédula:</strong> ${record.idCard}</p>
                <p><strong>Fecha de Inscripción:</strong> ${record.dob}</p>
                <p><strong>Expiración:</strong> ${record.expiration}</p>
            </div>
            <div class="user-photo">
                <img src="${record.photo}" alt="Foto de perfil">
            </div>
        `;

        // Añadir el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function () {
            deleteRecord(record.name); // Llamar a la función para eliminar el registro
        };
        recordDiv.appendChild(deleteButton);
        
        recordsContainer.appendChild(recordDiv);
    });
}

// Llamar a la función para cargar los registros cuando la página cargue
window.onload = function () {
    loadRecords(); // Cargar los registros guardados
};
