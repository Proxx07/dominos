<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

const {
  step, code, number, name, sms, phoneNumber,
  phoneError, nameError, codeError,
  sendSMS, handleError, isDisabled,
} = useAuth();

async function submitHandler() {
  if (step.value === 0) {
    handleError();
    if (isDisabled.value) return;
    await sendSMS();
    step.value++;
  }
  else {
    step.value--;
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
          Введите sms код отправленный на номер: {{ phoneNumber }}
        </div>

        <div class="field sms">
          <label class="field-title"> Введите ваше имя </label>
          <input-text
            v-model="sms"
            placeholder="Введите sms код"
            :invalid="codeError"
            fluid
            @blur="handleError"
          />
        </div>
      </div>
    </Transition>
    <div class="auth__footer">
      <Button class="field button" label="Отправить" :disabled="isDisabled" fluid @click="submitHandler" />
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
    margin-bottom: 2rem;
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
</style>
