### SettingsMenu Component Functionality

The `SettingsMenu` component provides a modal interface for configuring global application settings and managing widgets.

#### Core Features:
- **Modal Dialog**: Controlled by a gear icon toggle. Uses a native `<dialog>` element for the modal.
- **Lock Position**: Toggle to lock/unlock the position of widgets on the screen. Calls `window.electronAPI.setLockPosition`.
- **Widget Size**: Dropdown to select global widget scaling (`small`, `medium`, `large`). Calls `window.electronAPI.setWidgetsSize`.
- **Theme Selection**: Choose between `System`, `Light`, and `Dark` modes. Updates `useSettingsStore`.
- **Weather Configuration**:
    - **Location**: Switch between `Auto` (geo-positioning) and `Manual` entry.
    - **Manual Entry**: Fields for `City`, `Latitude`, and `Longitude`.
    - **Current Weather Toggle**: Enable/disable the weather widget/data.
- **Widget Management**:
    - **Visibility**: Toggle individual widgets on/off.
    - **Reordering**: Drag-and-drop interface (using `react-sortablejs`) to change the display order of widgets.
- **About Link**: Opens the "About" window via `window.electronAPI.openAboutWindow`.

#### Interaction Logic:
- **State Management**: Uses `useSettingsStore` for reactive updates and persistence.
- **IPC Communication**: Synchronizes settings with the Electron main process via `window.electronAPI`.
- **Event Handling**: Includes a backdrop click listener to close the menu when clicking outside the dialog.
