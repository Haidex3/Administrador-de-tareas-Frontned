//const apiUrl = 'http://localhost:3000/tasks'; la URL de backend

async function displayTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    try {
        const response = await fetch(apiUrl);
        const tasks = await response.json();

        tasks.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.className = "task";
            taskDiv.innerHTML = `
                <strong class="${task.completed ? 'completed' : ''}">${task.name}</strong>
                <p>${task.description}</p>
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Unmark Complete' : 'Mark as Complete'}</button>
                <button onclick="redirectToTask(${task.id})">Go to Task</button>
            `;
            taskList.appendChild(taskDiv);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

document.getElementById("task-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;

    const newTask = { name: taskName, description: taskDescription, completed: false };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        closeModal();
        document.getElementById("task-form").reset();
        displayTasks();
    } catch (error) {
        console.error('Error adding task:', error);
    }
});

async function toggleComplete(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const task = await response.json();

        task.completed = !task.completed;

        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        displayTasks();
    } catch (error) {
        console.error('Error toggling task:', error);
    }
}

function redirectToTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const taskUrl = `Tarea.html?name=${encodeURIComponent(task.name)}&description=${encodeURIComponent(task.description)}`;
        window.location.href = taskUrl;
    }
}

function searchTask() {
    const filter = document.getElementById("search").value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(filter));
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.innerHTML = `
            <strong class="${task.completed ? 'completed' : ''}">${task.name}</strong>
            <p>${task.description}</p>
            <button onclick="toggleComplete(${task.id})">${task.completed ? 'Unmark Complete' : 'Mark as Complete'}</button>
            <button onclick="redirectToTask(${task.id})">Go to Task</button>
        `;
        taskList.appendChild(taskDiv);
    });
}

window.onload = displayTasks;
