import { PECRequest, RequestStatus } from '@/types';
import { api, ApiResponse, PaginatedResponse } from './apiService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Sample data for testing
const sampleData: PECRequest[] = [
  {
    id: '1',
    patientId: 'P001',
    patientName: 'Jean Dupont',
    createdAt: '2024-04-10T10:00:00Z',
    status: 'validated',
    description: 'Consultation dentaire',
    shopId: 'lab1',
    mutuelle: 'Harmonie',
    validatedAt: '2024-04-11T14:30:00Z',
  },
  {
    id: '2',
    patientId: 'P002',
    patientName: 'Marie Martin',
    createdAt: '2024-04-11T09:00:00Z',
    status: 'rejected',
    description: 'Prothèse dentaire',
    shopId: 'lab2',
    mutuelle: 'MGEN',
    validatedAt: '2024-04-12T11:20:00Z',
  },
  {
    id: '3',
    patientId: 'P003',
    patientName: 'Pierre Durant',
    createdAt: '2024-04-12T14:00:00Z',
    status: 'pending',
    description: 'Implant dentaire',
    shopId: 'lab1',
    mutuelle: 'Harmonie',
  },
  {
    id: '4',
    patientId: 'P004',
    patientName: 'Sophie Bernard',
    createdAt: '2024-04-13T11:00:00Z',
    status: 'validated',
    description: 'Couronne dentaire',
    shopId: 'lab2',
    mutuelle: 'MGEN',
    validatedAt: '2024-04-14T16:45:00Z',
  },
  {
    id: '5',
    patientId: 'P005',
    patientName: 'Luc Petit',
    createdAt: '2024-04-14T13:30:00Z',
    status: 'rejected',
    description: 'Bridge dentaire',
    shopId: 'lab1',
    mutuelle: 'AXA',
    validatedAt: '2024-04-15T09:15:00Z',
  }
];

// Endpoints API
const API_ENDPOINTS = {
  requests: '/requests',
};

// Obtenir toutes les demandes PEC
export const getAllRequests = async (): Promise<PECRequest[]> => {
  // Version temporaire avec données de test
  return sampleData;
};

// Ajouter une nouvelle demande PEC
export const addRequest = async (
  patientId: string, 
  patientName: string, 
  description?: string
): Promise<PECRequest> => {
  // Version localStorage (temporaire)
  const newRequest = {
    id: crypto.randomUUID(),
    patientId,
    patientName,
    createdAt: new Date().toISOString(),
    status: 'pending' as RequestStatus,
    description,
  };

  const requests = await getAllRequests();
  const updatedRequests = [...requests, newRequest];
  localStorage.setItem('easypec-requests', JSON.stringify(updatedRequests));
  
  return newRequest;
  
  // Version API (à décommenter lorsque l'API est prête)
  // return api.post<ApiResponse<PECRequest>>(API_ENDPOINTS.requests, {
  //   patientId,
  //   patientName,
  //   description
  // }).then(response => response.data);
};

// Mettre à jour l'état d'une demande PEC
export const updateRequestStatus = async (id: string, status: RequestStatus): Promise<PECRequest | null> => {
  // Version localStorage (temporaire)
  const requests = await getAllRequests();
  const requestIndex = requests.findIndex(r => r.id === id);
  
  if (requestIndex === -1) {
    return null;
  }
  
  const updatedRequest = { ...requests[requestIndex], status };
  const updatedRequests = [...requests];
  updatedRequests[requestIndex] = updatedRequest;
  
  localStorage.setItem('easypec-requests', JSON.stringify(updatedRequests));
  
  return updatedRequest;
  
  // Version API (à décommenter lorsque l'API est prête)
  // return api.patch<ApiResponse<PECRequest>>(`${API_ENDPOINTS.requests}/${id}`, {
  //   status
  // }).then(response => response.data);
};

// Obtenir une demande PEC par ID
export const getRequestById = async (id: string): Promise<PECRequest | undefined> => {
  // Version localStorage (temporaire)
  const requests = await getAllRequests();
  return requests.find(r => r.id === id);
  
  // Version API (à décommenter lorsque l'API est prête)
  // return api.get<ApiResponse<PECRequest>>(`${API_ENDPOINTS.requests}/${id}`)
  //   .then(response => response.data);
};

// Supprimer une demande PEC
export const deleteRequest = async (id: string): Promise<boolean> => {
  // Version localStorage (temporaire)
  const requests = await getAllRequests();
  const updatedRequests = requests.filter(r => r.id !== id);
  
  if (updatedRequests.length === requests.length) {
    return false; // Rien n'a été supprimé
  }
  
  localStorage.setItem('easypec-requests', JSON.stringify(updatedRequests));
  return true;
  
  // Version API (à décommenter lorsque l'API est prête)
  // return api.delete<ApiResponse<void>>(`${API_ENDPOINTS.requests}/${id}`)
  //   .then(() => true)
  //   .catch(() => false);
};

// Hooks React Query pour les demandes PEC
export const useRequests = () => {
  return useQuery({
    queryKey: ['requests'],
    queryFn: getAllRequests
  });
};

export const useRequest = (id: string) => {
  return useQuery({
    queryKey: ['requests', id],
    queryFn: () => getRequestById(id),
    enabled: !!id
  });
};

export const useAddRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ patientId, patientName, description }: { 
      patientId: string, 
      patientName: string, 
      description?: string 
    }) => {
      return addRequest(patientId, patientName, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    }
  });
};

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string, status: RequestStatus }) => {
      return updateRequestStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    }
  });
};

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => {
      return deleteRequest(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    }
  });
};
