<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useTimer } from '~/composables/useTimer';
import type { IUser } from '~/composables/useUser/types';

defineProps<{
  loading: boolean
}>();

const emit = defineEmits<{
  (e: 'submitted', user: Partial<IUser>): void
}>();

const {
  step, code, name, sms, isDisabled, phone, customerId,
  phoneError, nameError, codeError, number,
  sendSMS, handleError, smsRequestError,
  confirmSMS,
} = useAuth();

const { timer, timerView, setTimer } = useTimer();

const confrmationButtonDisable = computed(() => {
  if (step.value === 1) return isDisabled.value;
  return timer.value > 0 || isDisabled.value;
});

async function requestCode() {
  if (timer.value) return;
  await sendSMS();
  if (smsRequestError.value) return;
  setTimer(120);
}

async function submitHandler() {
  if (step.value === 0) {
    handleError();
    if (isDisabled.value || timer.value) return;
    await sendSMS();
    if (smsRequestError.value) return;
    step.value = 1;
    setTimer(120);
  }
  else {
    await confirmSMS();
    if (codeError.value) return;

    emit('submitted', {
      id: customerId.value,
      firstName: name.value,
      phone1: phone.value,
    });
  }
}
</script>

<template>
  <div class="auth">
    <Transition name="slideX">
      <div v-if="step === 0" class="auth-content">
        <div class="auth__subtitle">
          Для просмотра меню в режиме реального времени и в зависимости от местоположения
        </div>

        <div class="field name">
          <label class="field-title"> Введите ваше имя </label>
          <input-text
            v-model="name"
            placeholder="Введите ваше имя"
            :invalid="nameError"
            fluid
            @blur="handleError"
          />
        </div>

        <div class="field phone">
          <label class="field-title"> Телефон </label>
          <input-group>
            <input-group-addon>{{ code }}</input-group-addon>
            <input-mask
              v-model="number"
              mask="(99) 999-99-99"
              placeholder="(##) ###-##-##"
              :invalid="phoneError"
              @blur="handleError"
            />
          </input-group>
        </div>
      </div>
    </Transition>
    <Transition name="slideX">
      <div v-if="step === 1" class="auth-content">
        <div class="auth__subtitle">
          Введите sms код отправленный на номер: {{ phone }}
        </div>

        <div class="field sms">
          <label class="field-title"> Ваш код </label>
          <input-mask
            v-model="sms"
            mask="9999"
            placeholder="####"
            :invalid="codeError"
            fluid
            @blur="handleError"
          />
        </div>
      </div>
    </Transition>
    <div class="auth__footer">
      <div class="resend-sms">
        <Button v-if="!timer && step === 1" label="Запросить повторно" text @click="requestCode" />
        <template v-if="timer">
          Запросить повторно код вы сможете через {{ timerView }}
        </template>
        <Button v-if="step === 1" label="Назад" severity="secondary" style="min-width: 7rem" @click="step = 0" />
      </div>

      <Button
        class="field button"
        label="Отправить"
        :disabled="confrmationButtonDisable || loading"
        :loading="loading"
        loading-icon="pi pi-spin pi-spinner-dotted"
        fluid
        @click="submitHandler"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  position: relative;
  .auth-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
    width: 100%;
  }

  &__subtitle {
    font: var(--font-16-n);
    color: var(--accent-text);
    opacity: 0.7;
    margin-bottom: 1.2rem;
  }

  &__footer {
    margin-top: auto;
  }
}
.field {
  label {
    display: block;
    font: var(--font-10-n);
    color: var(--accent-text);
    opacity: 0.8;
    margin-bottom: .5rem;
  }
}

.resend-sms {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.4rem;
}
</style>
