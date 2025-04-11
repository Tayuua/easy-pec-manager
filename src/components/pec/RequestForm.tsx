
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAddRequest } from '@/services/pecRequestService';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const RequestForm = () => {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [description, setDescription] = useState('');
  
  const navigate = useNavigate();
  const addRequestMutation = useAddRequest();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId.trim() || !patientName.trim()) {
      toast.error('Veuillez renseigner tous les champs obligatoires');
      return;
    }

    addRequestMutation.mutate({
      patientId,
      patientName,
      description
    }, {
      onSuccess: () => {
        toast.success('Demande de PEC créée avec succès');
        
        // Réinitialiser le formulaire
        setPatientId('');
        setPatientName('');
        setDescription('');
        
        // Rediriger vers la liste des demandes
        navigate('/requests');
      },
      onError: () => {
        toast.error("Une erreur est survenue lors de la création de la demande");
      }
    });
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
          <Button 
            type="submit" 
            className="w-full" 
            disabled={addRequestMutation.isPending}
          >
            {addRequestMutation.isPending ? 'Création en cours...' : 'Créer la demande'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RequestForm;
