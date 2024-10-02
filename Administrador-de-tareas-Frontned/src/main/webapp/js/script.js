const apiUrl = 'http://localhost:8081/api/tasks';

let tasks = [];

/**
 * Fetches tasks from the API and updates the task list display.
 */
function fetchTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(fetchedTasks => {
            tasks = fetchedTasks;
            displayTasks(tasks);
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

/**
 * Opens the modal to add a new task.
 */
function openModal() {
    document.getElementById("myModal").style.display = "flex";
}

/**
 * Saves a new task by sending a POST request to the API.
 */
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

/**
 * Marks a task as completed by sending a PUT request to the API.
 * @param {string} taskId - The ID of the task to be marked as completed.
 */
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
            const taskIndex = tasks.findIndex(task => task.id === data.id);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = true;
            }
            fetchTasks();
        })
        .catch(error => console.error('Error completing task:', error));
}


/**
 * Displays the tasks in the DOM.
 * @param {Array} tasks - The list of tasks to display.
 */
function displayTasks(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.innerHTML = `
            <p class="${task.completed ? 'completed' : ''}">${task.description}</p>
            <button class="complete-btn ${task.completed ? 'completed-btn' : ''}" onclick="completeTask('${task.id}')">
                ${task.completed ? 'Task Complete' : 'Mark as Complete'}
            </button>
            <button class="delete-btn" onclick="openDeleteModal('${task.id}')">Delete</button>
        `;
        taskList.appendChild(taskDiv);
    });
}

* Opens the delete confirmation modal.
* @param {string} taskId - The ID of the task.
*/
function openDeleteModal(taskId) {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = "flex";
    deleteModal.dataset.taskId = taskId;
}

/**
 * Closes the delete confirmation modal.
 */
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = "none";
}

/**
 * Confirms the deletion of a task by sending a DELETE request to the API.
 */
function
function confirmDelete() {
    const taskId = document.getElementById('deleteModal').dataset.taskId;
    fetch(`${apiUrl}/${taskId}`, { method: 'DELETE' })
        .then(() => {
            closeDeleteModal();
            fetchTasks();
        })
        .catch(error => console.error('Error deleting task:', error));
}


/**
 * Closes the task creation modal.
 */
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

/**
 * Fetches tasks when the window loads.
 */
window.onload = fetchTasks;

/**
 * Adds an event listener to the task form submission to create a new task.
 */
document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const taskDescription = document.getElementById("taskDescription").value;

    const newTask = { description: taskDescription, id: tasks.length + 1, completed: false };
    tasks.push(newTask);

    closeModal();
    document.getElementById("task-form").reset();
    displayTasks(tasks);
});