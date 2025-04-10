
import { RequestStatus } from '@/types';
import { cn } from '@/lib/utils';

interface RequestStatusBadgeProps {
  status: RequestStatus;
}

const RequestStatusBadge: React.FC<RequestStatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    pending: {
      label: 'En cours',
      classes: 'bg-easypec-orange/10 text-easypec-orange'
    },
    validated: {
      label: 'Validé',
      classes: 'bg-easypec-green/10 text-easypec-green'
    },
    rejected: {
      label: 'Refusé',
      classes: 'bg-easypec-red/10 text-easypec-red'
    }
  };

  const config = statusConfig[status];
  
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', config.classes)}>
      {config.label}
    </span>
  );
};

export default RequestStatusBadge;
