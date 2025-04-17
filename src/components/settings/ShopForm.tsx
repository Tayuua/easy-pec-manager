
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const ShopForm = () => {
  const [shops, setShops] = useState([
    {
      id: "1",
      name: "Magasin Lyon Centre",
      company: "AudioWizard Lyon",
      address: "15 rue de la République",
      zipCode: "69001",
      city: "Lyon",
      phone: "0472000000",
      email: "lyon@audiowizard.fr",
      finess: "123456789"
    }
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Liste des magasins</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ajouter un magasin</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nouveau magasin</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="company">Société</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une société" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">AudioWizard Lyon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Nom du magasin</Label>
                <Input id="name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="zipCode">Code postal</Label>
                  <Input id="zipCode" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="finess">N° FINESS</Label>
                  <Input id="finess" />
                </div>
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
            <TableHead>Société</TableHead>
            <TableHead>Ville</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shops.map((shop) => (
            <TableRow key={shop.id}>
              <TableCell>{shop.name}</TableCell>
              <TableCell>{shop.company}</TableCell>
              <TableCell>{shop.city}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Modifier</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShopForm;
