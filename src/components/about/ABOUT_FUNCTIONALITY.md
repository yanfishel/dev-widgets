### About Component Functionality

The `About` component displays application metadata and system version information.

#### Key Features:
- **Data Fetching**: Retrieves application info (package.json data and system versions) via `window.electronAPI.getAppInfo()` on mount.
- **Display Elements**:
  - App logo (`LogoIcon`).
  - Product name and version.
  - App description.
  - Links: Homepage and "Report a bug" (opened externally via `openExternalLink`).
  - Author information with a `mailto` link.
  - System versions table (e.g., Electron, Node, Chrome).
  - Credits for weather data and icons with external links.
- **Interactions**:
  - Uses `openExternalLink` for all external URLs to ensure they open in the default system browser instead of the Electron window.
