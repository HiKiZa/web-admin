import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { PasswordUpdateData } from "@/types/auth";

const ChangePassword = () => {
  const { updatePassword } = useAuth();
  const [formData, setFormData] = useState({
    senha_antiga: "",
    senha_nova: "",
    senha_confirma: "",
  });
  const [isLoading, setIsLoading] = useState<boolean | "error">(false);

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

    if (formData.senha_nova !== formData.senha_confirma) {
      toast.error("As senhas não correspondem");
      setIsLoading("error");
      return;
    }

    const passwordData: PasswordUpdateData = {
      senha_antiga: formData.senha_antiga,
      senha_nova: formData.senha_nova,
    };

    try {
      const response = await updatePassword(passwordData);
      console.log("Password update response:", response);

      if (response === true) {
        toast.success("Senha alterada com sucesso");
        setFormData({
          senha_antiga: "",
          senha_nova: "",
          senha_confirma: "",
        });
      } else if (response && typeof response === "object") {
        console.log("Error response:", response);
        toast.error(response.string || "Erro ao alterar a senha");
        setIsLoading("error");
      } else {
        toast.error("Erro ao alterar a senha");
        setIsLoading("error");
      }
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      toast.error("Ocorreu um erro ao alterar a senha");
      setIsLoading("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Alterar Senha</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="senha_antiga">Senha Atual</Label>
            <Input
              id="senha_antiga"
              name="senha_antiga"
              type="password"
              value={formData.senha_antiga}
              onChange={handleChange}
              disabled={isLoading === true}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha_nova">Nova Senha</Label>
            <Input
              id="senha_nova"
              name="senha_nova"
              type="password"
              value={formData.senha_nova}
              onChange={handleChange}
              disabled={isLoading === true}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha_confirma">Confirmar Nova Senha</Label>
            <Input
              id="senha_confirma"
              name="senha_confirma"
              type="password"
              value={formData.senha_confirma}
              onChange={handleChange}
              disabled={isLoading === true}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading === true}>
            {isLoading === true
              ? "Salvando..."
              : isLoading === "error"
              ? "Erro"
              : "Alterar Senha"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
