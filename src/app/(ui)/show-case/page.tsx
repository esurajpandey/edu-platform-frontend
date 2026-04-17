'use client';
import DateInput from '@/components/ui/DateInput';
import { useState } from 'react';
import { Holiday } from '@/components/ui/DateInput';
import SelectInput from '@/components/ui/SelectInput';
import Button from '@/components/ui/Button';
import DataGrid from '@/components/ui/DataGrid';
import InputBox from '@/components/ui/InputBox';

import { GridColumn } from '@/components/ui/DataGrid/type';
import { GRID_COLUMN_TYPE } from '@/components/ui/DataGrid/config';
export default function ShowCasePage() {
  const [date, setDate] = useState<Date | null>(new Date());
  const onDateChange = (event: Date | null) => {
    setDate(event);
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

  const columns: GridColumn[] = [
    {
      field: 'name',
      type: GRID_COLUMN_TYPE.STRING,
      label: 'Name',
      width: 100,
      editable: true,
    },
    {
      field: 'age',
      type: GRID_COLUMN_TYPE.NUMBER,
      label: 'Age',
      width: 100,
      editable: false,
    },
    {
      field: 'email',
      type: GRID_COLUMN_TYPE.STRING,
      label: 'Email',
      width: 100,
      editable: true,
    },
    {
      field: 'salary',
      type: GRID_COLUMN_TYPE.NUMBER,
      label: 'Salary',
      width: 100,
      editable: true,
    },
  ];

  const getDataSet = () => {
    const dataSet: unknown[] = [];
    for (let i = 0; i < 100; i++) {
      dataSet.push({
        name: `Name ${i}`,
        age: i,
        email: `stark${i}@gmail.com`,
        salary: i * 1000,
      });
    }
    return dataSet;
  };

  return (
    <div className="h-full w-full">
      <div id="date-portal"></div>
      <h1 className="px-6 py-2 font-bold text-lg bg-primaryLight">UI Showcase</h1>
      <div className="flex flex-col p-8 w-full gap-4" style={{ height: 'calc(100dvh - 50px)' }}>
        {/* <DateInput
          label="Select Date"
          required
          disabled
          value={date}
          onChange={onDateChange}
          holidays={holidays}
          portalId="date-portal"
          isClearable
          size="large"
          excludeDates={excludeDates}
          responsive
        />
        <SelectInput
          options={options}
          onChange={onSelectChange}
          value={selectValue}
          label="Select Flavour"
          required
          disabled
          responsive
          size="large"
        />

        <Button label="Button" size="large" variant="outline" disabled />
        <InputBox
          type="number"
          label="InputBox"
          size="large"
          placeholder="Welcome to input"
          required
        /> */}
        <DataGrid header={columns} dataset={getDataSet()} />
      </div>
    </div>
  );
}
