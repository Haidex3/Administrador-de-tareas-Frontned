// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import Task from './Task';
import { fetchTasks } from '../api/taskService';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks().then(data => setTasks(data));
    }, []);

    return (
        <div className="task-list">
            {tasks.map(task => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
