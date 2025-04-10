
import { useState, useEffect } from 'react';
import { Check, X, Clock, MoreHorizontal, Trash2, RefreshCw } from 'lucide-react';
import { PECRequest, RequestStatus } from '@/types';
import RequestStatusBadge from './RequestStatusBadge';
import { getAllRequests, updateRequestStatus, deleteRequest } from '@/services/pecRequestService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const RequestsTable = () => {
  const [requests, setRequests] = useState<PECRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRequests = () => {
    setIsLoading(true);
    try {
      const data = getAllRequests();
      setRequests(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des demandes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusUpdate = (id: string, status: RequestStatus) => {
    try {
      const updated = updateRequestStatus(id, status);
      if (updated) {
        setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
        toast.success(`État de la demande mis à jour: ${status === 'validated' ? 'Validé' : status === 'rejected' ? 'Refusé' : 'En cours'}`);
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour de la demande');
    }
  };

  const handleDelete = (id: string) => {
    try {
      const success = deleteRequest(id);
      if (success) {
        setRequests(requests.filter(req => req.id !== id));
        toast.success('Demande supprimée avec succès');
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression de la demande');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: fr });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="font-medium">Liste des demandes de PEC</h3>
        <Button variant="outline" size="sm" onClick={loadRequests}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>
      
      {isLoading ? (
        <div className="py-8 text-center">Chargement des demandes...</div>
      ) : requests.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          Aucune demande de PEC trouvée. Créez votre première demande.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Patient</TableHead>
              <TableHead>Nom Patient</TableHead>
              <TableHead>Date Création</TableHead>
              <TableHead>État</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.patientId}</TableCell>
                <TableCell>{request.patientName}</TableCell>
                <TableCell>{formatDate(request.createdAt)}</TableCell>
                <TableCell>
                  <RequestStatusBadge status={request.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleStatusUpdate(request.id, 'pending')}>
                        <Clock className="mr-2 h-4 w-4 text-easypec-orange" />
                        <span>Marquer en cours</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusUpdate(request.id, 'validated')}>
                        <Check className="mr-2 h-4 w-4 text-easypec-green" />
                        <span>Marquer validé</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusUpdate(request.id, 'rejected')}>
                        <X className="mr-2 h-4 w-4 text-easypec-red" />
                        <span>Marquer refusé</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(request.id)}>
                        <Trash2 className="mr-2 h-4 w-4 text-easypec-red" />
                        <span>Supprimer</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default RequestsTable;
