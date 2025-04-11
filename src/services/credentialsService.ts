
import { MutuelleCredential, SoftwareCredential } from '@/types';
import { api, ApiResponse } from './apiService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Endpoints API
const API_ENDPOINTS = {
  mutuelles: '/credentials/mutuelles',
  software: '/credentials/software',
};

// Opérations pour les identifiants des mutuelles
export const getMutuelleCredentials = async (): Promise<MutuelleCredential[]> => {
  // Utilisation temporaire de localStorage jusqu'à la connexion à l'API
  const saved = localStorage.getItem('easypec-mutuelles');
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
  
  // Code pour l'API (à décommenter lorsque l'API est prête)
  // return api.get<ApiResponse<MutuelleCredential[]>>(API_ENDPOINTS.mutuelles)
  //   .then(response => response.data);
};

export const saveMutuelleCredential = async (credential: MutuelleCredential): Promise<void> => {
  // Version localStorage (temporaire)
  const credentials = await getMutuelleCredentials();
  const existingIndex = credentials.findIndex(c => c.name === credential.name);
  
  if (existingIndex !== -1) {
    // Mettre à jour un identifiant existant
    credentials[existingIndex] = credential;
  } else {
    // Ajouter un nouvel identifiant
    credentials.push(credential);
  }
  
  localStorage.setItem('easypec-mutuelles', JSON.stringify(credentials));
  
  // Version API (à décommenter lorsque l'API est prête)
  // return api.post<ApiResponse<void>>(API_ENDPOINTS.mutuelles, credential);
};

export const deleteMutuelleCredential = async (name: string): Promise<boolean> => {
  // Version localStorage (temporaire)
  const credentials = await getMutuelleCredentials();
  const updatedCredentials = credentials.filter(c => c.name !== name);
  
  if (updatedCredentials.length === credentials.length) {
    return false; // Rien n'a été supprimé
  }
  
  localStorage.setItem('easypec-mutuelles', JSON.stringify(updatedCredentials));
  return true;
  
  // Version API (à décommenter lorsque l'API est prête)
  // return api.delete<ApiResponse<void>>(`${API_ENDPOINTS.mutuelles}/${name}`)
  //   .then(() => true)
  //   .catch(() => false);
};

// Opérations pour les identifiants du logiciel
export const getSoftwareCredential = async (): Promise<SoftwareCredential | null> => {
  // Version localStorage (temporaire)
  const saved = localStorage.getItem('easypec-software');
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
  
  // Version API (à décommenter lorsque l'API est prête)
  // return api.get<ApiResponse<SoftwareCredential>>(API_ENDPOINTS.software)
  //   .then(response => response.data)
  //   .catch(() => null);
};

export const saveSoftwareCredential = async (credential: SoftwareCredential): Promise<void> => {
  // Version localStorage (temporaire)
  localStorage.setItem('easypec-software', JSON.stringify(credential));
  
  // Version API (à décommenter lorsque l'API est prête)
  // return api.post<ApiResponse<void>>(API_ENDPOINTS.software, credential);
};

// Hooks React Query pour les mutuelles
export const useMutuelleCredentials = () => {
  return useQuery({
    queryKey: ['mutuelle-credentials'],
    queryFn: getMutuelleCredentials
  });
};

export const useSaveMutuelleCredential = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credential: MutuelleCredential) => {
      return saveMutuelleCredential(credential);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mutuelle-credentials'] });
    }
  });
};

export const useDeleteMutuelleCredential = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (name: string) => {
      return deleteMutuelleCredential(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mutuelle-credentials'] });
    }
  });
};

// Hooks React Query pour le logiciel
export const useSoftwareCredential = () => {
  return useQuery({
    queryKey: ['software-credential'],
    queryFn: getSoftwareCredential
  });
};

export const useSaveSoftwareCredential = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credential: SoftwareCredential) => {
      return saveSoftwareCredential(credential);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['software-credential'] });
    }
  });
};
