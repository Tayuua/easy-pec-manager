
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addRequest } from '@/services/pecRequestService';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const RequestForm = () => {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId.trim() || !patientName.trim()) {
      toast.error('Veuillez renseigner tous les champs obligatoires');
      return;
    }

    setIsLoading(true);

    try {
      const newRequest = addRequest(patientId, patientName, description);
      toast.success('Demande de PEC créée avec succès');
      
      // Reset form
      setPatientId('');
      setPatientName('');
      setDescription('');
    } catch (error) {
      toast.error('Une erreur est survenue lors de la création de la demande');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Nouvelle demande de PEC</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientId">ID Patient *</Label>
            <Input
              id="patientId"
              placeholder="Entrez l'identifiant du patient"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="patientName">Nom du Patient *</Label>
            <Input
              id="patientName"
              placeholder="Entrez le nom du patient"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (optionnel)</Label>
            <Textarea
              id="description"
              placeholder="Détails supplémentaires de la demande"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Création en cours...' : 'Créer la demande'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RequestForm;
