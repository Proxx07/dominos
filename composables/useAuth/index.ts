import type { ISmsResponse } from './types';

export function useAuth() {
  const $toast = useToastStore();
  const { $request } = useNuxtApp();
  const step = ref<number>(0);

  const code = ref<string>('+998');
  const number = ref<string>('');
  const phone = computed<string>(() => {
    return code.value + (number.value.replace(/ /g, '').match(/\d+/g)?.join('') ?? '');
  });

  const name = ref<string>('');
  const sms = ref<string>('');

  const nameError = ref<boolean>(false);
  const phoneError = ref<boolean>(false);
  const codeError = ref<boolean>(false);

  const customerId = ref<string>('');
  const smsRequestError = ref<boolean>(false);

  const sendSMS = async () => {
    try {
      const result = await $request<ISmsResponse>('/api/sms/Send', {
        method: 'POST',
        body: {
          phone: phone.value.substring(1),
        },
      });
      smsRequestError.value = false;
      customerId.value = result.customerId ?? '';
    }

    catch (e: any) {
      smsRequestError.value = true;
      if (e.data.error) {
        $toast.error('error.title', e.data.error);
      }
      else {
        $toast.error('error.title', 'error.server-error');
      }
    }
  };

  const confirmSMS = async () => {
    try {
      await $request<ISmsResponse>('/api/sms/Confirm', {
        method: 'POST',
        body: {
          phone: phone.value,
          confirmCode: sms.value,
        },
      });
      codeError.value = false;
    }

    catch (e: any) {
      codeError.value = true;
      if (e.data.error) {
        $toast.error('error.title', e.data.error);
      }
      else {
        $toast.error('error.title', 'error.server-error');
      }
    }
  };

  function handleError() {
    phoneError.value = phone.value.length !== 13;
    nameError.value = !name.value;
    codeError.value = sms.value.length < 4;
  }

  const isDisabled = computed(() => step.value === 0 ? phoneError.value || nameError.value : sms.value.length < 4);

  return {
    step, customerId,
    code, number, phone, name, sms,
    phoneError, nameError, codeError,

    isDisabled, smsRequestError,

    handleError, sendSMS, confirmSMS,
  };
}
