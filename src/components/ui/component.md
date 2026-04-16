# UI Components Documentation

## DateInput

The `DateInput` component is a customizable date and time picker built on top of `react-datepicker`.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date \| null` | `null` | The currently selected date. |
| `onChange` | `(date: Date \| null) => void` | `undefined` | Callback fired when a date is selected or cleared. |
| `label` | `string` | `undefined` | Display label for the field. |
| `required` | `boolean` | `false` | Whether the field is marked as required (shows an asterisk if true). |
| `error` | `string` | `undefined` | Error message to display below the input and highlight the border. |
| `name` | `string` | `undefined` | Generates a hidden input field for native form submissions. |
| `format` | `string` | `'MM/dd/yyyy'` | Format string for the displayed date text. |
| `className` | `string` | `undefined` | Additional CSS classes for the container. |
| `placeholderText` | `string` | `'Select Date'` | Placeholder text. |
| `minDate` | `Date` | `undefined` | Minimum allowed date. |
| `maxDate` | `Date` | `undefined` | Maximum allowed date. |
| `showTimeSelect` | `boolean` | `false` | Enables time selection. |
| `showTimeSelectOnly` | `boolean` | `false` | Only shows time selection. |
| `isClearable` | `boolean` | `false` | Enables a button to clear the currently selected date. |
| `showInFullScreen` | `boolean` | `false` | Uses a portal to render the calendar in full screen. |
| `isDisabled` | `boolean` | `false` | Disables the entire date picker. |
| `excludeDates` | `Date[]` | `[]` | List of dates to disable from selection. |
| `weekendsDisabled` | `boolean` | `false` | Disables weekend selection (Saturdays and Sundays). |
| `highlightDates` | `HighlightDate[]` | `[]` | Apply class name custom styling to specified dates. |
| `holidays` | `Holiday[]` | `[]` | List of holiday dates to style. |
| `portalId` | `string` | `undefined` | Uses a specified portal element ID for the calendar. |
| `readOnly` | `boolean` | `undefined` | Puts the input in read-only mode. |
| `responsive` | `boolean` | `undefined` | Changes the width to 1/2 on tablet/desktop displays. |
| `size` | `ComponentSize` | `'medium'` | One of `'small'`, `'medium'`, `'large'`, `'xlarge'`. |
| `outline` | `boolean` | `true` | Show form focus outline styling. |

---

## SelectInput

The `SelectInput` component provides an autocomplete-enabled dropdown select using the accessibility-focused `downshift` library (`useCombobox`).

### Types

```typescript
interface Option {
  value: string | number;
  label: string;
}
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `Option[]` | _(required)_ | Array of selectable options with `label` and `value`. |
| `label` | `string` | `undefined` | Display label for the field. |
| `placeholder` | `string` | `'Select an option'` | Placeholder text when no value is selected. |
| `value` | `string \| number` | `undefined` | Currently selected option's value. |
| `onChange` | `(value: string \| number \| undefined) => void` | `undefined` | Callback fired when an option is selected or cleared. |
| `onBlur` | `() => void` | `undefined` | Callback fired when the input loses focus. |
| `error` | `string` | `undefined` | Error message to display below the input and highlight the border. |
| `disabled` | `boolean` | `false` | Whether the select dropdown is interactable. |
| `required` | `boolean` | `false` | Marks the underlying input block as required. |
| `className` | `string` | `''` | Extra CSS overrides for the root wrapper element. |
| `size` | `ComponentSize` | `'medium'` | Sizing scale: `'small'`, `'medium'`, `'large'`, `'xlarge'`. |
| `name` | `string` | `undefined` | Generates a hidden input field for native form submissions. |
| `clearable` | `boolean` | `true` | Allows clearing the currently selected choice back to empty. |
| `responsive` | `boolean` | `false` | Adjusts width based on viewport logic (mobile vs. tablet/desktop width). |

---

## Button

The `Button` component is a flexible, highly customizable button element supporting various variants, tones, and sizes. _(Note: The codebase does not currently contain a `ButtonGroup` component, so only `Button` is documented here)._

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `undefined` | Display text for the button (can also use `children`). |
| `size` | `ComponentSize` | `'medium'` | Sizing scale: `'small'`, `'medium'`, `'large'`, `'xlarge'`. |
| `variant` | `ButtonVariant` | `'solid'` | Visual style of the button: `'solid'`, `'outline'`, `'ghost'`, `'soft'`. |
| `tone` | `ButtonTone` | `'primary'` | Semantic color tone: `'primary'`, `'neutral'`, `'danger'`. |
| `radius` | `ControlRadius` | `'md'` | Border radius: `'none'`, `'sm'`, `'md'`, `'lg'`, `'full'`. |
| `reaponsive` | `boolean` | `false` | **Note the typo in source code**. Adjusts width to 100% on mobile and auto on md+ if true. |
| `leadingIcon` | `ButtonIconConfig` | `undefined` | Configuration for an icon placed before the label. |
| `trailingIcon` | `ButtonIconConfig` | `undefined` | Configuration for an icon placed after the label. |
| `isLoading` | `boolean` | `false` | Shows a loading spinner and disables the button. |
| `disabled` | `boolean` | `false` | Standard HTML disabled attribute. Disables the button. |
| `...props` | `HTMLButtonAttributes` |  | Any standard HTML button attributes (e.g. `onClick`, `type`, `className`). |
