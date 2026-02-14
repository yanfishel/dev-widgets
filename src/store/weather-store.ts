import {createWithEqualityFn} from "zustand/traditional";
import { persist } from "zustand/middleware";

import { WEATHER_FORECAST_LIFE_TIME } from "@/constants";
import { useSettingsStore } from "@/store";
import { getWeatherData} from "@/utils";


export const useWeatherStore = createWithEqualityFn<T_WeatherStore>()(
  persist( (set, get):T_WeatherStore => ({

    processing: false,
    connectionAttempts: 0,
    error: null,
    forecast: null,

    isActive: () => {
      const weather = useSettingsStore.getState().weather
      const widgets = useSettingsStore.getState().widgets
      const weatherWidget = widgets.find(w => w.id === 'widget-daily-weather')
      const active = weather.active || weatherWidget.active
      const location = useSettingsStore.getState().userLocation
      const isLocationSet = +location.lat && +location.lon

      if( !active || !isLocationSet ) {
        set({
          error: !isLocationSet ? 'Error getting Location' : null,
          forecast: null
        })
        return false
      }
      return true
    },

    updateWeatherForecast: async (force = false) => {
      const { forecast, isActive, getForecast } = get()
      const location = useSettingsStore.getState().userLocation
      if( !isActive(location) ) {
        return
      }

      if( forecast && !force
          && forecast.timestamp + WEATHER_FORECAST_LIFE_TIME > new Date().getTime()
          && forecast.lat === location.lat
          && forecast.lon === location.lon )
      {
        set({ error: null })
        return
      }

      await getForecast(location)
    },

    getForecast: async (location) => {
      if(get().processing){
        return
      }
      set({ error: null, processing: true })
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      console.log('Get Forecast'+new Date().toLocaleTimeString(), location.lat, location.lon)
      try {
        const forecast = await getWeatherData(location, controller.signal)
        if(forecast) {
          set({ processing:false, connectionAttempts:0, forecast })
        }
      } catch (e) {
        const { connectionAttempts, getForecast } = get()
        console.log('Error getting weather data. Connection Attempt:'+connectionAttempts, e)
        if(connectionAttempts < 3) {
          set({ connectionAttempts: connectionAttempts + 1 })
          setTimeout( getForecast, 3_000 )
        } else {
          set({ connectionAttempts:0, error: 'Error getting weather data', forecast: null })
        }
      } finally {
        clearTimeout( timeout )
        set({ processing: false })
      }
    }

  }),
  {
    name: 'store-widgets-weather'
  })
)