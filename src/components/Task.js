// src/components/Task.js
import React from 'react';

const Task = ({ task }) => {
    return (
        <div className="task">
            <h3>{task.title}</h3>
            <p>Priority: {task.priority}</p>
            <p>Difficulty: {task.difficultyLevel}</p>
            <button>Complete</button>
            <button>Delete</button>
        </div>
    );
};

export default Task;
