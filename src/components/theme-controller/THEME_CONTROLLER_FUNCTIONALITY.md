### ThemeController Component Functionality

The `ThemeController` is a headless React component that manages the application's visual theme based on user settings and system preferences.

#### Key Functions:
- **Theme Management**: Observes the `theme` value from `useSettingsStore`.
- **Theme Switching**:
  - `dark`: Manually adds `theme-dark` class to `document.documentElement`.
  - `light`: Manually removes `theme-dark` class from `document.documentElement`.
  - `system`: Automatically synchronizes with the operating system's dark mode preference using `window.matchMedia("(prefers-color-scheme: dark)")`.
- **System Sync**: Listens for real-time changes in system color scheme when the theme is set to `system`.
- **Lifecycle**: Updates the theme application via `useEffect` whenever the theme setting changes.
- **Rendering**: Returns `null` as it has no UI representation.