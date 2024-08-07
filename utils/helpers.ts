export const minutesToClockString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;

  return `${String(hours).length < 2 ? '0'+hours : hours}:${String(mins).length < 2 ? '0'+mins : mins}`;
}

export const getDateIsoString = (day: number = 0): string => {
  const now = new Date();
  now.setDate(now.getDate() + day + 1);

  return now.toISOString().split('T')[0]
}
