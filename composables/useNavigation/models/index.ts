import type { INavigation } from '../types';
import { fire, loyalty } from '~/assets/images';
import { click, oson, payme, uzcard, uzum, visa } from '~/assets/images/payment';

export const NavigationPages: INavigation[] = [
  {
    name: 'menu.promotes',
    link: '/stocks',
  },

  {
    name: 'menu.news',
    link: '/news',
  },

  {
    name: 'menu.work',
    link: '/vacancies',
    icon: fire,
  },

  {
    name: 'menu.loyalty',
    link: '/loyalty',
    icon: loyalty,
  },
];

export const paymentSystemsList = [payme, uzum, oson, click, uzcard, visa];
