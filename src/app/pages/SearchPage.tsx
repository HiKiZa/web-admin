import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent } from "@/app/components/ui/card";
import { Container } from "@/app/components/ui/container";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { toast } from "sonner";
import { UserResult } from "@/types/auth";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResult | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    usu_id: 0,
    usu_nome: "",
    usu_email: "",
    usu_telefone: "",
    usu_dtNasc: new Date(),
  });

  const { getUsers, updateUser } = useAuth();

  const sortUsersByID = (users: UserResult[] | null) => {
    if (!users) return [];
    if (!Array.isArray(users)) return [];
    if (users.length === 0) return [];

    if (!("usu_id" in users[0])) return users;

    return [...users].sort((a, b) => a.usu_id - b.usu_id);
  };

  useEffect(() => {
    const fetchInitialResults = async () => {
      setLoading(true);
      try {
        const response = await getUsers();
        const sortedUsers = sortUsersByID(response);
        setResults(sortedUsers);
        setFilteredResults(sortedUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários iniciais:", error);
        setResults([]);
        setFilteredResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialResults();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setFilteredResults(
        results.filter((user: UserResult) => {
          const searchTermLower = searchTerm.toLowerCase();
          return (
            user.usu_nome.toLowerCase().includes(searchTermLower) ||
            user.usu_email.toLowerCase().includes(searchTermLower) ||
            user.usu_telefone.includes(searchTerm)
          );
        })
      );
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, results]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await updateUser(editFormData);
    if (result) {
      toast.success("Usuário atualizado com sucesso");
      const response = await getUsers();
      const sortedUsers = sortUsersByID(response);
      setResults(sortedUsers);
      setFilteredResults(sortedUsers);
    } else {
      toast.error("Erro ao atualizar usuário");
    }

    setIsEditing(false);
  };

  return (
    <Container>
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4 text-foreground">
          Pesquisar Usuários
        </h1>
        <Input
          placeholder="Pesquisar"
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading && <p>Carregando...</p>}

        {results && (
          <div className="grid gap-4 mt-4">
            {filteredResults.map((user: UserResult, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold">{user.usu_nome}</h2>
                  <p className="text-gray-600">{user.usu_email}</p>
                  <p className="text-gray-400">Telefone: {user.usu_telefone}</p>
                  <p className="text-gray-400">
                    Data de Nascimento:{" "}
                    {user.usu_dtNasc
                      ? new Date(user.usu_dtNasc).toLocaleDateString("pt-BR")
                      : "N/A"}
                  </p>

                  {user.usu_id && (
                    <Dialog
                      open={isEditing && selectedUser?.usu_id === user.usu_id}
                      onOpenChange={(open) => {
                        setIsEditing(open);
                        if (open) {
                          setSelectedUser(user);
                          setEditFormData({
                            usu_id: user.usu_id,
                            usu_nome: user.usu_nome,
                            usu_email: user.usu_email,
                            usu_telefone: user.usu_telefone,
                            usu_dtNasc: user.usu_dtNasc,
                          });
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button className="mt-4">Alterar Usuário</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Usuário</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="usu_nome">Nome</Label>
                            <Input
                              id="usu_nome"
                              name="usu_nome"
                              value={editFormData.usu_nome}
                              onChange={handleEditChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="usu_email">Email</Label>
                            <Input
                              id="usu_email"
                              name="usu_email"
                              type="email"
                              value={editFormData.usu_email}
                              onChange={handleEditChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="usu_telefone">Telefone</Label>
                            <Input
                              id="usu_telefone"
                              name="usu_telefone"
                              value={editFormData.usu_telefone}
                              onChange={handleEditChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="usu_dtNasc">
                              Data de Nascimento
                            </Label>
                            <Input
                              id="usu_dtNasc"
                              name="usu_dtNasc"
                              type="date"
                              value={
                                editFormData.usu_dtNasc
                                  ? new Date(editFormData.usu_dtNasc)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={handleEditChange}
                            />
                          </div>

                          <Button type="submit">Salvar Alterações</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
