import {createWithEqualityFn} from "zustand/traditional";
import { persist } from "zustand/middleware";

import {DEFAULT_JWT_SECRET, E_EncodingTypes} from "@/constants";
import {debounce, jwtEncode} from "@/utils";


export const useDevUtilsStore = createWithEqualityFn<T_DevUtilsStore>()(
  persist<T_DevUtilsStore>( (set, get) => ({

    processing: false,
    encodingType: E_EncodingTypes.JWT,
    decodedJWT: null,
    encodedJWT: '',
    decodedFile: null,
    decodedText: '',
    decodedError: null,
    encodedText: '',
    encodedError: null,
    signature: DEFAULT_JWT_SECRET,

    updateEncodingType: (type) => {
      const { reset } = get()
      set({
        encodingType: type
      })
      reset()
    },

    reset: () => {
      set({
        decodedFile: null,
        decodedJWT: null,
        decodedText: '',
        decodedError: null,
        encodedText: '',
        encodedError: null
      })
    },

    resetDecoded: () => {
      set({decodedFile: null, decodedText: '', decodedError: null})
    },

    resetEncoded: () => {
      set({encodedText: '', encodedError: null})
    },

    onDecodedJWTChange: ( field, code ) => {
      set({
        decodedJWT: {...get().decodedJWT, [field]: code}
      })
      debounce(async ()=>{
        const { decodedJWT, signature } = get()
        if(!decodedJWT) return
        const { header, claim } = decodedJWT
        const encodedText = await jwtEncode(header, claim, signature)
        if(encodedText) {
          set({ encodedText, encodedError: null })
        } else {
          set({ encodedText:'', encodedError: 'Invalid JSON' })
        }
      }, 250)()
    }

  }),
  {
    name: 'store-widgets-dev-utils',
    partialize: (state) => ({
      ...state,
      ...{
        decodedFile: null,
        //decodedJWT: null,
        decodedText: '',
        decodedError: null,
        encodedText: '',
        encodedError: null
      }
    })
  })
)