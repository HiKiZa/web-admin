import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./app/contexts/AuthContext";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "./app/contexts/ThemeContext";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <AppRoutes />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
