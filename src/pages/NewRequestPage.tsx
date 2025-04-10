
import PageContainer from '@/components/layout/PageContainer';
import RequestForm from '@/components/pec/RequestForm';

const NewRequestPage = () => {
  return (
    <PageContainer
      title="Nouvelle demande de PEC"
      subtitle="Créez une nouvelle demande de prise en charge"
    >
      <RequestForm />
    </PageContainer>
  );
};

export default NewRequestPage;
