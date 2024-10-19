import React, { useState } from 'react';
import { saveTask } from '../api/taskService';

const Modal = ({ isOpen, onClose }) => {
    // Manejo del estado de los campos del formulario
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState(1); // Asumiendo que la prioridad es numérica
    const [taskLevelDifficult, setTaskLevelDifficult] = useState('LOW');
    const [taskAverageTime, setTaskAverageTime] = useState(0);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Crear la nueva tarea
        const newTask = {
            description: taskDescription,
            priority: taskPriority,
            levelDifficult: taskLevelDifficult,
            averageTime: taskAverageTime,
        };

        console.log('New Task:', newTask); // Agrega esto para depuración

        // Llamada a la función para agregar la tarea en el backend
        await saveTask(newTask);

        // Limpiar los campos del formulario después de agregar la tarea
        setTaskDescription('');
        setTaskPriority(1);
        setTaskLevelDifficult('LOW');
        setTaskAverageTime(0);

        // Cerrar el modal
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Add New Task</h2>
                <form id="task-form" onSubmit={handleSubmit}>
                    <label htmlFor="taskDescription">Description:</label>
                    <input
                        type="text"
                        id="taskDescription"
                        name="taskDescription"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        required
                    />

                    <label htmlFor="taskPriority">Priority:</label>
                    <input
                        type="number"
                        id="taskPriority"
                        name="taskPriority"
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value)}
                        required
                    />

                    <label htmlFor="taskLevelDifficult">Level Difficult:</label>
                    <select
                        id="taskLevelDifficult"
                        name="taskLevelDifficult"
                        value={taskLevelDifficult}
                        onChange={(e) => setTaskLevelDifficult(e.target.value)}
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">Hard</option>
                    </select>

                    <label htmlFor="taskAverageTime">Average Development Time:</label>
                    <input
                        type="number"
                        id="taskAverageTime"
                        name="taskAverageTime"
                        value={taskAverageTime}
                        onChange={(e) => setTaskAverageTime(e.target.value)}
                        required
                    />

                    <button type="submit">Save Task</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;