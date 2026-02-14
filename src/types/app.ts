import {T_Theme} from "@/types/settings";

export type T_AppSettings = {
  width: number
  height: number
  x: number
  y: number
  locked: boolean
  openAtLogin: boolean
}

export type T_Store = {
  selectedTheme: T_Theme
  displayDate: { date: string, shortdate:string, weekday: string }
  displayTime: { hours: number, minutes: number, seconds: number }
  appTimer: () => void
  updateDisplayDate: () => void
}

export type T_WidgetProps = {
  active: boolean
  order: number
  collapsed?: boolean
}