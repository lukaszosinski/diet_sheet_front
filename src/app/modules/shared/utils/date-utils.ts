export function getDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(time1: number, time2: number): boolean {
  const date1 = getDay(new Date(time1));
  const date2 = getDay(new Date(time2));
  return date1.getTime() === date2.getTime();
}

export function addDays(date: Date, daysQuantity: number): Date {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + daysQuantity);
  return newDate;
}

export function parseFromIsoString(date: string): Date {
  const [ year, month, day ]: number[] = date.split('-').map(str => Number(str));
  return new Date(year, month - 1, day + 1);
}

export function formatToDateInput(date: Date): string {
  return date.toISOString().substring(0, 10);
}

export function parseFromIsoDate(date: string): Date {
  const [ year, month, day ] = date.split('-').map(str => Number(str));
  return new Date(year, month - 1, day);
}

export function formatToIsoDate(date: Date): string {
  return [ date.getFullYear(), date.getMonth() + 1, date.getDate() ]
    .map(datePart => String(datePart))
    .map(datePart => datePart.length > 1 ? datePart : '0' + datePart)
    .join('-');
}
