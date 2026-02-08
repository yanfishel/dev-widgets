import {createWithEqualityFn} from "zustand/traditional";
import { subscribeWithSelector } from "zustand/middleware";
import {shallow} from "zustand/vanilla/shallow";

import {formatDate} from "@/utils";


export const useGlobalStore = createWithEqualityFn<T_Store>()(
  subscribeWithSelector<T_Store>((set, get) => ({

    globalDateTime: new Date(),
    displayDate: { date: '', shortdate: '', weekday: '' },
    displayTime: { hours: 0, minutes: 0, seconds: 0 },


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


  })),
  shallow
)