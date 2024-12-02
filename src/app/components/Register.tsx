import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { RegisterData } from '@/types/auth';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<RegisterData>({
    usu_cpf: '',
    usu_nome: '',
    usu_email: '',
    usu_telefone: '',
    usu_dtNasc: new Date(),
    usu_senha: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const formattedData = {
      ...formData,
      usu_cpf: formData.usu_cpf.replace(/[^\d]/g, '')
    };

    try {
      const success = await register(formattedData);
      if (success) {
        navigate('/');
      } else {
        setError("Falha ao registrar. Verifique suas informações.");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.erro?.Erros?.[0]?.mensagem ||
          "Falha ao registrar. Verifique suas informações."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'usu_dtNasc' ? new Date(value) : value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center text-foreground">
            Criar Conta
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">CPF</label>
              <Input
                type="text"
                name="usu_cpf"
                value={formData.usu_cpf}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome</label>
              <Input
                type="text"
                name="usu_nome"
                value={formData.usu_nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                name="usu_email"
                value={formData.usu_email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Telefone
              </label>
              <Input
                type="tel"
                name="usu_telefone"
                value={formData.usu_telefone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Data de Nascimento
              </label>
              <Input
                type="date"
                name="usu_dtNasc"
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Senha
              </label>
              <Input
                type="password"
                name="usu_senha"
                value={formData.usu_senha}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Criar Conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
