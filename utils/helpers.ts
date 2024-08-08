export const minutesToClockString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;

  return `${String(hours).length < 2 ? '0'+hours : hours}:${String(mins).length < 2 ? '0'+mins : mins}`;
}

function formatToISOWithOffset(date: Date, offsetHours: number) {
  const offsetMillis = offsetHours * 60 * 60 * 1000;
  const adjustedDate = new Date(date.getTime() + offsetMillis);

  const year = adjustedDate.getUTCFullYear();
  const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(adjustedDate.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const  getDateIsoString = (day: number = 0): string => {
  const now = new Date();
  now.setDate(now.getDate() + day);


  return formatToISOWithOffset(now, 5)
}
