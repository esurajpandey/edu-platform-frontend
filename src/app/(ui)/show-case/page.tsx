'use client';
import DateInput from '@/components/ui/DateInput';
import { useState } from 'react';
import { Holiday } from '@/components/ui/DateInput';
import SelectInput from '@/components/ui/SelectInput';
export default function ShowCasePage() {
  const [date, setDate] = useState<Date>(new Date());
  const onDateChange = (event: Date | null) => {
    setDate(event ?? new Date());
  };

  const holidays: Holiday[] = [
    { date: '2026-04-18', holidayName: 'My Working Days' },
    { date: '2026-04-19', holidayName: 'My Working Days' },
    { date: '2026-04-20', holidayName: 'My Working Days' },
    { date: '2026-04-21', holidayName: 'My Working Days' },
    { date: '2026-04-22', holidayName: 'My Working Days' },
  ];
  const excludeDates = [
    new Date('2026-04-18'),
    new Date('2026-04-19'),
    new Date('2026-04-20'),
    new Date('2026-04-21'),
    new Date('2026-04-22'),
  ];

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectValue, setSelectValue] = useState<string | number | undefined>('chocolate');
  const onSelectChange = (value: string | number | undefined) => {
    setSelectValue(value);
  };

  return (
    <div className="h-full w-full">
      <div id="date-portal"></div>
      <h1 className="px-6 py-2 font-bold text-lg bg-primaryLight">UI Showcase</h1>
      <div className="flex flex-col p-8 w-full gap-4" style={{ height: 'calc(100dvh - 50px)' }}>
        <DateInput
          value={date}
          onChange={onDateChange}
          holidays={holidays}
          portalId="date-portal"
          excludeDates={excludeDates}
        />
        <SelectInput
          options={options}
          onChange={onSelectChange}
          value={selectValue}
          label="Select Flavour"
          required
          responsive
          size="medium"
        />
      </div>
    </div>
  );
}
