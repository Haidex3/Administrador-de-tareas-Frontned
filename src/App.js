import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskManager from './components/TaskManager';
import InsightsPage from './components/InsightsPage';
import './styles/app.css';

function App() {
    const [currentPage, setCurrentPage] = useState('taskManager');

    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="app">
            <Sidebar onNavigate={handleNavigation} />
            <div className="content">
                {currentPage === 'taskManager' && <TaskManager />}
                {currentPage === 'insights' && <InsightsPage />}
            </div>
        </div>
    );
}

export default App;
