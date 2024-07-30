import type { ISmsBody, ISmsResponse } from './types';

export function useAuth() {
  const $toast = useToastStore();
  const { $request } = useNuxtApp();
  const step = ref<number>(0);

  const code = ref<string>('+998');
  const number = ref<string>('');
  const name = ref<string>('');
  const sms = ref<string>('');

  const phoneError = ref<boolean>(false);
  const nameError = ref<boolean>(false);

  const codeError = ref<boolean>(false);

  const reqBody = computed<ISmsBody>(() => {
    return {
      phone: (code.value + number.value.replace(/ /g, '')),
    };
  });

  const customerId = ref<string>('');
  const smsRequestError = ref<boolean>(false);

  const sendSMS = async () => {
    try {
      const result = await $request<ISmsResponse>('/api/sms/Send', {
        method: 'POST',
        body: {
          phone: reqBody.value.phone.match(/\d+/g)?.join(''),
        },
      });
      smsRequestError.value = false;
      customerId.value = result.customerId;
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

  const confirmSms = async () => {
    try {
      const result = await $request<ISmsResponse>('/api/sms/Confirm', {
        method: 'POST',
        body: {
          sms: sms.value,
        },
      });
      smsRequestError.value = false;
      console.log(result);
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

  function handleError() {
    phoneError.value = reqBody.value.phone.length !== 17;
    nameError.value = !name.value;

    if (sms.value) {
      codeError.value = !sms.value;
    }
  }

  const isDisabled = computed(() => step.value === 0 ? phoneError.value || nameError.value : codeError.value && sms.value.length < 4);

  return {
    step,
    code,
    number,

    name,
    sms,
    phoneError,
    nameError,
    codeError,
    isDisabled,
    smsRequestError,
    handleError,
    sendSMS,
    confirmSms,
  };
}
