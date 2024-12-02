export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: UserData | null;
  isLoading: boolean;
  login: (cpf: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterData) => Promise<boolean>;
  update: (data: RegisterData) => Promise<boolean>;
  updatePassword: (data: PasswordUpdateData) => Promise<boolean | {int: number, string: string}>;
  deleteAccount: () => Promise<boolean>;
  getUsers: () => Promise<UserResult[]>;
  updateUser: (data: UpdateUserData) => Promise<boolean>;
}


export interface UserResult {
  usu_id: number;
  usu_nome: string;
  usu_email: string;
  usu_telefone: string;
  usu_dtNasc: Date;
  usu_role: string;
}


export interface UserData {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
  endereco: any[];
  agencia: any;
  usu_cpf: string;
}

export interface RegisterData {
  usu_cpf: string;
  usu_nome: string;
  usu_email: string;
  usu_telefone: string;
  usu_dtNasc: Date;
  usu_senha: string;
}

export interface UpdateUserData {
  usu_id: number;
  usu_nome: string;
  usu_email: string;
  usu_telefone: string;
  usu_dtNasc: Date;
}

export interface PasswordUpdateData {
  senha_antiga: string;
  senha_nova: string;
} 