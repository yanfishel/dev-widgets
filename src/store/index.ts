import {createWithEqualityFn} from "zustand/traditional";
import { subscribeWithSelector } from "zustand/middleware";

import {STORAGE_KEYS, WIDGETS_SETTINGS_DEFAULT} from "@/constants";
import {getStorageItem, setStorageItem} from "@/utils";



export const useStore = createWithEqualityFn<T_Store>()(
  subscribeWithSelector<T_Store>((set, get) => ({

    loading: true,
    currentDate: new Date(),

    settings: WIDGETS_SETTINGS_DEFAULT,


    init: () =>{
      const { updateDate, electronEventsHandler, restoreSettings } = get()

      updateDate()

      electronEventsHandler()

      set({
        loading: false,
        settings: restoreSettings()
      })
    },

    updateDate: () => {
      set({
        currentDate: new Date()
      })
      setTimeout(() => get().updateDate(), 1000)
    },

    toggleLockPosition: (locked: boolean) => {
      set({
        settings: {
          ...get().settings,
          locked
        }
      })
      get().storeSettings()
    },

    setWidgetsSize: (size) => {
      document.documentElement.classList.remove("widgets-size-small", "widgets-size-medium", "widgets-size-large")
      document.documentElement.classList.add(`widgets-size-${size}`)
      set({
        settings: {
          ...get().settings,
          size
        }
      })
      get().storeSettings()
    },

    storeSettings: () => {
      const settingsString = JSON.stringify( get().settings )
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
            widgets: {
              ...WIDGETS_SETTINGS_DEFAULT.widgets,
              ...parsedSettings.widgets
            }
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

      // Listen for widgets resize event
      window.electronAPI.onWidgetsResize((_event, size) => {
        setWidgetsSize(size)
      })
      // Listen for widgets theme change event
      window.electronAPI.onPowerMonitorEvent((_event, name) => {
        if(name === 'resume') {
          //this.onResume()
        }
      })
      // Listen for widgets Lock Position change event
      window.electronAPI.onLockPosition((_event, locked) => {
        toggleLockPosition(locked)
      })

    }

  }))
)