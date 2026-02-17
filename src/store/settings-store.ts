import {createWithEqualityFn} from "zustand/traditional";
import { persist } from "zustand/middleware";

import {T_Location} from "@/types/weather";
import {T_SettingsStore} from "@/types/settings";
import {DEFAULT_LOCATION, LOCATION_UPDATE_INTERVAL, STORAGE_KEYS, WIDGETS_SETTINGS_DEFAULT} from "@/constants";
import {getStorageItem, setStorageItem, getUserIPLocation} from "@/utils";
//import {merge} from "ts-deepmerge";



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
      const ipLocation:T_Location = await getUserIPLocation()
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
    name: 'store-widgets-settings',
    /*merge: (persisted:T_SettingsStore, current) => {
      console.log(persisted, current);
      /!*if(persisted.widgets.length === 0) {
        persisted.widgets = WIDGETS_SETTINGS_DEFAULT.widgets
      }*!/
      return current
      //return merge(persisted as T_SettingsStore, current, {mergeArrays:false, uniqueArrayItems:true})
    }*/
  })
)