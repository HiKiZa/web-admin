import { Link, Outlet } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { LayoutDashboard, Search, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../layout/ThemeToggle";
import { UserDropdown } from "../components/UserDropdown";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Search, label: "Pesquisa", path: "/pesquisa" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform bg-card transition-transform duration-200 ease-in-out text-foreground",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col px-4 py-8">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Menu</h2>
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div
        className={cn(
          "min-h-screen transition-all duration-200 ease-in-out",
          isSidebarOpen ? "pl-64" : "pl-0"
        )}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4">
          <Button
            className="text-foreground/80 hover:text-primary transition-colors"
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </header>

        <main className="container mx-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
