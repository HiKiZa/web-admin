import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  setHeaderText: (text: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setHeaderText }) => {
  return (
    <div className="fixed top-0 left-0 w-[200px] h-screen p-5 bg-background ">
      <h2 className="text-foreground font-bold mb-4">Menu</h2>
      <ul className="list-none p-0">
        <li className="mb-2">
          <Link
            to="/"
            className="text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setHeaderText("Dashboard")}
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/pesquisa"
            className="text-foreground no-underline hover:text-primary"
            onClick={() => setHeaderText("Pesquisa")}
          >
            Pesquisa
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
