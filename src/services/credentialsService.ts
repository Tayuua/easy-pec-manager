
import { MutuelleCredential, SoftwareCredential } from '@/types';

// Storage keys
const MUTUELLES_KEY = 'easypec-mutuelles';
const SOFTWARE_KEY = 'easypec-software';

// Mutuelle credentials operations
export const getMutuelleCredentials = (): MutuelleCredential[] => {
  const saved = localStorage.getItem(MUTUELLES_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

export const saveMutuelleCredential = (credential: MutuelleCredential): void => {
  const credentials = getMutuelleCredentials();
  const existingIndex = credentials.findIndex(c => c.name === credential.name);
  
  if (existingIndex !== -1) {
    // Update existing credential
    credentials[existingIndex] = credential;
  } else {
    // Add new credential
    credentials.push(credential);
  }
  
  localStorage.setItem(MUTUELLES_KEY, JSON.stringify(credentials));
};

export const deleteMutuelleCredential = (name: string): boolean => {
  const credentials = getMutuelleCredentials();
  const updatedCredentials = credentials.filter(c => c.name !== name);
  
  if (updatedCredentials.length === credentials.length) {
    return false; // Nothing was deleted
  }
  
  localStorage.setItem(MUTUELLES_KEY, JSON.stringify(updatedCredentials));
  return true;
};

// Software credentials operations
export const getSoftwareCredential = (): SoftwareCredential | null => {
  const saved = localStorage.getItem(SOFTWARE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
};

export const saveSoftwareCredential = (credential: SoftwareCredential): void => {
  localStorage.setItem(SOFTWARE_KEY, JSON.stringify(credential));
};
