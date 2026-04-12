// lib/toast.ts
import { toast, ToastOptions } from 'react-hot-toast';

// Helper to generate styles
const getOptions = (color?: string): ToastOptions => ({
  style: {
    backgroundColor: color || undefined,
    color: color ? '#fff' : undefined, // Auto-white text if custom bg is used
  },
});

const appToast = {
  success: (message: string, color?: string) =>
    toast.success(message, getOptions(color || '#059669')), // Default green

  error: (message: string, color?: string) => toast.error(message, getOptions(color || '#dc2626')), // Default red

  loading: (message: string, color?: string) => toast.loading(message, getOptions(color)),

  blank: (message: string, color?: string) => toast(message, getOptions(color)),

  // Useful for long-running tasks
  dismiss: (toastId?: string) => toast.dismiss(toastId),
};

export default appToast;
