
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSoftwareCredential, useSaveSoftwareCredential } from '@/services/credentialsService';
import { toast } from 'sonner';
import { SoftwareCredential } from '@/types';

const SoftwareForm = () => {
  const [softwareName, setSoftwareName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  
  const { data: savedCredential, isLoading } = useSoftwareCredential();
  const saveMutation = useSaveSoftwareCredential();

  // Charger les identifiants sauvegardés lorsque les données sont disponibles
  useEffect(() => {
    if (savedCredential) {
      setSoftwareName(savedCredential.softwareName);
      setUsername(savedCredential.username);
      setPassword(savedCredential.password);
      setUrl(savedCredential.url);
    }
  }, [savedCredential]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!softwareName || !username || !password || !url) {
      toast.error('Veuillez renseigner tous les champs');
      return;
    }
    
    saveMutation.mutate({
      softwareName,
      username,
      password,
      url
    }, {
      onSuccess: () => {
        toast.success('Informations du logiciel enregistrées avec succès');
      },
      onError: () => {
        toast.error('Une erreur est survenue lors de l\'enregistrement');
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Informations du logiciel de gestion</h3>
      
      {isLoading ? (
        <p className="text-sm text-gray-500">Chargement...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="softwareName">Nom du logiciel</Label>
            <Input
              id="softwareName"
              value={softwareName}
              onChange={(e) => setSoftwareName(e.target.value)}
              placeholder="Nom du logiciel de gestion"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">URL du logiciel</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemple.com"
              required
            />
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
            {saveMutation.isPending ? 'Enregistrement...' : 'Enregistrer les informations'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default SoftwareForm;
