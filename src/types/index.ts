
export type RequestStatus = "pending" | "validated" | "rejected";

export interface PECRequest {
  id: string;
  patientId: string;
  patientName: string;
  createdAt: string;
  status: RequestStatus;
  description?: string;
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
