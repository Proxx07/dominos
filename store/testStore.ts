export const useTestStore = defineStore('test', () => {
  const count = ref<number>(1);

  const increment = () => {
    count.value ++
  }

  return {
    count,

    increment
  }
});