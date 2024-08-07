import {getDateIsoString, minutesToClockString} from "~/utils/helpers";

interface IListDate {
  start: number
  end: number
  currentDate: string
}

export const useWorkTimeStore = defineStore('work-time', () => {
  const startFrom = ref<string>('06:00');
  const workDuration = ref<number>(1439);
  const deliveryDuration = ref<number>(60);
  const currentTime = ref<Date>(new Date());

  const startFromMinutes = computed<number>(() => {
    const arr = startFrom.value.split(':').map(Number);
    return arr[0] * 60 + arr[1];
  });

  const currentTimeInMinutes = computed<number>(() => {
    return currentTime.value.getHours() * 60 + currentTime.value.getMinutes();
  });

  const intervals = computed<IListDate[]>(() => {
    let start = startFromMinutes.value;
    const result: IListDate[] = [];
    const endOfDay = 1440; // Количество минут в сутках

    while (start < startFromMinutes.value + workDuration.value) {
      const end = start + deliveryDuration.value;


      const dateObj = {
        start: start % endOfDay,
        end: end % endOfDay,
        currentDate: result.filter(d => d.end === 0).length ? getDateIsoString(1) : getDateIsoString(),
      }

      result.push(dateObj);
      start = end;
    }

    return result;
  });

  const resultList = computed<string[]>(() => {
    return intervals.value
      .filter(i => i.start > currentTimeInMinutes.value)
      .map(i => `${minutesToClockString(i.start)} - ${minutesToClockString(i.end)} / ${i.currentDate}`)
  })

  return {
    deliveryDuration,
    currentTimeInMinutes,
    startFromMinutes,
    intervals,

    resultList,
  }
});
