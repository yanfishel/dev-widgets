
export type T_Location = {
  country?: string,
  countryCode?: string,
  city: string,
  lat: number,
  lon: number,
  timestamp?: number
}

export type T_WeatherCurrent = {
  interval:number
  is_day: number
  rain: number
  showers: number
  snowfall: number
  temperature_2m: number
  time:number
  weather_code:number
}

export type T_WeatherDaily = {
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
  time: number[]
}

export type TWeatherData = {
  current: T_WeatherCurrent
  daily: T_WeatherDaily
  timestamp: number
  lat: number
  lon: number
}

export type T_WeatherStore = {
  processing: boolean
  connectionAttempts: number
  error: string|null
  forecast: TWeatherData|null
  isActive: (location:T_Location) => boolean
  updateWeatherForecast: (force?:boolean)=>Promise<void>
  getForecast: (location:T_Location)=>Promise<void>
}
