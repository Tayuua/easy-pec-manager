
import { PECRequest, RequestStatus } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Mock storage for PEC requests
const STORAGE_KEY = 'easypec-requests';

// Get all PEC requests
export const getAllRequests = (): PECRequest[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

// Add a new PEC request
export const addRequest = (patientId: string, patientName: string, description?: string): PECRequest => {
  const newRequest: PECRequest = {
    id: uuidv4(),
    patientId,
    patientName,
    createdAt: new Date().toISOString(),
    status: 'pending',
    description,
  };

  const requests = getAllRequests();
  const updatedRequests = [...requests, newRequest];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));
  
  return newRequest;
};

// Update a PEC request status
export const updateRequestStatus = (id: string, status: RequestStatus): PECRequest | null => {
  const requests = getAllRequests();
  const requestIndex = requests.findIndex(r => r.id === id);
  
  if (requestIndex === -1) {
    return null;
  }
  
  const updatedRequest = { ...requests[requestIndex], status };
  const updatedRequests = [...requests];
  updatedRequests[requestIndex] = updatedRequest;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));
  
  return updatedRequest;
};

// Get a PEC request by ID
export const getRequestById = (id: string): PECRequest | undefined => {
  const requests = getAllRequests();
  return requests.find(r => r.id === id);
};

// Delete a PEC request
export const deleteRequest = (id: string): boolean => {
  const requests = getAllRequests();
  const updatedRequests = requests.filter(r => r.id !== id);
  
  if (updatedRequests.length === requests.length) {
    return false; // Nothing was deleted
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));
  return true;
};
