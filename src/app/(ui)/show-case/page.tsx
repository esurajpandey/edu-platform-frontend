'use client';
import DateInput from '@/components/ui/DateInput';
import { useState } from 'react';
import { Holiday } from '@/components/ui/DateInput';
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

  return (
    <div className="h-full w-full">
      <div id="date-portal"></div>
      <h1 className="px-6 py-2 font-bold text-lg bg-primaryLight">UI Showcase</h1>
      <div className="flex flex-col p-8 w-full" style={{ height: 'calc(100dvh - 50px)' }}>
        <DateInput
          value={date}
          onChange={onDateChange}
          holidays={holidays}
          portalId="date-portal"
          excludeDates={excludeDates}
        />
      </div>
    </div>
  );
}
