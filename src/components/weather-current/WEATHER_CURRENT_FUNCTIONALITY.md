### WeatherCurrent Component Functionality

Displays current weather information and local date/location details.

#### Key Features:
- **Location Display**: Shows city and country code from `useSettingsStore`.
- **Date Display**: Shows current date and weekday from `useGlobalStore`.
- **Weather Information**:
    - Displays temperature, weather description, and icon if weather is active.
    - Uses `weatherConditionByCode` utility to map weather codes to icons and descriptions.
- **Automatic Updates**:
    - Triggers weather forecast update every hour (when minutes and seconds reach 0).
    - Reacts to changes in forecast data and weather activation status.

#### Data Sources:
- `useGlobalStore`: Provides `displayDate` and `displayTime`.
- `useSettingsStore`: Provides `userLocation` and `weather` status.
- `useWeatherStore`: Provides `forecast` data and `updateWeatherForecast` action.

#### UI Elements:
- Root container with ID `CURRENT_WEATHER`.
- Conditional rendering for weather details based on `weather.active`.