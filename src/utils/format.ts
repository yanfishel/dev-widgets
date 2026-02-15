import {format} from "date-fns";
import {DATE_FORMAT_STANDARDS} from "@/constants";

export const formatDate = (date: Date, options:Intl.DateTimeFormatOptions, locale = 'en-US') => {
  return new Intl.DateTimeFormat(locale, options).format(date)
}

// Format bytes to human readable format
export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 B'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

// Format bytes to human readable format
export const formatBytesMetric = (bytes:number, decimals = 2) => {
  if (!+bytes) return '0 B'

  const base = 1024; // Base for conversion between units
  const dm = decimals < 0 ? 0 : decimals; // Ensure decimals is not negative

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  // Calculate the appropriate unit index
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));

  // Ensure the unit index doesn't exceed the available units
  const safeUnitIndex = Math.min(unitIndex, units.length - 1);

  const formattedSize = (bytes / Math.pow(base, safeUnitIndex)).toFixed(dm);

  return `${parseFloat(formattedSize)} ${units[safeUnitIndex]}`;
}

export const formatDateTimeISOString = (milliseconds:number, ISOName:string, addOffset:boolean, addTimeZone:boolean, timeZone?:string) => {
  const date = new Date(milliseconds)
  if(!date) {
    return { helpText: '', formattedString: ''}
  }
  const standard = DATE_FORMAT_STANDARDS.find(format => format.name === ISOName)
  let formattedString:string
  if(standard?.name === 'ISO-8601-date-time-UTC'){
    const y = date.getUTCFullYear()
    const m = (date.getUTCMonth()+1).toString().padStart(2, '0')
    const d = date.getUTCDate().toString().padStart(2, '0')
    const H = date.getUTCHours().toString().padStart(2, '0')
    const M = date.getUTCMinutes().toString().padStart(2, '0')
    const s = date.getUTCSeconds().toString().padStart(2, '0')
    const ms = date.getUTCMilliseconds().toString().padStart(3, '0')
    formattedString = `${y}-${m}-${d}T${H}:${M}:${s}.${ms}Z`;
  } else {
    const template = `${standard?.format ?? DATE_FORMAT_STANDARDS[0].format}${addOffset ? 'xxx' : ''}`
    const timezone = `${addTimeZone ? `[${timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone}]` : ''}`
    formattedString = format(date, template) + timezone
  }

  const helpText = `${format(date, 'eeee')}, ${format(date, 'Do')} day, ${format(date, 'wo')} week, ${format(date, 'qqqq')}`

  return {
    helpText,
    formattedString
  }
}

export const dateObjMap = (date:Date) => {
  return ({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  })
}
