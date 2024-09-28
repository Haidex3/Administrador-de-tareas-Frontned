
const apiUrl = 'http://localhost:8081/api/tasks';

let tasks = [];
let isComplete = false;

function displayTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.innerHTML = `
            <p class="${task.completed ? 'completed' : ''}">${task.description}</p>
            <button class="complete-btn" onclick="toggleComplete(${task.id})">
                ${task.completed ? 'Unmark Complete' : 'Mark as Complete'}
            </button>
            <button onclick="redirectToTask(${task.id})">Go to Task</button>
        `;
        taskList.appendChild(taskDiv);
    });
}

function openModal() {
    document.getElementById("myModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const taskDescription = document.getElementById("taskDescription").value;

    const newTask = { description: taskDescription, id: tasks.length + 1, completed: false };
    tasks.push(newTask);

    closeModal();
    document.getElementById("task-form").reset();
    displayTasks();
});

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        displayTasks();
    }
}

function redirectToTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const taskUrl = `Tarea.html?description=${encodeURIComponent(task.description)}`;
        window.location.href = taskUrl;
    }
}

//

function toggleCompleteTarea() {
    isComplete = !isComplete;
    const completeBtn = document.getElementById('completeBtn');
    completeBtn.innerText = isComplete ? 'Unmark as Complete' : 'Mark as Complete';
    document.getElementById('message').innerText = isComplete ? 'Task marked as complete!' : 'Task marked as incomplete!';

    setTimeout(() => {
        window.location.href = 'Index.html';
    }, 1000);
}

function openDeleteModal() {
    document.getElementById('deleteModal').style.display = "flex";
}

function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = "none";
}

function confirmDelete() {
    document.getElementById('message').innerText = 'Task deleted successfully!';
    closeDeleteModal();
    setTimeout(() => {
        window.location.href = 'Index.html';
    }, 1000);
}
function saveTask() {
    const updatedDescription = document.getElementById('taskDescription').value;
    document.getElementById('message').innerText = 'Task updated successfully!';

    setTimeout(() => {
        window.location.href = 'Index.html';
    }, 1000);
}






