
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

interface Company {
  id: string;
  socialReason: string;
  nafCode: string;
  iban: string;
  siret: string;
  rcs: string;
  capital: string;
  tva: string;
}

const CompanyForm = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      socialReason: "AudioWizard Lyon",
      nafCode: "4774Z",
      iban: "FR76 3000 1007 1234 5678 9012 345",
      siret: "12345678901234",
      rcs: "Lyon B 123 456 789",
      capital: "50000",
      tva: "FR12345678901",
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<Partial<Company>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCompany) {
      setCompanies(companies.map(company => 
        company.id === editingCompany.id ? { ...company, ...formData } : company
      ));
      toast.success("Société modifiée avec succès");
    } else {
      setCompanies([...companies, {
        id: Date.now().toString(),
        ...formData as Company
      }]);
      toast.success("Société ajoutée avec succès");
    }
    setIsOpen(false);
    setEditingCompany(null);
    setFormData({});
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setFormData(company);
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Liste des sociétés</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingCompany(null);
              setFormData({});
            }}>
              Ajouter une société
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingCompany ? "Modifier la société" : "Nouvelle société"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="socialReason">Raison sociale</Label>
                <Input 
                  id="socialReason" 
                  value={formData.socialReason || ""} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nafCode">Code NAF</Label>
                  <Input 
                    id="nafCode" 
                    value={formData.nafCode || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="iban">IBAN</Label>
                  <Input 
                    id="iban" 
                    value={formData.iban || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="siret">SIRET</Label>
                  <Input 
                    id="siret" 
                    value={formData.siret || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rcs">RCS</Label>
                  <Input 
                    id="rcs" 
                    value={formData.rcs || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="capital">Capital social</Label>
                  <Input 
                    id="capital" 
                    type="number" 
                    value={formData.capital || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tva">N° TVA</Label>
                  <Input 
                    id="tva" 
                    value={formData.tva || ""} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">
                {editingCompany ? "Enregistrer les modifications" : "Ajouter"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Raison sociale</TableHead>
            <TableHead>Code NAF</TableHead>
            <TableHead>IBAN</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.socialReason}</TableCell>
              <TableCell>{company.nafCode}</TableCell>
              <TableCell>{company.iban}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(company)}
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

export default CompanyForm;
