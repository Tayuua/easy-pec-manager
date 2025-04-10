
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { FileCheck, Settings, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: 'Demandes de PEC',
      description: 'Créez et gérez vos demandes de prise en charge',
      icon: <FileCheck className="h-8 w-8 text-easypec-blue" />,
      action: () => navigate('/requests')
    },
    {
      title: 'Paramètres',
      description: 'Configurez vos identifiants mutuelles et logiciel',
      icon: <Settings className="h-8 w-8 text-easypec-blue" />,
      action: () => navigate('/settings')
    }
  ];
  
  return (
    <PageContainer
      title="Easy PEC"
      subtitle="La solution simple pour gérer vos demandes de prise en charge"
    >
      <div className="mt-8 text-center max-w-2xl mx-auto">
        <img 
          src="/lovable-uploads/53b2c257-fe70-40fc-ba94-a1b78cdd18ac.png" 
          alt="Easy PEC Workflow" 
          className="mx-auto max-h-48 mb-8 object-contain"
        />
        
        <h2 className="text-xl font-medium text-gray-800 mb-6">
          Simplifiez la gestion de vos demandes de prise en charge
        </h2>
        
        <Button onClick={() => navigate('/requests/new')} size="lg">
          Nouvelle demande de PEC
        </Button>
      </div>
      
      <div className="mt-16">
        <h3 className="text-xl font-medium text-center mb-8">Fonctionnalités</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={feature.action}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="bg-easypec-lightblue p-3 rounded-full">{feature.icon}</div>
                  <div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={feature.action}>
                  Accéder
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
