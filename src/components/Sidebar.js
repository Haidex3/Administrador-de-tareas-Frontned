// Sidebar.js
import React from 'react';
import '../styles/sidebar.css'; // Importar los estilos específicos del Sidebar

const Sidebar = ({ onNavigate }) => {
    return (
        <div className="sidebar">
            <button onClick={() => onNavigate('taskManager')}>
                <i className="fa-solid fa-list-check"></i>
            </button>
            <button onClick={() => onNavigate('insights')}>
                <i className="fa-solid fa-chart-column"></i>
            </button>
        </div>
    );
};

export default Sidebar;
