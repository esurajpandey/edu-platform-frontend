'use client';
import { MainWrapper, DataGrid } from '@/components';
import { getSchoolColumns, getSchoolDataset } from './utils';
import { useDeveloperStore } from '@/store/developer/developer.store';
import { useQuery } from '@tanstack/react-query';
export default function SchoolList() {
  const columns = getSchoolColumns();
  const { schoolsById, fetchSchools } = useDeveloperStore();
  const { isLoading } = useQuery({
    queryKey: ['schools'],
    queryFn: () => fetchSchools(),
  });
  const dataset = getSchoolDataset(schoolsById);
  return (
    <MainWrapper
      tobBar
      pageTitle="All Schools"
      pageSubTitle="Manage schools and school groups with school admin"
    >
      <DataGrid header={columns} dataset={dataset} isLoading={isLoading} />
    </MainWrapper>
  );
}
