// src/components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add a New Task</h2>
                <form>
                    {/* Inputs para los detalles de la tarea */}
                    <input type="text" placeholder="Task Title" required />
                    <select name="priority" required>
                        <option value="1">Low Priority</option>
                        <option value="2">Medium Priority</option>
                        <option value="3">High Priority</option>
                    </select>
                    <button type="submit">Add Task</button>
                </form>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
