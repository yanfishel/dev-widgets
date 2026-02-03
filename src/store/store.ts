import {createWithEqualityFn} from "zustand/traditional";
import { subscribeWithSelector } from "zustand/middleware";
import {shallow} from "zustand/vanilla/shallow";

import {DEFAULT_LOCATION, LOCATION_UPDATE_INTERVAL, STORAGE_KEYS, WEATHER_FORECAST_LIFE_TIME, WIDGETS_SETTINGS_DEFAULT} from "@/constants";
import {formatDate, getStorageItem, setStorageItem} from "@/utils";
import {getUserIPLocation, getWeatherData} from "@services/weather";
import {useSettingsStore} from "@/store/settings-store";



export const useGlobalStore = createWithEqualityFn<T_Store>()(
  subscribeWithSelector<T_Store>((set, get, api) => ({

    globalDateTime: new Date(),
    displayDate: { date: '', shortdate: '', weekday: '' },
    //weatherForecast: null,

    updateGlobalTimer: () => {
      const { globalDateTime, displayDate } = get()
      const now = new Date()
      if( !displayDate.date || (globalDateTime.getMinutes() === 0 && globalDateTime.getSeconds() === 0) ) {
        set({
          globalDateTime: now,
          displayDate: {
            date: formatDate(now, { day: 'numeric', month: 'numeric' }, 'he-IL'),
            shortdate: formatDate(now, { day: 'numeric', month: 'short' }),
            weekday: formatDate(now, { weekday: 'long' })
          }
        })
      } else {
        set({ globalDateTime: now })
      }
      setTimeout(() => {
        get().updateGlobalTimer()
      }, 1000)
    },

    /*updateWeatherForecast: async () => {
      const location = useSettingsStore.getState().userLocation
      if( !(location.lat*1 && location.lon*1) ) {
        set({ weatherForecast: null })
        return
      }
      const forecast = getStorageItem(STORAGE_KEYS.WIDGET_WEATHER_FORECAST)
      if(forecast){
        try {
          const data = JSON.parse(forecast)
          if( data.timestamp + WEATHER_FORECAST_LIFE_TIME > new Date().getTime() && data.lat === location.lat && data.lon === location.lon ){
            set({ weatherForecast: data })
            return
          }
        } catch (e) {
          console.log(e);
          set({ weatherForecast: null })
        }
      }
      const weather = await getWeatherData(location)
      if(weather){
        setStorageItem(STORAGE_KEYS.WIDGET_WEATHER_FORECAST, JSON.stringify( weather ))
        set({ weatherForecast: weather })
        return
      }
      set({ weatherForecast: null })
    },*/


    /*updateDate: () => {
      const { currentDate, updateDisplayDate } = get()
      if(currentDate.getMinutes() === 0 && currentDate.getSeconds() === 0) {
        updateDisplayDate()
      }
      set({
        currentDate: new Date()
      })
      setTimeout(() => {
        get().updateDate()
      }, 1000)
    },

    updateDisplayDate: () => {
      const now = new Date()
      const weekday = now.toLocaleDateString('en-US', { weekday: 'long' })
      const date = now.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric' })
      const shortdate = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
      set({ displayDate: { date, shortdate, weekday } })
    },*/

    /*updateLocation: async () => {
      const { settings } = get()

      if(!settings.autoGeoPosition) {
        set({ currentLocation: settings.location })
        return
      }

      // Get Location from Storage
      const storedLocation = getStorageItem(STORAGE_KEYS.WIDGET_WEATHER_LOCATION)
      if(storedLocation){
        const parsed = JSON.parse(storedLocation)
        if(parsed.timestamp + LOCATION_UPDATE_INTERVAL > new Date().getTime()){
          set({ currentLocation: parsed })
          return
        }
      }

      // ELSE Get Location from IP
      const location:TLocation = await getUserIPLocation()
      if(location){
        const data = {
          ...location,
          timestamp: new Date().getTime()
        }
        setStorageItem(STORAGE_KEYS.WIDGET_WEATHER_LOCATION, JSON.stringify(data))
        set({ currentLocation: data })
        return
      }
      /!*set({ currentLocation: DEFAULT_LOCATION })
      return DEFAULT_LOCATION*!/
    },

    toggleLockPosition: (locked: boolean) => {
      const { settings, storeSettings } = get()
      set({
        settings: {
          ...settings,
          locked
        }
      })
      storeSettings()
    },

    setWidgetsSize: (size) => {
      const { settings, storeSettings } = get()
      document.documentElement.classList.remove("widgets-size-small", "widgets-size-medium", "widgets-size-large")
      document.documentElement.classList.add(`widgets-size-${size}`)
      set({
        settings: {
          ...settings,
          size
        }
      })
      storeSettings()
    },

    setSettingsValue: (key, value) => {
      const { settings, storeSettings } = get()
      set({
        settings: {
          ...settings,
          [key]: value
        }
      })
      storeSettings()
    },

    storeSettings: () => {
      const { settings } = get()
      const settingsString = JSON.stringify( settings )
      setStorageItem(STORAGE_KEYS.WIDGETS_SETTINGS, settingsString)
    },

    restoreSettings: () => {
      const settings = getStorageItem(STORAGE_KEYS.WIDGETS_SETTINGS)
      if(settings) {
        try {
          const parsedSettings = JSON.parse(settings)
          return {
            ...WIDGETS_SETTINGS_DEFAULT,
            ...parsedSettings,
            widgets: [
              ...WIDGETS_SETTINGS_DEFAULT.widgets.filter(w => parsedSettings.widgets.find((pw:TWidget) => pw.id === w.id) === undefined),
              ...parsedSettings.widgets
            ]
          }
        } catch (e) {
          console.log(e);
          return WIDGETS_SETTINGS_DEFAULT
        }
      }

      return WIDGETS_SETTINGS_DEFAULT
    },

    electronEventsHandler: () => {
      const { toggleLockPosition, setWidgetsSize } = get()

      // Listen for mock server response event
      window.electronAPI.onMockServerResponse((_event, response) => {
        //mockServerController.serverResponse(response)
      })
      // Listen for mock server error event
      window.electronAPI.onMockServerError((_event, error) => {
        //mockServerController.serverError(error)
      })


      // Listen for widgets theme change event
      window.electronAPI.onPowerMonitorEvent((_event, name) => {
        if(name === 'resume') {
          //this.onResume()
        }
      })


    }*/

  }))
)