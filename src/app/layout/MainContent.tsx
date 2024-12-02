import React from "react";
import { Routes, Route } from "react-router-dom";

interface MainContentProps {
  headerText: string;
}

const MainContent: React.FC<MainContentProps> = ({ headerText }) => {
  return (
    <div style={styles.mainContent}>
      <h1 style={styles.pageHeader}>{headerText}</h1>
      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<h2>Dashboard</h2>} />
          <Route path="/search" element={<h2>Pesquisa</h2>} />
        </Routes>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  mainContent: {
    marginLeft: "220px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    left: 220,
    width: "calc(100% - 220px)",
    overflowY: "auto",
    boxSizing: "border-box" as "border-box",
  },
  pageHeader: {
    marginBottom: "20px",
    textAlign: "center",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box" as "border-box",
  },
  content: {
    padding: "20px",
    flexGrow: 1,
  },
};

export default MainContent;
