const apiUrl = 'https://taskmanager-gjdfgpcndme0heaq.brazilsouth-01.azurewebsites.net/api/tasks';

// Llamar a la función para obtener los datos y actualizar los gráficos al cargar la página
window.onload = fetchTasksForCharts;

// Función para obtener los datos desde la API y actualizar los gráficos
function fetchTasksForCharts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(tasks => {
            // Procesar los datos para actualizar los gráficos
            const dificultadData = processDificultadData(tasks);

            // Actualizar los gráficos
            updateDificultadChart(dificultadData);

        })
        .catch(error => console.error('Error fetching tasks:', error));
}

// Función para procesar los datos para el gráfico de dificultad
function processDificultadData(tasks) {
    const counts = { Bajo: 0, Medio: 0, Alto: 0 };

    tasks.forEach(task => {
        if (task.difficultyLevel === 'LOW') counts.Bajo++;
        if (task.difficultyLevel === 'MEDIUM') counts.Medio++;
        if (task.difficultyLevel === 'HARD') counts.Alto++;
    });

    return [counts.Bajo, counts.Medio, counts.Alto];
}



// Función para actualizar el gráfico de dificultad
function updateDificultadChart(dificultadData) {
    chartDificultad.data.datasets[0].data = dificultadData;
    chartDificultad.update();
}



// Configuración del gráfico de dificultad
var ctxDificultad = document.getElementById('chartDificultad').getContext('2d');
var chartDificultad = new Chart(ctxDificultad, {
    type: 'bar',
    data: {
        labels: ['Bajo', 'Medio', 'Alto'],
        datasets: [{
            label: 'Número de Tareas',
            data: [0, 0, 0], // Se inicializa vacío
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Número de Tareas'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Nivel de Dificultad'
                }
            }
        }
    }
});

// Configuración del gráfico de tareas por tiempo
var ctxTareasPorTiempo = document.getElementById('chartTareasPorTiempo').getContext('2d');
var chartTareasPorTiempo = new Chart(ctxTareasPorTiempo, {
    type: 'line',
    data: {
        labels: ['1 hora', '2 horas', '3 horas', '4 horas', '5 horas', '6 horas'],
        datasets: [{
            label: 'Tareas Finalizadas',
            data: [0, 0, 0, 0, 0, 0], // Se inicializa vacío
            borderColor: '#36A2EB',
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tareas Finalizadas'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tiempo Promedio (Horas)'
                }
            }
        }
    }
});

// Función para navegar a la página de tareas
function navigateToTasks() {
    window.location.href = "index.html";
}

// Función para navegar a la página de insights
function navigateToInsights() {
    window.location.href = "insights.html";
}
