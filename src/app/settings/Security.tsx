import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import ChangePassword from "./ChangePassword";

const Security = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Segurança</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Senha</h3>
          <p className="text-sm text-muted-foreground">
            Altere sua senha para manter sua conta segura
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Alterar Senha</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Alterar Senha
              </DialogTitle>
            </DialogHeader>
            <ChangePassword />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Security; 