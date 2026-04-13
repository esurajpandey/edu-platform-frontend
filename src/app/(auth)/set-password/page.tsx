import { Suspense } from 'react';
import SetPassword from '@/modules/auth/SetPassword';

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base" />}>
      <SetPassword />
    </Suspense>
  );
}
