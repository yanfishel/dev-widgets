import {T_WidgetsSettings} from "@/types/settings";
import {T_AppSettings} from "@/types/app";
import {E_EncodingTypes, E_SignatureAlgorithms} from "@/enums";
import { SECRET_KEYS} from "./dev-utils";
import {WIDGETS_ID} from "./app";
import {T_DevUtilsStore} from "@/types/dev-utils";
import {ColorTranslator} from "colortranslator";


export const APP_WIDTH = {
  SMALL: 300,
  MEDIUM: 360,
  LARGE: 440,
}

export const APP_SETTINGS_DEFAULT:T_AppSettings = {
  width: APP_WIDTH.LARGE,
  height: APP_WIDTH.LARGE,
  x: 0,
  y: 0,
  locked: false,
  openAtLogin: false
}

export const DEFAULT_LOCATION = {
  city:'',
  lat: 0,
  lon: 0
}

export const DEFAULT_NOTE = 'TYPE YOUR NOTES HERE'

/* -- WIDGET DEV UTILS - */
export const DEFAULT_ENCODED = {
  text:'',
  error:''
}
export const DEFAULT_DECODED_JWT = {
  header:'',
  claim:'',
  error:''
}
export const DEFAULT_SIGNATURE_JWT = {
  algorithm: E_SignatureAlgorithms.HS256,
  secret: SECRET_KEYS[E_SignatureAlgorithms.HS256],
  error:''
}
export const DEFAULT_DECODED_URL = {
  url:'',
  error:''
}
export const DEFAULT_DECODED_FILE: { file:File|null, error:string } = {
  file:null,
  error:''
}

export const DEFAULT_COLOR_HEX = '38bdf8'

export const DEFAULT_COLOR_RGB = {
  R: 56,
  G: 189,
  B: 246
}


export const DEFAULT_DEV_UTILS_STORE = {
  processing: false,
  selectedTab: 0,
  encodingType: E_EncodingTypes.JWT,
  signatureJWT: DEFAULT_SIGNATURE_JWT,
  decodedJWT: DEFAULT_DECODED_JWT,
  encodedJWT: DEFAULT_ENCODED,
  decodedURL: DEFAULT_DECODED_URL,
  encodedURL: DEFAULT_ENCODED,
  decodedFile: DEFAULT_DECODED_FILE,
  encodedFile: DEFAULT_ENCODED,

  colorError: false,
  inputColor: {
    ...DEFAULT_COLOR_RGB,
    A: 100,
    Hex: DEFAULT_COLOR_HEX,
    Alpha: 100
  }
}

/* -- WIDGET SETTINGS - */
export const WIDGETS_SETTINGS_DEFAULT:T_WidgetsSettings = {
  theme: 'system',
  size: 'large',
  locked: false,
  weather: {
    id: WIDGETS_ID.CURRENT_WEATHER,
    active: true
  },
  autoGeoPosition: true,
  location: DEFAULT_LOCATION,
  widgets: [
    {
      id: WIDGETS_ID.DAILY_WEATHER,
      title: 'Daily Weather',
      active: true,
      collapsed: false,
      order: 1
    },
    {
      id: WIDGETS_ID.WEB_SEARCH,
      title: 'Web Search',
      active: true,
      collapsed: false,
      order: 2
    },
    {
      id: WIDGETS_ID.SYSTEM_INFO,
      title: 'System Info',
      active: true,
      collapsed: false,
      order: 3
    },
    {
      id: WIDGETS_ID.MOCK_SERVER,
      title: 'Mock Server',
      active: true,
      collapsed: false,
      order: 4
    },
    {
      id: WIDGETS_ID.DEV_UTILS,
      title: 'Dev Utils',
      active: true,
      collapsed: false,
      order: 5
    },
    {
      id: WIDGETS_ID.NOTES,
      title: 'Notes',
      active: true,
      collapsed: false,
      order: 6
    }
  ]
}

/* -- WIDGET MOCK SERVER - */
export const MOCK_SERVER_SCHEME_DEFAULT = [
  {
    path: '/',
    scheme: [
      { name: '', value:'', type: 'string' }
    ]
  }
]