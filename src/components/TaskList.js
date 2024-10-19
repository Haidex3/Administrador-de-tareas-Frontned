import React, { useEffect, useState } from 'react';
import { fetchTasks, completeTask, deleteTask } from '../api/taskService';
import Task from './Task';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const fetchedTasks = await fetchTasks();
            setTasks(fetchedTasks);
        }
        loadTasks();
    }, []);

    const handleComplete = async (taskId) => {
        await completeTask(taskId);
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === taskId ? { ...task, completed: true } : task
        ));
    };

    const handleDelete = async (taskId) => {
        await deleteTask(taskId);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    return (
        <div id="task-list">
            {tasks.map(task => (
                <Task key={task.id} task={task} onComplete={handleComplete} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default TaskList;