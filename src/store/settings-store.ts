import {createWithEqualityFn} from "zustand/traditional";
import { persist } from "zustand/middleware";

import {DEFAULT_LOCATION, LOCATION_UPDATE_INTERVAL, STORAGE_KEYS, WIDGETS_SETTINGS_DEFAULT} from "@/constants";
import {getStorageItem, setStorageItem} from "@/utils";
import {getUserIPLocation} from "@services/weather";


export const useSettingsStore = createWithEqualityFn<T_SettingsStore>()(
  persist( (set, get) => ({

    ...WIDGETS_SETTINGS_DEFAULT,

    userLocation: DEFAULT_LOCATION,

    updateLocation: async () => {
      const { autoGeoPosition, location } = get()

      if(!autoGeoPosition) {
        set({ userLocation: location })
        return
      }

      // Get Location from Storage
      const storedLocation = getStorageItem(STORAGE_KEYS.WIDGET_WEATHER_LOCATION)
      if(storedLocation){
        const parsed = JSON.parse(storedLocation)
        if(parsed.timestamp + LOCATION_UPDATE_INTERVAL > new Date().getTime()){
          set({ userLocation: parsed })
          return
        }
      }

      // ELSE Get Location from IP
      const ipLocation:TLocation = await getUserIPLocation()
      if(ipLocation){
        const data = {
          ...ipLocation,
          timestamp: new Date().getTime()
        }
        setStorageItem(STORAGE_KEYS.WIDGET_WEATHER_LOCATION, JSON.stringify(data))
        set({ userLocation: data })
        return
      }
    },

  }),
  {
    name: 'settings-store'
  })
)