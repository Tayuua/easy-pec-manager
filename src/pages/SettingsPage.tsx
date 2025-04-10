
import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import MutuelleForm from '@/components/settings/MutuelleForm';
import SoftwareForm from '@/components/settings/SoftwareForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPage = () => {
  return (
    <PageContainer
      title="Paramètres"
      subtitle="Configurez vos identifiants et accès"
    >
      <Tabs defaultValue="mutuelles" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="mutuelles">Réseaux mutuelles</TabsTrigger>
          <TabsTrigger value="software">Logiciel de gestion</TabsTrigger>
        </TabsList>
        
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
