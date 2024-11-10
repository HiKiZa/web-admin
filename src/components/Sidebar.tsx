import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
    setHeaderText: (text: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setHeaderText }) => {
    return (
        <div style={styles.sidebar}>
            <h2 style={styles.header}>Menu</h2>
            <ul style={styles.menu}>
                <li>
                    <Link to="/" style={styles.link} onClick={() => setHeaderText('Dashboard')}>Dashboard</Link>
                </li>
                <li>
                    <Link to="/pesquisa" style={styles.link} onClick={() => setHeaderText('Pesquisa')}>Pesquisa</Link>
                </li>
                <li>
                    <Link to="/opcoes" style={styles.link} onClick={() => setHeaderText('Opções')}>Opções</Link>
                </li>
            </ul>
        </div>
    );
};

const styles = {
    sidebar: {
        width: '200px',
        height: '100vh',
        backgroundColor: '#242424',
        padding: '20px',
        position: 'fixed',
        top: 0,
        left: 0,
    },
    header: {
        color: 'white',
    },
    menu: {
        listStyleType: 'none',
        padding: 0,
    },
    link: {
        color: 'white',
        textDecoration: 'none',
    },
};

export default Sidebar;