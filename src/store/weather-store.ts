import {createWithEqualityFn} from "zustand/traditional";
import { persist } from "zustand/middleware";

import { WEATHER_FORECAST_LIFE_TIME } from "@/constants";
import { useSettingsStore } from "@/store";
import { getWeatherData} from "@/utils";


export const useWeatherStore = createWithEqualityFn<T_WeatherStore>()(
  persist( (set, get):T_WeatherStore => ({

    loading: false,
    error: null,
    forecast: null,


    updateWeatherForecast: async (force = false) => {
      const { forecast } = get()

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

      const weatherData = await getWeatherData(location)
      if(weatherData){
        set({
          error: null,
          forecast: weatherData
        })
        return
      } else {
        set({
          error: 'Error getting weather data',
          forecast: null
        })
      }
    }

  }),
  {
    name: 'store-widgets-weather'
  })
)