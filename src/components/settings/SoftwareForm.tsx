
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSoftwareCredential, saveSoftwareCredential } from '@/services/credentialsService';
import { toast } from 'sonner';
import { SoftwareCredential } from '@/types';

const SoftwareForm = () => {
  const [softwareName, setSoftwareName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCredential = getSoftwareCredential();
    if (savedCredential) {
      setSoftwareName(savedCredential.softwareName);
      setUsername(savedCredential.username);
      setPassword(savedCredential.password);
      setUrl(savedCredential.url);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!softwareName || !username || !password || !url) {
      toast.error('Veuillez renseigner tous les champs');
      return;
    }
    
    setIsLoading(true);
    
    try {
      saveSoftwareCredential({
        softwareName,
        username,
        password,
        url
      });
      
      toast.success('Informations du logiciel enregistrées avec succès');
    } catch (error) {
      toast.error('Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Informations du logiciel de gestion</h3>
      
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
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Enregistrement...' : 'Enregistrer les informations'}
        </Button>
      </form>
    </div>
  );
};

export default SoftwareForm;
