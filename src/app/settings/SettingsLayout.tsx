import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Lock } from "lucide-react";

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/settings",
    icon: User,
  },
  {
    title: "Segurança",
    href: "/settings/security",
    icon: Lock,
  },
];

export default function SettingsLayout() {
  const location = useLocation();

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas configurações e preferências
        </p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {sidebarNavItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={
                    location.pathname === item.href ? "secondary" : "ghost"
                  }
                  className={cn(
                    "w-full justify-start text-foreground",
                    location.pathname === item.href
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
