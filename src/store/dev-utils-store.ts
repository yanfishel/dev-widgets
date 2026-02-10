import {createWithEqualityFn} from "zustand/traditional";
import { persist } from "zustand/middleware";

import {E_EncodingTypes} from "@/constants";


export const useDevUtilsStore = createWithEqualityFn<T_DevUtilsStore>()(
  persist( (set) => ({

    encodingType: E_EncodingTypes.JWT,

    updateEncodingType: (type) => {
      set({encodingType: type})
    }

  }),
  {
    name: 'store-widgets-dev-utils'
  })
)