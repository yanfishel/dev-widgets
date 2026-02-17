import {createWithEqualityFn} from "zustand/traditional";
import { subscribeWithSelector } from "zustand/middleware";

import {T_Store} from "@/types/app";
import {E_THEME} from "@/constants";
import {formatDate} from "@/utils";


export const useGlobalStore = createWithEqualityFn<T_Store>()(
  subscribeWithSelector<T_Store>((set, get) => ({

    selectedTheme: E_THEME.SYSTEM,
    globalDateTime: new Date(),
    displayDate: { date: '', shortdate: '', weekday: '' },
    displayTime: { hours: Infinity, minutes: Infinity, seconds: Infinity },


    appTimer: () => {
      const { displayDate, updateDisplayDate } = get()
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      if( !displayDate.date || (minutes === 0 && seconds === 0) ) {
        updateDisplayDate()
      }
      set({
        globalDateTime: now,
        displayTime: { hours, minutes, seconds }
      })
      setTimeout(() => {
        get().appTimer()
      }, 1000)
    },

    updateDisplayDate: () => {
      const now = new Date()
      set({
        displayDate: {
          date: formatDate(now, { day: 'numeric', month: 'numeric' }, 'he-IL'),
          shortdate: formatDate(now, { day: 'numeric', month: 'short' }),
          weekday: formatDate(now, { weekday: 'long' })
        }
      })
    }


  }))
)