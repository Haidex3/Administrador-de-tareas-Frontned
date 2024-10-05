// Función para navegar a la página de tareas
function navigateToTasks() {
    window.location.href = "index.html";
}

// Función para navegar a la página de insights
function navigateToInsights() {
    window.location.href = "insights.html";
}

// Configuración para el Histograma de Dificultad
var ctxDificultad = document.getElementById('chartDificultad').getContext('2d');
var chartDificultad = new Chart(ctxDificultad, {
    type: 'bar', // Tipo de gráfico: barra
    data: {
        labels: ['Bajo', 'Medio', 'Alto'], // Etiquetas para el eje X
        datasets: [{
            label: 'Número de Tareas',
            data: [5, 10, 3], // Datos de ejemplo
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'], // Colores de las barras
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

// Configuración para el Número de Tareas Finalizadas por Tiempo
var ctxTareasPorTiempo = document.getElementById('chartTareasPorTiempo').getContext('2d');
var chartTareasPorTiempo = new Chart(ctxTareasPorTiempo, {
    type: 'line', // Tipo de gráfico: línea
    data: {
        labels: ['1 hora', '2 horas', '3 horas', '4 horas'], // Ejemplo de meses
        datasets: [{
            label: 'Tareas Finalizadas',
            data: [2, 5, 3, 7],
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
                    text: 'Meses'
                }
            }
        }
    }
});


