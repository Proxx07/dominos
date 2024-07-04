import {defineNuxtPlugin} from "#app";
import PrimeVue from 'primevue/config';
import {options} from './config';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(PrimeVue, options);
});