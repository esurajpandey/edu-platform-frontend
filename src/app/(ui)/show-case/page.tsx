'use client';
import { useState } from 'react';
import Grid from '@/components/ui/Grid';

type TeamRow = {
  name: string;
  age: number;
  role: string;
  joinedOn: string;
};
const dataset: TeamRow[] = [];
for (let i = 0; i < 100; i++) {
  dataset.push({
    name: `Suraj Kumar ${i}`,
    age: 26 + i,
    role: i % 2 === 0 ? 'dev' : 'user',
    joinedOn: `2026-04-${i}`,
  });
}
export default function ShowCasePage() {
  const [rows, setRows] = useState<TeamRow[]>(dataset);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(245,247,251,1),rgba(255,255,255,1))] p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
            UI Showcase
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-text">Professional Grid</h1>
          <p className="max-w-2xl text-sm leading-6 text-textLight">
            Sticky highlighted headers, refined form controls, and a cleaner card layout for
            everyday data entry screens.
          </p>
        </div>

        <Grid
          data={rows}
          onChange={setRows}
          columns={[
            { name: 'Name', field: 'name', type: 'text', editable: true, width: 240 },
            {
              name: 'Age',
              field: 'age',
              type: 'number',
              editable: true,
              width: 120,
              align: 'center',
            },
            {
              name: 'Role',
              field: 'role',
              type: 'select',
              editable: true,
              width: 180,
              options: [
                { label: 'Developer', value: 'dev' },
                { label: 'Team Lead', value: 'lead' },
                { label: 'User', value: 'user' },
              ],
            },
            {
              name: 'Joined On',
              field: 'joinedOn',
              type: 'date',
              editable: true,
              width: 200,
            },
          ]}
        />
      </div>
    </div>
  );
}
