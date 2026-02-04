### AnalogClock Component Functionality

The `AnalogClock` component provides a visual representation of an analog clock and current date information.

#### Key Features:
- **Visual Representation**: Displays clock hands (hour, minute, second) that rotate based on the current time.
- **Dynamic Updates**: Uses `displayTime` and `displayDate` from the global store (`useGlobalStore`) to update state and UI.
- **Clock Hand Logic**: Calculates rotation degrees for each hand:
  - Hour: `(hours * 30) + (minutes / 2) - 90`
  - Minute: `(minutes * 6) + (seconds / 10) - 90`
  - Second: `seconds * 6 - 90`
- **Date Display**: Shows the current weekday and a short date string.
- **Branding**: Includes a central logo (`LogoClockIcon`).
- **Styling**: Relies on CSS classes for layout and hand positioning (e.g., `.hourhand`, `.minutehand`, `.secondhand`, `.nail`).

#### Store Dependencies:
- `useGlobalStore`: Accesses `displayTime` (hours, minutes, seconds) and `displayDate` (weekday, shortdate).