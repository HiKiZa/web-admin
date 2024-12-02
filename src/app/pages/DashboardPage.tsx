import { Activity, DollarSign, Folder, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

// TODO: dashboard estatico para teste
export const DashboardPage = () => (
  <div className="space-y-8">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-2">
            <h3 className="text-sm font-medium">Total de Usuários</h3>
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-green-500">+12.5%</div>
          </div>
          <p className="text-xs text-muted-foreground">+15 de último mês</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-2">
            <h3 className="text-sm font-medium">Sessões Ativas</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">342</div>
            <div className="text-sm text-green-500">+4.3%</div>
          </div>
          <p className="text-xs text-muted-foreground">+23 de hoje</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-2">
            <h3 className="text-sm font-medium">Total de Receita</h3>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">R$ 45,231</div>
            <div className="text-sm text-red-500">-2.5%</div>
          </div>
          <p className="text-xs text-muted-foreground">-R$ 1,200 de último mês</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-2">
            <h3 className="text-sm font-medium">Projetos Ativos</h3>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-green-500">+2</div>
          </div>
          <p className="text-xs text-muted-foreground">2 completados este mês</p>
        </CardContent>
      </Card>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "Novo registro de usuário",
                time: "2 minutos atrás",
              },
              {
                action: "Pagamento processado",
                time: "1 hora atrás",
              },
              {
                action: "Projeto concluído",
                time: "2 horas atrás",
              },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="size-2 rounded-full bg-primary" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "Uso da CPU", value: 15 },
              { label: "Uso de Memória", value: 45 },
              { label: "Uso de Armazenamento", value: 60 },
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{metric.label}</p>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold">{metric.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
); 