
import { PECRequest, RequestStatus } from '@/types';
import { api, ApiResponse, PaginatedResponse } from './apiService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Endpoints API
const API_ENDPOINTS = {
  requests: '/requests',
};

// Obtenir toutes les demandes PEC
export const getAllRequests = async (): Promise<PECRequest[]> => {
  // Utilisation temporaire de localStorage jusqu'à la connexion à l'API
  const saved = localStorage.getItem('easypec-requests');
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
  
  // Code pour l'API (à décommenter lorsque l'API est prête)
  // return api.get<PaginatedResponse<PECRequest>>(API_ENDPOINTS.requests)
  //   .then(response => response.data);
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
