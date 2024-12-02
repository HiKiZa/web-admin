import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { RegisterData } from "@/types/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, update, deleteAccount } = useAuth();
  const [formData, setFormData] = useState<RegisterData>({
    usu_cpf: user?.usu_cpf || "",
    usu_nome: user?.nome || "",
    usu_email: user?.email || "",
    usu_telefone: user?.telefone || "",
    usu_dtNasc: user?.nascimento ? new Date(user.nascimento) : new Date(),
    usu_senha: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (user) {
        const success = await update({
          ...formData,
          usu_cpf: user.usu_cpf,
        });

        if (success) {
          toast.success("Perfil atualizado com sucesso");
        } else {
          toast.error("Erro ao atualizar o perfil");
        }
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Erro ao atualizar o perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const success = await deleteAccount();
      if (success) {
        toast.success("Conta deletada com sucesso");
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Erro ao deletar a conta:", error);
      toast.error(error.response?.data?.message || "Erro ao deletar a conta");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usu_nome">Nome</Label>
            <Input
              id="usu_nome"
              name="usu_nome"
              value={formData.usu_nome}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="usu_email">Email</Label>
            <Input
              id="usu_email"
              name="usu_email"
              type="email"
              value={formData.usu_email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="usu_telefone">Telefone</Label>
            <Input
              id="usu_telefone"
              name="usu_telefone"
              value={formData.usu_telefone}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="usu_dtNasc">Data de Nascimento</Label>
            <Input
              id="usu_dtNasc"
              name="usu_dtNasc"
              type="date"
              value={formData.usu_dtNasc.toISOString().split("T")[0]}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive">Deletar Conta</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deletar Conta</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja deletar sua conta? Esta ação
                    não pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteDialog(false)}
                    disabled={isDeleting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deletando..." : "Deletar Conta"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Profile;
