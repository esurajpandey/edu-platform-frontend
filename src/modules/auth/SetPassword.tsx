'use client';

import { useState, useEffect } from 'react';
import { Button, InputBox } from '@/components';
import appToast from '@/lib/toast';
import { useAuthStore } from '@/store/auth/auth.store';
import constants from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { APP_ROUTES } from '@/constants/app-routes';

export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { validateSetPasswordToken, setUserPassword } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  // ✅ Derived state
  const isDisabled =
    !(password && confirmPassword && password === confirmPassword) || !isTokenValid || loading;

  // ✅ Password strength (basic)
  const getStrength = () => {
    if (!password) return 0;
    if (password.length > 10) return 100;
    if (password.length > 6) return 60;
    return 30;
  };

  const strength = getStrength();

  // ✅ Verify token
  useEffect(() => {
    if (!token) {
      setError('Invalid or missing token');
      appToast.error('Invalid or missing token');
      return;
    }

    const verifyToken = async () => {
      const result = await validateSetPasswordToken(token);

      if (result?.statusCode !== constants.API_STATUS.OK) {
        setError(result?.message || 'Invalid or expired token');
        setIsTokenValid(false);
        appToast.error(result?.message || 'Invalid or expired token');
        return;
      }

      setIsTokenValid(true);
      setError(null);
    };

    verifyToken();
  }, [token, validateSetPasswordToken]);

  // ✅ Submit handler
  const onSubmit = async () => {
    if (!password || !confirmPassword) {
      appToast.error('Password fields cannot be empty');
      return;
    }

    if (password !== confirmPassword) {
      appToast.error('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid or missing token');
      appToast.error('Invalid or missing token');
      return;
    }

    try {
      setLoading(true);
      const result = await setUserPassword(token, password);
      if (result?.statusCode !== constants.API_STATUS.OK) {
        setError(result?.message || 'Failed to set password');
        appToast.error(result?.message || 'Failed to set password');
        return;
      }
      appToast.success('Password set successfully! Redirecting...');
      router.push(APP_ROUTES.login);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-surface rounded-2xl shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-base">
          <h1 className="text-4xl font-bold text-text mb-4">Set your password securely</h1>
          <p className="text-textLight mb-6">
            Create a strong password to protect your account and continue using the platform.
          </p>

          <ul className="space-y-3 text-sm text-textMuted">
            <li>• At least 8 characters</li>
            <li>• Include uppercase & lowercase</li>
            <li>• Include numbers & symbols</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="p-6 md:p-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-text mb-2">Set Password</h2>

            {/* ✅ Stable text / error */}
            <p className={`mb-6 ${error ? 'text-danger' : 'text-textLight'}`}>
              {error || 'Enter your new password below'}
            </p>
            <div className="space-y-4 mb-6">
              <InputBox
                label="New Password"
                id="password"
                type="password"
                placeholder="Enter new password"
                variant="filled"
                className="mt-1.5"
                value={password}
                disabled={!isTokenValid}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Confirm Password */}
              <InputBox
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                variant="filled"
                className="mt-1.5"
                value={confirmPassword}
                disabled={!isTokenValid}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Password Strength */}
            <div>
              <div className="h-2 w-full bg-surfaceSoft rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${strength}%` }}
                />
              </div>
              <p className="text-xs text-textMuted mt-1">
                Password strength:{' '}
                {strength === 100 ? 'Strong' : strength === 60 ? 'Medium' : 'Weak'}
              </p>
            </div>
            <Button
              tone="primary"
              type="button"
              reaponsive
              size="large"
              disabled={isDisabled}
              isLoading={loading}
              label="Set Password"
              onClick={onSubmit}
            />

            {/* Footer */}
            <p className="text-xs text-textMuted mt-6 text-center">
              Make sure your password is secure and not shared with anyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
