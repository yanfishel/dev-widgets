import {createWithEqualityFn} from "zustand/traditional";
import { persist } from "zustand/middleware";

import { WEATHER_FORECAST_LIFE_TIME } from "@/constants";
import { useSettingsStore } from "@/store";
import { getWeatherData} from "@services/weather";


export const useWeatherStore = createWithEqualityFn<T_WeatherStore>()(
  persist( (set, get) => ({

    weatherForecast: null,

    updateWeatherForecast: async (force = false) => {
      const { weatherForecast } = get()

      const location = useSettingsStore.getState().userLocation
      const weather = useSettingsStore.getState().weather
      const widgets = useSettingsStore.getState().widgets

      const weatherWidget = widgets.find(w => w.id === 'widget-daily-weather')

      const active = weather.active || weatherWidget.active

      if( !active || !+location.lat || !+location.lon ) {
        set({ weatherForecast: null })
        return
      }

      if( weatherForecast && !force
          && weatherForecast.timestamp + WEATHER_FORECAST_LIFE_TIME > new Date().getTime()
          && weatherForecast.lat === location.lat
          && weatherForecast.lon === location.lon )
      {
        return
      }

      const weatherData = await getWeatherData(location)
      if(weatherData){
        set({ weatherForecast: weatherData })
        return
      } else {
        set({ weatherForecast: null })
      }
    },

  }),
  {
    name: 'store-widgets-weather'
  })
)