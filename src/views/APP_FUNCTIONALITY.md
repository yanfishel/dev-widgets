### App Component Functionality

The `App` component is the root container for the main view, responsible for initializing the application, managing global state, and layout.

#### Core Responsibilities
- **Initialization**: Executes `initApp` on mount to start the application timer, register Electron event handlers, and fetch initial location and weather data.
- **State Management**:
  - Connects to `useGlobalStore`, `useSettingsStore`, and `useWeatherStore`.
  - Manages a local `loading` state to prevent rendering before initialization is complete.
- **Electron Integration**:
  - `onLockPosition`: Updates the `locked` state in the settings store.
  - `onWidgetsResize`: Updates the widget size class on the document element and the settings store.
- **Reactive Updates**: Automatically refreshes weather forecasts when `userLocation` or `weather.active` status changes.

#### Layout Structure
- **Global Components**: `ThemeController`, `Dragger`.
- **Top Container**: Contains `SettingsMenu`, `AnalogClock`, and `WeatherCurrent`.
- **Content Container**: Wraps `WeatherDaily` and `WebSearch` within a styled wrapper.

#### Dynamic Styling
- Updates `document.documentElement` class list with `widgets-size-{size}` (small, medium, large) to support dynamic resizing.