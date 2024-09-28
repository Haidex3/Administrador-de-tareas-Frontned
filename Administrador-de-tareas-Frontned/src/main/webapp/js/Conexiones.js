const apiUrl = 'http://localhost:8081/api/tasks';

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
                <p class="${task.completed ? 'completed' : ''}">ID: ${task.id}</p>
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

    const taskDescription = document.getElementById("taskDescription").value;

    const newTask = { description: taskDescription, completed: false };

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
    const taskUrl = `Tarea.html?id=${id}`;
    window.location.href = taskUrl;
}

window.onload = displayTasks;
