import React, { useEffect, useState } from 'react';
import '../styles/insightsPage.css';

const InsightsPage = () => {
    return (
        <div className="main-content">
            <div className="graphics-content">
                <div className="graphic-content">
                    <h2>Histograma de Dificultad</h2>
                    <canvas id="chartDificultad"></canvas>
                </div>
                <div className="graphic-content">
                    <h2>Número de Tareas Finalizadas por Tiempo</h2>
                    <canvas id="chartTareasPorTiempo"></canvas>
                </div>
                <div className="graphic-content">
                    <h2>Promedios de Tareas por Prioridad</h2>
                    <canvas id="chartTareasPorPrioridad"></canvas>
                </div>
                <div className="graphic-content">
                    <h2>Tiempo Total Invertido por Tareas Realizadas</h2>
                    <canvas id="chartTiempoTotalTareasRealizadas"></canvas>
                </div>
            </div>
        </div>
    );
};

export default InsightsPage;
