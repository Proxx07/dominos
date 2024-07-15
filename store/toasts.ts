import { useToast } from 'primevue/usetoast';

export const useToastStore = defineStore('toasts', () => {
  const $toast = useToast();
  const duration = 3500;

  const success = (title: string, text: string) => {
    $toast.add({
      severity: 'success',
      summary: title,
      detail: text,
      life: duration,
    });
  };

  const info = (title: string, text: string) => {
    $toast.add({
      severity: 'info',
      summary: title,
      detail: text,
      life: duration,
    });
  };

  const warning = (title: string, text: string) => {
    $toast.add({
      severity: 'warn',
      summary: title,
      detail: text,
      life: duration,
    });
  };

  const error = (title: string, text: string) => {
    $toast.add({
      severity: 'error',
      summary: title,
      detail: text,
      life: duration,
    });
  };

  return {
    success,
    info,
    warning,
    error,
  };
});
