### WidgetToaster Component

A wrapper around `react-hot-toast`'s `Toaster` component for displaying notifications.

#### Props
- `toasterId` (optional): Unique identifier for the toaster (defaults to `'default'`).
- `className` (optional): CSS class for the toaster container.

#### Functionality
- **Position**: Fixed at `top-center`.
- **Order**: Newest toasts appear at the bottom (`reverseOrder={false}`).
- **Gutter**: 8px spacing between toasts.
- **Styling**: 
  - Absolute positioning with `5px` inset.
  - Default dark theme: `#363636` background, white text.
  - **Success**: Green background (`#01A781`), white text.
  - **Error**: Red background (`#cc0000`), white text.
- **Duration**: 5000ms (5 seconds) with a 1000ms remove delay.