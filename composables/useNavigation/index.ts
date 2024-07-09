import type { INavigation } from './types';
import { NavigationPages } from './models';

export function useNavigation() {
  const folders = ref<INavigation[]>([]);

  return {
    folders,

    NavigationPages,
  };
}
