import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AuthContextType,
  UserData,
  RegisterData,
  PasswordUpdateData,
  UpdateUserData,
} from "@/types/auth";
import axios from "axios";

const AuthContext = createContext<AuthContextType | null>(null);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3344",
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
          const response = await api.get("/usuario/eu");
          setUser(response.data);
          setIsAuthenticated(true);
          setToken(storedToken);
        } catch (error) {
          console.error("Erro de validação de token:", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (cpf: string, password: string) => {
    try {
      const response = await api.post("/login", {
        usu_cpf: cpf,
        usu_senha: password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setToken(token);
      setIsAuthenticated(true);

      const userResponse = await api.get("/usuario/eu");
      setUser(userResponse.data);

      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsAuthenticated(false);
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
  };

  const register = async (data: RegisterData) => {
    try {
      await api.post("/usuario/criar", data);
      const loginSuccess = await login(data.usu_cpf, data.usu_senha);
      return loginSuccess;
    } catch (error: any) {
      if (error.response?.data?.erro) {
        throw error;
      }
      return false;
    }
  };

  const update = async (data: RegisterData) => {
    try {
      const response = await api.put("/usuario/editar", data);
      setUser(response.data);
      return true;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return false;
    }
  };

  const updatePassword = async (data: PasswordUpdateData) => {
    const response = await api.put("/usuario/alterarSenha", data);
    if (response.status === 204) {
      return true;
    }
    return { int: response?.status, string: response?.data };
  };

  const deleteAccount = async () => {
    try {
      const response = await api.delete("/usuario/apagar");
      if (response.status === 204) {
        logout();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      const response = await api.get("/usuario");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  };

  const updateUser = async (data: UpdateUserData) => {
    const response = await api.put("/usuario/editar", data);
    return response.data;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        login,
        logout,
        user,
        register,
        isLoading,
        update,
        updatePassword,
        deleteAccount,
        getUsers,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const useAuthenticatedApi = () => {
  const { token } = useAuth();

  const authenticatedApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3344",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return authenticatedApi;
};
