import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App: React.FC = () => {
    return (
        <Router>
            <div style={styles.container}>
                <Sidebar />
                <MainContent />
            </div>
        </Router>
    );
};

const styles = {
    container: {
        display: 'flex',
    }
};

export default App;