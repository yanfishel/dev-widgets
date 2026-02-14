import {createWithEqualityFn} from "zustand/traditional";
import { persist } from "zustand/middleware";
import { merge } from "ts-deepmerge";

import {T_DevUtilsStore} from "@/types/dev-utils";
import {DEFAULT_DECODED_FILE, DEFAULT_DECODED_JWT, DEFAULT_DECODED_URL, DEFAULT_DEV_UTILS_STORE, DEFAULT_ENCODED, E_EncodingTypes} from "@/constants";
import {debounce, jwtEncode, jwtVerify} from "@/utils";



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

    reset: (encodingType) => {
      switch ( encodingType) {
        case E_EncodingTypes.JWT:
          set({ signatureJWT: {...get().signatureJWT, ...{error:''}}, decodedJWT: DEFAULT_DECODED_JWT, encodedJWT: DEFAULT_ENCODED })
          break
        case E_EncodingTypes.URL:
          set({ decodedURL: DEFAULT_DECODED_URL, encodedURL: DEFAULT_ENCODED })
          break
        case E_EncodingTypes.base64 || E_EncodingTypes.base32:
          set({ decodedFile: DEFAULT_DECODED_FILE, encodedFile: DEFAULT_ENCODED })
          break
        default:
          set({
            decodedFile: DEFAULT_DECODED_FILE,
            encodedFile: DEFAULT_ENCODED,
            decodedJWT: DEFAULT_DECODED_JWT,
            encodedJWT: DEFAULT_ENCODED,
            decodedURL: DEFAULT_DECODED_URL,
            encodedURL: DEFAULT_ENCODED
          })
      }
    },

    resetDecoded: (encodingType) => {
      switch ( encodingType) {
        case E_EncodingTypes.JWT:
          set({ signatureJWT: {...get().signatureJWT, ...{error:''}}, decodedJWT: DEFAULT_DECODED_JWT })
          break
        case E_EncodingTypes.URL:
          set({ decodedURL: DEFAULT_DECODED_URL })
          break
        case E_EncodingTypes.base64 || E_EncodingTypes.base32:
          set({ decodedFile: DEFAULT_DECODED_FILE })
          break
        default:
          set({
            decodedFile: DEFAULT_DECODED_FILE,
            decodedJWT: DEFAULT_DECODED_JWT,
            decodedURL: DEFAULT_DECODED_URL
          })
      }
    },

    resetEncoded: (encodingType) => {
      switch ( encodingType) {
        case E_EncodingTypes.JWT:
          set({ signatureJWT: {...get().signatureJWT, ...{error:''}}, encodedJWT: DEFAULT_ENCODED })
          break
        case E_EncodingTypes.URL:
          set({ encodedURL: DEFAULT_ENCODED })
          break
        case E_EncodingTypes.base64 || E_EncodingTypes.base32:
          set({ encodedFile: DEFAULT_ENCODED })
          break
        default:
          set({
            encodedFile: DEFAULT_ENCODED,
            encodedJWT: DEFAULT_ENCODED,
            encodedURL: DEFAULT_ENCODED
          })
      }
    },

    onDecodedJWTChange: ( field, code ) => {
      set({
        signatureJWT: {...get().signatureJWT, ...{error:''}},
        decodedJWT: {...get().decodedJWT, ...{[field]: code, error:''}}
      })
      debounce(async ()=>{
        const { decodedJWT, signatureJWT } = get()
        const { header, claim } = decodedJWT
        const { secret, algorithm} = signatureJWT
        await jwtEncode(header, claim, secret, algorithm)
              .then(res => {
                set({encodedJWT: {text: res, error: ''}})
              })
              .catch(e => {
                console.log(e)
                set({ encodedJWT: { text:'', error:`Invalid JSON - ${e.message}` }})
              })
      }, 250)()
    },

    checkJWTSignature: async (text:string) => {
      const { signatureJWT } = get()
      const { secret } = signatureJWT
      if(!secret) {
        set({ signatureJWT: {...signatureJWT, ...{ error:'Signature secret not provided'}} })
      }
      const act = await jwtVerify(text, signatureJWT.secret)
      set({ signatureJWT: {...signatureJWT, ...{ error: act ? '' : 'Signature verification failed' }}})
    }

  }),
  {
    name: 'store-widgets-dev-utils',
    merge: (persisted, current) => merge(current, persisted as T_DevUtilsStore),
    partialize: (state) => ({
        ...state,
        ...{
          processing: false,
          signatureJWT:  {...state.signatureJWT, ...{error: ''}},
          decodedJWT: DEFAULT_DECODED_JWT,
          encodedJWT: DEFAULT_ENCODED,
          decodedFile: DEFAULT_DECODED_FILE,
          encodedFile: DEFAULT_ENCODED
        }
      })
  })
)