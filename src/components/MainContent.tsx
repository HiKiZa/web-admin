import React from 'react';
import { Routes, Route } from 'react-router-dom';

interface MainContentProps {
    headerText: string; // Recebe o texto do cabeçalho como prop
}

const MainContent: React.FC<MainContentProps> = ({ headerText }) => {
    return (
        <div style={styles.mainContent}>
            <h1 style={styles.pageHeader}>{headerText}</h1> {/* Usa o texto do cabeçalho */}
            <div style={styles.content}>
                <Routes>
                    <Route path="/" element={<h2>Dashboard</h2>} />
                    <Route path="/pesquisa" element={<h2>Pesquisa</h2>} />
                    <Route path="/opcoes" element={<h2>Opções</h2>} />
                </Routes>
            </div>
        </div>
    );
};

const styles = {
    mainContent: {
        marginLeft: '220px',        // Espaço para a sidebar
        height: '100vh',            // Define a altura para ocupar toda a tela
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',   // Define o fundo como branco
        position: 'fixed',          // Fixa o conteúdo na tela
        top: 0,
        left: 220,                  // Alinha à direita da sidebar
        width: 'calc(100% - 220px)', // Define a largura para ocupar o restante da tela
        overflowY: 'auto',          // Permite rolagem se necessário
        boxSizing: 'border-box',    // Inclui padding e borda na largura total
    },
    pageHeader: {
        color: 'black',
        marginBottom: '20px',
        textAlign: 'center',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: '#f4f4f4', // Fundo do cabeçalho
    },
    content: {
        padding: '20px',
        flexGrow: 1,                // Faz o conteúdo ocupar o espaço restante
    },
};

export default MainContent;