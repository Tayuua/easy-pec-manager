
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const ROLES = [
  "Manager",
  "Manager laboratoire",
  "Audioprothésiste",
  "Assistante"
] as const;

const UserForm = () => {
  const [users, setUsers] = useState([
    {
      id: "1",
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@audiowizard.fr",
      role: "Manager"
    }
  ]);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Liste des utilisateurs</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ajouter un utilisateur</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nouvel utilisateur</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Rôle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="mt-4">Enregistrer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" size="sm">Modifier</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Mot de passe</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier le mot de passe</DialogTitle>
                    </DialogHeader>
                    <form className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <Button type="submit">Modifier le mot de passe</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserForm;
