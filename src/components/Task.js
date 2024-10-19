import React from 'react';

const Task = ({ task, onComplete, onDelete }) => {
    const { id, description, completed, priority, difficultyLevel, averageDevelopmentTime } = task;

    const translateDifficulty = (difficulty) => {
        const difficultyMap = { LOW: 'Bajo', MEDIUM: 'Medio', HIGH: 'Alto' };
        return difficultyMap[difficulty] || difficulty;
    };

    return (
        <div className={`task ${completed ? 'completed' : ''}`}>
            <p><strong>Nombre:</strong> {description}</p>
            <p><strong>Dificultad:</strong> {translateDifficulty(difficultyLevel)}</p>
            <p><strong>Prioridad:</strong> {priority}</p>
            <p><strong>Tiempo Promedio:</strong> {averageDevelopmentTime} horas</p>
            <button onClick={() => onComplete(id)} disabled={completed}>
                {completed ? 'Task Complete' : 'Mark as Complete'}
            </button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default Task;

