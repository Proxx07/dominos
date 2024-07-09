import type { INavigation } from '../types';
import { fire, loyalty } from '~/assets/images';

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
