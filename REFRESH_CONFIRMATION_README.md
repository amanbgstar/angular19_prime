# Angular Refresh Confirmation Feature

This Angular application demonstrates how to implement a confirmation dialog that appears when users try to refresh the page or navigate away, helping to prevent data loss.

## Features

- **Refresh/Unload Confirmation**: Shows a confirmation dialog when users try to refresh the page or close the tab
- **Custom Message**: Displays the message "Data will be loss are you sure to loss?" as requested
- **Smart Detection**: Only shows confirmation when there are unsaved changes
- **Interactive Demo**: Includes a form with real-time change detection
- **Modern UI**: Clean, responsive interface with status indicators

## How It Works

### Core Implementation

The confirmation is implemented using the `@HostListener` decorator in Angular to listen for the `beforeunload` event:

```typescript
@HostListener('window:beforeunload', ['$event'])
beforeUnloadHandler(event: BeforeUnloadEvent) {
    if (this.hasUnsavedChanges) {
        event.preventDefault();
        const message = 'Data will be loss are you sure to loss?';
        event.returnValue = message;
        return message;
    }
    return null;
}
```

### Key Components

1. **Event Listener**: Uses `window:beforeunload` to detect page refresh/close attempts
2. **Conditional Logic**: Only triggers when `hasUnsavedChanges` is true
3. **Browser Compatibility**: Handles both modern and older browser implementations
4. **Custom Message**: Sets the specified confirmation message

### Form Integration

The demo includes a reactive form that:
- Tracks changes in real-time using `(input)` event handlers
- Updates the `hasUnsavedChanges` flag when data is modified
- Provides save/clear functionality to manage the confirmation state
- Shows visual status indicators for unsaved/saved states

## Usage Instructions

### Running the Application

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser to `http://localhost:4200`

### Testing the Feature

1. **Enter Data**: Type some text in any of the form fields
2. **Trigger Confirmation**: Try to refresh the page (Ctrl+R, F5, or browser refresh button)
3. **See Dialog**: The browser will show a confirmation dialog with your custom message
4. **Test Save**: Click "Save Data" and try refreshing again (no confirmation will appear)
5. **Toggle Feature**: Use the toggle button to enable/disable the confirmation

## Browser Behavior Notes

- **Modern Browsers**: Chrome, Firefox, Safari, and Edge will show their own generic confirmation message, but still respect the `preventDefault()` call
- **Older Browsers**: May display the custom message text more directly
- **Security**: Browsers limit custom messages to prevent malicious use

## Implementation Details

### Dependencies Required

```typescript
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
```

### Key Properties

- `hasUnsavedChanges: boolean` - Tracks whether confirmation should be shown
- `formData: object` - Holds the form data being tracked
- Event handlers for form changes, save, clear, and toggle actions

### Styling

The demo includes comprehensive CSS styling with:
- Responsive design for mobile and desktop
- Visual status indicators
- Modern button styling with hover effects
- Clear instructions and information sections

## Customization

### Changing the Message

Modify the message in the `beforeUnloadHandler` method:

```typescript
const message = 'Your custom message here';
```

### Adjusting Trigger Conditions

Modify the condition in the event handler:

```typescript
if (this.hasUnsavedChanges && this.someOtherCondition) {
    // Show confirmation
}
```

### Adding to Existing Components

Copy the `@HostListener` method and related logic to any component where you need refresh confirmation.

## Best Practices

1. **Only When Needed**: Only show confirmation when there are actual unsaved changes
2. **Clear Indicators**: Provide visual feedback about save status
3. **Easy Save**: Make it easy for users to save their data
4. **Test Thoroughly**: Test across different browsers and scenarios
5. **Graceful Degradation**: Ensure the app works even if the confirmation fails

## Troubleshooting

- **Confirmation Not Showing**: Check that `hasUnsavedChanges` is true when expected
- **Message Not Custom**: Modern browsers may override custom messages for security
- **Event Not Firing**: Ensure the component implementing the listener is active
- **TypeScript Errors**: Make sure all required imports are included

## Browser Support

- ✅ Chrome (all recent versions)
- ✅ Firefox (all recent versions)
- ✅ Safari (all recent versions)
- ✅ Edge (all recent versions)
- ✅ Internet Explorer 11 (basic support)

This implementation provides a robust, user-friendly way to prevent accidental data loss while maintaining good user experience principles.