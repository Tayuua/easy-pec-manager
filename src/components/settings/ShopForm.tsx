
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

interface Shop {
  id: string;
  name: string;
  company: string;
  address: string;
  zipCode: string;
  city: string;
  phone: string;
  email: string;
  finess: string;
}

const ShopForm = () => {
  const [shops, setShops] = useState<Shop[]>([
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

  const [isOpen, setIsOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [formData, setFormData] = useState<Partial<Shop>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      company: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingShop) {
      setShops(shops.map(shop => 
        shop.id === editingShop.id ? { ...shop, ...formData } : shop
      ));
      toast.success("Magasin modifié avec succès");
    } else {
      setShops([...shops, {
        id: Date.now().toString(),
        ...formData as Shop
      }]);
      toast.success("Magasin ajouté avec succès");
    }
    setIsOpen(false);
    setEditingShop(null);
    setFormData({});
  };

  const handleEdit = (shop: Shop) => {
    setEditingShop(shop);
    setFormData(shop);
    setIsOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Liste des magasins</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingShop(null);
              setFormData({});
            }}>
              Ajouter un magasin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingShop ? "Modifier le magasin" : "Nouveau magasin"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="company">Société</Label>
                <Select value={formData.company || ""} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une société" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AudioWizard Lyon">AudioWizard Lyon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Nom du magasin</Label>
                <Input 
                  id="name" 
                  value={formData.name || ""} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input 
                    id="address" 
                    value={formData.address || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input 
                    id="city" 
                    value={formData.city || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="zipCode">Code postal</Label>
                  <Input 
                    id="zipCode" 
                    value={formData.zipCode || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="finess">N° FINESS</Label>
                  <Input 
                    id="finess" 
                    value={formData.finess || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">
                {editingShop ? "Enregistrer les modifications" : "Ajouter"}
              </Button>
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(shop)}
                  className="flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Modifier
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShopForm;
