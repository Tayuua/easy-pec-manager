export type RequestStatus = "pending" | "validated" | "rejected";

export interface PECRequest {
  id: string;
  patientId: string;
  patientName: string;
  createdAt: string;
  status: RequestStatus;
  description?: string;
  validatedAt?: string;
  mutuelle?: string;
  shopId?: string;
}

export interface MutuelleCredential {
  name: string;
  username: string;
  password: string;
}

export interface SoftwareCredential {
  softwareName: string;
  username: string;
  password: string;
  url: string;
}

// Nouveaux types API

export interface Company {
  id: string;
  legalLabel: string;
  holdingId?: string;
  modifiedAt: string;
}

export interface SubCompany {
  id: string;
  legalLabel: string;
  companiesId: string;
  siret: string;
  rcs: string;
  capitalStock: string;
  legalAddress: string;
  legalZipCode: string;
  legalCity: string;
  vatNumber: string;
}

export interface Shop {
  id: string;
  label: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  finess: string;
  createdAt: string;
  modifiedAt: string;
  idCompanies: string;
  timezone: string;
  idSpeciality?: string;
  softwareId?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  idLaboratory?: string;
  rpps?: string;
  adeli?: string;
  userRole: string;
  modifiedAt: string;
  createdAt: string;
}

export interface Network {
  id: string;
  label: string;
}

export interface AMC {
  id: string;
  label: string;
  networkId: string;
}

export interface Software {
  id: string;
  label: string;
}

export interface Speciality {
  id: string;
  label: string;
}

export interface Automation {
  id: string;
  softwareId?: string;
  openRpaId: string;
  specialityId: string;
  networkId?: string;
  comment: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthRank: string;
  dateOfDeath?: string;
  archived: boolean;
  email: string;
  gender: string;
  idLaboratory?: string;
  idPatientSoftware: string;
  networkId?: string;
  amcId?: string;
  secuNumber: string;
  cecite: boolean;
  secuPercentage: number;
  isChild: boolean;
  mutuelleContractNumber: string;
  memberNumber: string;
  amoAmount: number;
  createdAt: string;
  modifiedAt: string;
}

export interface Prescriber {
  id: string;
  firstName: string;
  lastName: string;
  rpps: string;
  finess?: string;
  adeli?: string;
  address: string;
  city: string;
  zipCode: string;
  category: string;
  gender: string;
  phone: string;
  companiesId: string;
}

export interface Prescription {
  id: string;
  createdAt: string;
  adviceDate: string;
  patientId: string;
  prescriberId: string;
  type: string;
}

export interface RefundMutualInsurance {
  id: string;
  patientId: string;
  prescriptionId: string;
  deviceClass: string;
  brand: string;
  supplier: string;
  hearingAidRate: number;
  quoteNumber: string;
  hearingAidName: string;
  numberOfEars: number;
  lppLeftEar: string;
  lppRightEar: string;
  mailAccessKey?: string;
  requestDate: string;
}
