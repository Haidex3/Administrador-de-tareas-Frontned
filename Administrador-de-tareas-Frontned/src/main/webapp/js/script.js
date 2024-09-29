const apiUrl = 'http://localhost:8081/api/tasks';

function fetchTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function openModal() {
    document.getElementById("myModal").style.display = "flex";
}


function saveTask() {
    const taskDescription = document.getElementById("taskDescription").value;
    if (taskDescription.trim() === '') return;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: taskDescription, completed: false })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            document.getElementById("taskDescription").value = '';
            fetchTasks();
            closeModal();
        })
        .catch(error => console.error('Error adding task:', error));
}


function completeTask(taskId) {
    fetch(`${apiUrl}/${taskId}/complete`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: true })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const taskElement = document.getElementById(`task-${data.id}`);
            const taskDescription = taskElement.querySelector('.task-description');
            if (data.completed) {
                taskDescription.classList.add('completed');
            } else {
                taskDescription.classList.remove('completed');
            }

            fetchTasks();
        })
        .catch(error => console.error('Error completing task:', error))
        .finally(() => {
            fetchTasks();  // Recargar la página al finalizar
        });
}


function displayTasks(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.innerHTML = `
            <p class="${task.completed ? 'completed' : ''}">${task.description}</p>
            <button class="complete-btn" onclick="completeTask('${task.id}')">
                ${task.completed ? 'Unmark Complete' : 'Mark as Complete'}
            </button>
            <button class="delete-btn" onclick="openDeleteModal('${task.id}')">Delete</button>

        `;
        taskList.appendChild(taskDiv);
    });
}


function openDeleteModal(taskId) {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = "flex";
    deleteModal.dataset.taskId = taskId;
}

function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = "none";
}

function confirmDelete() {
    const taskId = document.getElementById('deleteModal').dataset.taskId;
    fetch(`${apiUrl}/${taskId}`, { method: 'DELETE' })
        .then(() => {
            closeDeleteModal();
            fetchTasks();
        })
        .catch(error => console.error('Error deleting task:', error));
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}



window.onload = fetchTasks;

document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const taskDescription = document.getElementById("taskDescription").value;

    const newTask = { description: taskDescription, id: tasks.length + 1, completed: false };
    tasks.push(newTask);

    closeModal();
    document.getElementById("task-form").reset();
    displayTasks();
});
