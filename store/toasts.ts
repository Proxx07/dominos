import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

export const useToastStore = defineStore('toasts', () => {
  const { t } = useI18n({ useScope: 'global' });
  const $toast = useToast();
  const duration = 3000;

  const success = (title: string, text?: string) => {
    $toast.add({
      severity: 'success',
      summary: t(title),
      detail: text ? t(text) : '',
      life: duration,
    });
  };

  const info = (title: string, text?: string) => {
    $toast.add({
      severity: 'info',
      summary: t(title),
      detail: text ? t(text) : '',
      life: duration,
    });
  };

  const warning = (title: string, text?: string) => {
    $toast.add({
      severity: 'warn',
      summary: t(title),
      detail: text ? t(text) : '',
      life: duration,
    });
  };

  const error = (title: string, text?: string) => {
    $toast.add({
      severity: 'error',
      summary: t(title),
      detail: text ? t(text) : '',
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
