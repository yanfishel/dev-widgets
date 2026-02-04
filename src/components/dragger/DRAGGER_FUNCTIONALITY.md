### Dragger Component

#### Functionality
- Renders a drag icon (`DragIcon`) used for moving the application window.
- Uses `-webkit-app-region: drag` to enable window dragging in Electron/WebKit environments.
- Visibility is controlled by the `locked` state from `useSettingsStore`.
- When `locked` is true, the component is hidden (`display: none`).
- Positioned fixed at the top-left of the screen.

#### Testing Focus
- Verify the icon is visible when `locked` is false.
- Verify the icon is hidden when `locked` is true.
- Ensure the `drag-icon` ID and CSS class `hidden` are applied correctly based on the store state.