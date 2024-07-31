export function useTimer() {
  const timer = ref<number>(0);

  const minutes = computed(() => Math.floor(timer.value / 60));
  const seconds = computed(() => timer.value - minutes.value * 60);

  const timerView = computed(() => {
    return `${minutes.value < 10 ? 0 : ''}${minutes.value}:${seconds.value < 10 ? 0 : ''}${seconds.value}`;
  });

  async function decrease() {
    timer.value--;
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (timer.value > 0) {
      await decrease();
    }
  }

  const setTimer = (seconds: number) => {
    if (!seconds) return;
    timer.value = seconds;

    queueMicrotask(async () => {
      await decrease();
    });
  };

  return {
    timer,
    setTimer,
    timerView,
  };
}
