import React, { useState } from 'react';
import TaskList from './TaskList';
import Modal from './Modal';
import AuthModal from './AuthModal';
import '../styles/taskManager.css'
const TaskManager = () => {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modalType) => {
        setActiveModal(modalType);
        console.log(modalType)
    };
    
    const closeModal = () => {
    setActiveModal(null);
    };

    return (
        <div className="main-content">
            <button onClick={() => openModal('auth')}>Log in / Sign up</button>

            <h1>Task Manager</h1>
            <div className="button-content">
                <button onClick={() => openModal('modal')} className="btn-add-task">Add Task</button>
                <button onClick={() => {}} className="automatic-button">Realise Automatic Tasks</button>
            </div>

            {activeModal === 'auth' && <AuthModal isOpen={true} onClose={closeModal} />} 
            {activeModal === 'modal' && <Modal isOpen={true} onClose={closeModal} />}
        </div> 
    );
};

export default TaskManager;
