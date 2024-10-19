// Chart.js
import React, { useEffect, useState } from 'react';
import { fetchTasks } from './taskService';
import { Bar, Line } from 'react-chartjs-2';

const Chart = () => {
    const [chartData, setChartData] = useState({
        difficultyData: [0, 0, 0],
        timeData: [0, 0, 0, 0, 0, 0],
        priorityData: [0, 0, 0, 0, 0],
        totalTime: 0,
    });

    useEffect(() => {
        async function loadChartData() {
            const tasks = await fetchTasks();
            setChartData(processChartData(tasks));
        }
        loadChartData();
    }, []);

    const processChartData = (tasks) => {
        const counts = { LOW: 0, MEDIUM: 0, HARD: 0 };
        const timeData = [0, 0, 0, 0, 0, 0];
        const priorityData = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
        let totalTime = 0;

        tasks.forEach(task => {
            counts[task.difficultyLevel]++;
            timeData[parseInt(task.averageDevelopmentTime) - 1]++;
            priorityData[task.priority]++;
            if (task.completed) {
                totalTime += parseFloat(task.averageDevelopmentTime);
            }
        });

        return {
            difficultyData: [counts.LOW, counts.MEDIUM, counts.HARD],
            timeData,
            priorityData: Object.values(priorityData),
            totalTime,
        };
    };

    return (
        <div>
            <Bar data={{
                labels: ['Bajo', 'Medio', 'Alto'],
                datasets: [{ label: 'Nivel de Dificultad', data: chartData.difficultyData }]
            }} />
            <Line data={{
                labels: ['1 hora', '2 horas', '3 horas', '4 horas', '5 horas', '6 horas'],
                datasets: [{ label: 'Tareas Finalizadas', data: chartData.timeData }]
            }} />
            <Bar data={{
                labels: ['Prioridad 1', 'Prioridad 2', 'Prioridad 3', 'Prioridad 4', 'Prioridad 5'],
                datasets: [{ label: 'Promedio de Tareas', data: chartData.priorityData }]
            }} />
            <Bar data={{
                labels: ['Tiempo Total Invertido'],
                datasets: [{ label: 'Horas Totales', data: [chartData.totalTime] }]
            }} />
        </div>
    );
};

export default Chart;

