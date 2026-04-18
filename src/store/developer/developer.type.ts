import { ErrorResponse, SuccessResponse } from '@/types/api.types';

export interface SchoolAdmin {
  userId: string;
  name: string;
  email: string;
  status: string;
  phone?: string;
}

export interface School {
  schoolId: string;
  name: string;
  subdomain: string;
  board: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  admin: SchoolAdmin;
}

export interface FetchSchoolsData {
  schools: School[];
}

export type FetchSchoolsResponse = SuccessResponse<FetchSchoolsData> | ErrorResponse;
