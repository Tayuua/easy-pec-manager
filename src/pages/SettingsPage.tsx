
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MutuelleForm from '@/components/settings/MutuelleForm';
import SoftwareForm from '@/components/settings/SoftwareForm';
import HoldingForm from '@/components/settings/HoldingForm';
import CompanyForm from '@/components/settings/CompanyForm';
import ShopForm from '@/components/settings/ShopForm';
import UserForm from '@/components/settings/UserForm';

const SettingsPage = () => {
  return (
    <PageContainer
      title="Paramètres"
      subtitle="Configurez vos identifiants et accès"
    >
      <Tabs defaultValue="holding" className="w-full">
        <TabsList className="grid w-full max-w-4xl grid-cols-6 mb-8">
          <TabsTrigger value="holding">Holding</TabsTrigger>
          <TabsTrigger value="companies">Sociétés</TabsTrigger>
          <TabsTrigger value="shops">Magasins</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="mutuelles">Mutuelles</TabsTrigger>
          <TabsTrigger value="software">Logiciel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="holding" className="mt-0">
          <HoldingForm />
        </TabsContent>
        
        <TabsContent value="companies" className="mt-0">
          <CompanyForm />
        </TabsContent>
        
        <TabsContent value="shops" className="mt-0">
          <ShopForm />
        </TabsContent>
        
        <TabsContent value="users" className="mt-0">
          <UserForm />
        </TabsContent>
        
        <TabsContent value="mutuelles" className="mt-0">
          <MutuelleForm />
        </TabsContent>
        
        <TabsContent value="software" className="mt-0">
          <SoftwareForm />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SettingsPage;
