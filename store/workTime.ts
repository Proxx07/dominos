import { minutesToClockString } from "~/utils/helpers";
import type {IOrderDate} from "~/composables/useOrder/types";

interface IListDate {
  start: number
  end: number
  tomorrow: boolean
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
        tomorrow: result.filter(d => d.end === 0).length > 0,
      }

      result.push(dateObj);

      start = end;
    }

    return result.filter(i => i.tomorrow || i.start > currentTimeInMinutes.value);
  });

  const resultList = computed<IOrderDate[]>(() => {
    return intervals.value.map(i => {
      return {
        name: `${minutesToClockString(i.start)} - ${minutesToClockString(i.end)}`,
        day: i.tomorrow ? getDateIsoString(1) : getDateIsoString()
      }
    })
  });

  return {
    deliveryDuration,
    currentTimeInMinutes,
    startFromMinutes,
    intervals,

    resultList,
  }
});
