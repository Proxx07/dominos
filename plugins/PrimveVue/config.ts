import type { PrimeVueConfiguration } from 'primevue/config';
import { definePreset } from '@primeuix/styled';
import Aura from '@primevue/themes/aura';

export const customPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '.3rem',
      sm: '.5rem',
      md: '.5rem',
      lg: '1rem',
    },
  },
  semantic: {
    primary: {
      50: 'var(--primary-50)',
      100: 'var(--primary-100)',
      200: 'var(--primary-200)',
      300: 'var(--primary-300)',
      400: 'var(--primary-400)',
      500: 'var(--primary-500)',
      600: 'var(--primary-600)',
      700: 'var(--primary-700)',
      800: 'var(--primary-800)',
      900: 'var(--primary-900)',
      950: 'var(--primary-950)',
    },
    formField: {
      paddingX: '.5rem',
      paddingY: '1rem',
    },
  },
});

export const options: PrimeVueConfiguration = {
  ripple: true,

  pt: {
    button: {
      root: {
        class: 'font-14-n',
      },
    },
    inputtext: {
      root: {
        class: 'font-14-n',
      },
    },

    dialog: {
      title: 'font-24-b',
    },
    card: {
      title: 'font-16-b',
      content: 'font-14-n',
    },

    datepicker: {
      pcInput: {
        root: {
          class: 'underlined font-14-n',
        },
      },
    },
  },

  theme: {
    preset: customPreset,
    options: {
      darkModeSelector: 'none',
    },
  },
};
