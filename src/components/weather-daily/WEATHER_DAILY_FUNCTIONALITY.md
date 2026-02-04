### WeatherDaily Component

Displays the daily weather forecast for a week.

#### Functionality
- Retrieves forecast data and error state from `useWeatherStore`.
- Maps daily forecast data using `weatherForecastMap`.
- Uses `useWidgetProps` to manage visibility and display order.
- Renders a list of `DayItem` components, each representing a single day's forecast.
- Displays an error message if an error exists in the store.

#### Components
- `WeatherDaily`: Main container, handles data fetching and mapping.
- `DayItem`: Presentational component for a single day (shows weekday, date, icon, min/max temperature, and description).

#### Data Source
- `useWeatherStore`: Provides `forecast.daily` and `error`.
- `useWidgetProps`: Manages `active` status and `order`.
