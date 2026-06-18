/**
 * Eagle Eye Rides — form components barrel.
 * Reusable form / summary / progress primitives for the booking flow.
 */

export {
  AddressInput,
  type AddressInputProps,
  type AddressVariant,
} from "./address-input";

export {
  DateTimePicker,
  type DateTimePickerProps,
} from "./date-time-picker";

export {
  VehicleSelector,
  type VehicleOption,
  type VehicleSelectorProps,
} from "./vehicle-selector";

export {
  PaymentMethodSelector,
  type PaymentMethod,
  type PaymentMethodSelectorProps,
} from "./payment-method-selector";

export {
  FareSummary,
  type FareSummaryItem,
  type FareSummaryProps,
} from "./fare-summary";

export {
  BookingSummaryCard,
  type BookingSummaryCardProps,
} from "./booking-summary-card";

export { TripProgress, type TripProgressProps } from "./trip-progress";

export {
  PromoCodeInput,
  type AppliedPromo,
  type PromoCodeInputProps,
} from "./promo-code-input";

export { RatingStars, type RatingStarsProps } from "./rating-stars";

export { FilterChips, type FilterChipsProps } from "./filter-chips";

export { FormField, type FormFieldProps } from "./form-field";
