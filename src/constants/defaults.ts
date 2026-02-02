
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

export const WIDGETS_SETTINGS_DEFAULT:IWidgetsSettings = {
  theme: 'system',
  size: 'large',
  locked: false,
  weather: {
    id: 'widget-weather',
    active: true
  },
  autoGeoPosition: true,
  location: DEFAULT_LOCATION,
  widgets: [
    {
      id: 'widget-daily-weather',
      title: 'Daily Weather',
      active: true,
      order: 1
    },
    {
      id: 'widget-web-search',
      title: 'Web Search',
      active: true,
      order: 2
    },
    {
      id: 'widget-system-info',
      title: 'System Info',
      active: true,
      order: 3
    },
    {
      id: 'widget-mock-server',
      title: 'Mock Server',
      active: true,
      order: 4
    },
    {
      id: 'widget-dev-utils',
      title: 'Dev Utils',
      active: true,
      order: 5
    },
    {
      id: 'widget-notes',
      title: 'Notes',
      active: true,
      order: 6
    }
  ]
}

export const MOCK_SERVER_SCHEME_DEFAULT = [
  {
    path: '/',
    scheme: [
      { name: '', value:'', type: 'string' }
    ]
  }
]