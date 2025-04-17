
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const CompanyForm = () => {
  const [companies, setCompanies] = useState([
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

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Liste des sociétés</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ajouter une société</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nouvelle société</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="socialReason">Raison sociale</Label>
                <Input id="socialReason" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nafCode">Code NAF</Label>
                  <Input id="nafCode" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="iban">IBAN</Label>
                  <Input id="iban" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="siret">SIRET</Label>
                  <Input id="siret" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rcs">RCS</Label>
                  <Input id="rcs" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="capital">Capital social</Label>
                  <Input id="capital" type="number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tva">N° TVA</Label>
                  <Input id="tva" />
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
                <Button variant="outline" size="sm">Modifier</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyForm;
