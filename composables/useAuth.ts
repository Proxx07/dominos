import $request from '~/api';

export function useAuth() {
  const step = ref<number>(0);

  const code = ref<string>('+998');
  const number = ref<string>('');
  const phoneNumber = computed(() => code.value + number.value.replace(/ /g, ''));
  const name = ref<string>('');
  const sms = ref<string>('');

  const phoneError = ref<boolean>(false);
  const nameError = ref<boolean>(false);
  const codeError = ref<boolean>(false);

  // const requestError = ref<boolean>(false);

  const sendSMS = async () => {
    const result = await $request('/api/sms/Send', { method: 'POST', body: { phone: phoneNumber.value?.match(/\d+/g).join('') } });
    console.log(result);
  };

  function handleError() {
    phoneError.value = phoneNumber.value.length !== 17;
    nameError.value = !name.value;

    if (sms.value) {
      codeError.value = !sms.value;
    }
  }

  const isDisabled = computed(() => step.value === 0 ? phoneError.value || nameError.value : codeError.value && !!sms.value);

  return {
    step,
    code,
    number,
    phoneNumber,
    name,
    sms,
    phoneError,
    nameError,
    codeError,
    isDisabled,
    handleError,
    sendSMS,
  };
}
