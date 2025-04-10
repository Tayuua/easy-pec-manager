
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import RequestsTable from '@/components/pec/RequestsTable';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RequestsPage = () => {
  const navigate = useNavigate();
  
  return (
    <PageContainer
      title="Demandes de PEC"
      subtitle="Gérez vos demandes de prise en charge"
    >
      <div className="flex justify-end mb-6">
        <Button onClick={() => navigate('/requests/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvelle demande
        </Button>
      </div>
      
      <RequestsTable />
    </PageContainer>
  );
};

export default RequestsPage;
