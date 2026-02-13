import {createWithEqualityFn} from "zustand/traditional";
import { persist } from "zustand/middleware";
import { merge } from "ts-deepmerge";

import {DEFAULT_DECODED_FILE, DEFAULT_DECODED_JWT, DEFAULT_DECODED_URL, DEFAULT_DEV_UTILS_STORE, DEFAULT_ENCODED } from "@/constants";
import {debounce, jwtEncode} from "@/utils";


export const useDevUtilsStore = createWithEqualityFn<T_DevUtilsStore>()(
  persist<T_DevUtilsStore>( (set, get) => ({

    ...DEFAULT_DEV_UTILS_STORE,

    updateEncodingType: (type) => {
      set({
        encodingType: type,
        decodedFile: DEFAULT_DECODED_FILE,
        encodedFile: DEFAULT_ENCODED,
      })
    },

    reset: () => {
      set({
        decodedFile: DEFAULT_DECODED_FILE,
        encodedFile: DEFAULT_ENCODED,
        decodedJWT: DEFAULT_DECODED_JWT,
        encodedJWT: DEFAULT_ENCODED,
        decodedURL: DEFAULT_DECODED_URL,
        encodedURL: DEFAULT_ENCODED
      })
    },

    resetDecoded: () => {
      set({
        decodedFile: DEFAULT_DECODED_FILE,
        decodedJWT: DEFAULT_DECODED_JWT,
        decodedURL: DEFAULT_DECODED_URL
      })
    },

    resetEncoded: () => {
      set({
        encodedFile: DEFAULT_ENCODED,
        encodedJWT: DEFAULT_ENCODED,
        encodedURL: DEFAULT_ENCODED
      })
    },

    onDecodedJWTChange: ( field, code ) => {
      set({
        decodedJWT: {...get().decodedJWT, ...{[field]: code, error:''}}
      })
      debounce(async ()=>{
        const { decodedJWT } = get()
        const { header, claim, signature } = decodedJWT
        const text = await jwtEncode(header, claim, signature)
        if(text) {
          set({ encodedJWT: { text, error:'' }})
        } else {
          set({ encodedJWT: { text:'', error:'Invalid JSON' }})
        }
      }, 250)()
    }

  }),
  {
    name: 'store-widgets-dev-utils',
    merge: (persisted, current) => merge(current, persisted as T_DevUtilsStore),
    partialize: (state) => ({
      ...state,
      ...{
        processing: false,
        decodedJWT: state.decodedJWT.error || state.encodedJWT.error ? { ...state.decodedJWT, ...{ header:'', claim:'', error:'' } } : state.decodedJWT,
        encodedJWT: state.decodedJWT.error || state.encodedJWT.error ? DEFAULT_ENCODED : state.encodedJWT,
        decodedFile: DEFAULT_DECODED_FILE,
        encodedFile: DEFAULT_ENCODED
      }
    })
  })
)