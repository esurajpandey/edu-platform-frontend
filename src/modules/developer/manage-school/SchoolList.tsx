import { MainWrapper } from '@/components';

export default function SchoolList() {
  return (
    <MainWrapper
      tobBar
      headerSection={<div>Page header</div>}
      actionSection={<div>page action</div>}
    >
      <div className="h-full">Welcome to page body</div>
    </MainWrapper>
  );
}
