import React, { useState } from 'react';
import TaskList from './TaskList';
import Modal from './Modal';
import '../styles/taskManager.css'
const TaskManager = () => {
    const [showModal, setShowModal] = useState(false);

    const handleAddTask = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="main-content">
            <h1>Task Manager</h1>
            <div className="button-content">
                <button onClick={handleAddTask} className="btn-add-task">Add Task</button>
                <button onClick="" className="automatic-button">Realise Automatic Tasks</button>
            </div>
        </div>
    );
};

export default TaskManager;
