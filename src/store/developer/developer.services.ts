import { apiClient } from '@/lib/api-client';
import { FetchSchoolsResponse } from './developer.type';
import { ErrorResponse } from '@/types/api.types';

const developerService = {
  fetchSchools: async () =>
    await apiClient.get<FetchSchoolsResponse | ErrorResponse>('/developer/schools'),
};

export default developerService;
