import {T_Location} from "./weather";

export type T_Theme = 'system' | 'light' | 'dark'

export type T_WidgetsSize = 'small' | 'medium' | 'large'

export type T_Widget = {
  id: string
  title: string
  active: boolean
  order: number
  collapsed?: boolean
}

export type T_WidgetsSettings = {
  theme: T_Theme
  size: T_WidgetsSize
  locked: boolean,
  weather: { id:string, active: boolean }
  autoGeoPosition: boolean
  location: T_Location | null
  widgets: T_Widget[]
}

export type T_SettingsStore = T_WidgetsSettings & {
  userLocation: T_Location
  updateLocation: ()=>Promise<void>
}
