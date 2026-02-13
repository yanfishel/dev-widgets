import { WIDGETS_ID} from "@/constants";

export const APP_WIDTH = {
  SMALL: 300,
  MEDIUM: 360,
  LARGE: 440,
}

export const APP_SETTINGS_DEFAULT:IAppSettings = {
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
export const EXAMPLE_JWT_HEADER = `{\n  "alg": "HS256",\n  "typ": "JWT"\n}`
export const EXAMPLE_JWT_CLAIM = `{\n  "jti": "96492d59-0ad5-4c00-892d-590ad5ac00f3",\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1681040515\n}`
export const DEFAULT_JWT_SECRET = 's3cre!'
export const DEFAULT_ENCODED = {
  text:'',
  error:''
}
export const DEFAULT_DECODED_JWT = {
  header:'',
  claim:'',
  signature: DEFAULT_JWT_SECRET,
  error:''
}
export const DEFAULT_DECODED_URL = { url:'', error:'' }
export const DEFAULT_DECODED_FILE:{file:File|null, error:string} = { file:null, error:'' }

export const DEFAULT_DEV_UTILS_STORE = {
  processing: false,
  encodingType: 'JWT',
  decodedJWT: DEFAULT_DECODED_JWT,
  encodedJWT: DEFAULT_ENCODED,
  decodedURL: DEFAULT_DECODED_URL,
  encodedURL: DEFAULT_ENCODED,
  decodedFile: DEFAULT_DECODED_FILE,
  encodedFile: DEFAULT_ENCODED
}

/* -- WIDGET SETTINGS - */
export const WIDGETS_SETTINGS_DEFAULT:IWidgetsSettings = {
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
      order: 1
    },
    {
      id: WIDGETS_ID.WEB_SEARCH,
      title: 'Web Search',
      active: true,
      order: 2
    },
    {
      id: WIDGETS_ID.SYSTEM_INFO,
      title: 'System Info',
      active: true,
      order: 3
    },
    {
      id: WIDGETS_ID.MOCK_SERVER,
      title: 'Mock Server',
      active: true,
      order: 4
    },
    {
      id: WIDGETS_ID.DEV_UTILS,
      title: 'Dev Utils',
      active: true,
      order: 5
    },
    {
      id: WIDGETS_ID.NOTES,
      title: 'Notes',
      active: true,
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