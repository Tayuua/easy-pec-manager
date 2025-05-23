
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutuelleCredentials, useSaveMutuelleCredential } from '@/services/credentialsService';
import { toast } from 'sonner';
import { MutuelleCredential } from '@/types';

const MUTUELLE_NETWORKS = [
  "CARTE BLANCHE",
  "ITELIS",
  "OXANTIS",
  "SOLIMUT",
  "VIAMEDIS",
  "SEVEANE",
  "APREVA",
  "ADREA",
  "EOVI",
  "TPPLUS",
  "SANTECLAIR",
  "ALMERYS",
  "ISANTE",
  "GRAS SAVOYE"
];

const MutuelleForm = () => {
  const [selectedMutuelle, setSelectedMutuelle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Utiliser les hooks React Query au lieu des appels directs à l'API
  const { data: savedCredentials = [], isLoading: isLoadingCredentials } = useMutuelleCredentials();
  const saveMutation = useSaveMutuelleCredential();

  const handleSelectMutuelle = (value: string) => {
    setSelectedMutuelle(value);
    
    // Check if we already have credentials for this mutuelle
    const existing = savedCredentials.find(c => c.name === value);
    if (existing) {
      setUsername(existing.username);
      setPassword(existing.password);
    } else {
      setUsername('');
      setPassword('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMutuelle || !username || !password) {
      toast.error('Veuillez renseigner tous les champs');
      return;
    }
    
    saveMutation.mutate({
      name: selectedMutuelle,
      username,
      password
    }, {
      onSuccess: () => {
        toast.success('Identifiants enregistrés avec succès');
        // Pas besoin de recharger manuellement les données, React Query s'en charge automatiquement
      },
      onError: () => {
        toast.error('Une erreur est survenue lors de l\'enregistrement');
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Identifiants des réseaux mutuelles</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mutuelle">Réseau mutuelle</Label>
          <Select value={selectedMutuelle} onValueChange={handleSelectMutuelle}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un réseau" />
            </SelectTrigger>
            <SelectContent>
              {MUTUELLE_NETWORKS.map((network) => (
                <SelectItem key={network} value={network}>
                  {network}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Entrez votre nom d'utilisateur"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        
        <Button type="submit" disabled={saveMutation.isPending} className="w-full">
          {saveMutation.isPending ? 'Enregistrement...' : 'Enregistrer les identifiants'}
        </Button>
      </form>
      
      <div className="mt-8">
        <h4 className="font-medium text-sm text-gray-500 mb-2">Réseaux enregistrés</h4>
        {isLoadingCredentials ? (
          <p className="text-sm text-gray-500">Chargement...</p>
        ) : savedCredentials.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun identifiant enregistré</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {savedCredentials.map((cred) => (
              <div key={cred.name} className="border rounded p-2 text-sm">
                <span className="font-medium">{cred.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MutuelleForm;
