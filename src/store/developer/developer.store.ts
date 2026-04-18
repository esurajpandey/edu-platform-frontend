import { create } from 'zustand';
import helper from '@/utils/helper';
import developerService from './developer.services';
import { FetchSchoolsResponse, School } from './developer.type';

interface DeveloperState {
  schoolsById: Record<string, School>;
  schoolIds: string[];
  isFetchingSchools: boolean;
  hasFetchedSchools: boolean;
  fetchSchools: () => Promise<FetchSchoolsResponse>;
  clearSchools: () => void;
}

const initialData = {
  schoolsById: {},
  schoolIds: [],
};

export const useDeveloperStore = create<DeveloperState>()((set) => ({
  ...initialData,
  isFetchingSchools: false,
  hasFetchedSchools: false,

  fetchSchools: async () => {
    set({ isFetchingSchools: true });

    try {
      const response = await developerService.fetchSchools();
      const result = helper.successResponse(response, 'Schools fetched successfully');
      const schools = result.data?.schools ?? [];
      const schoolsById = schools.reduce<Record<string, School>>((accumulator, school) => {
        accumulator[school.schoolId] = school;
        return accumulator;
      }, {});

      set({
        schoolsById,
        schoolIds: schools.map((school) => school.schoolId),
        isFetchingSchools: false,
        hasFetchedSchools: true,
      });

      return result;
    } catch (error) {
      set({
        ...initialData,
        isFetchingSchools: false,
        hasFetchedSchools: true,
      });
      return helper.errorResponse(error, 'Failed to fetch schools');
    }
  },

  clearSchools: () => {
    set({
      ...initialData,
      isFetchingSchools: false,
      hasFetchedSchools: false,
    });
  },
}));
