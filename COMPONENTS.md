# Eagle Eye Rides — Components Reference

Complete inventory of the UI Kit. **109 files** across 7 categories.

All components live under `src/components/eer/`. Import utilities via
`@/lib/utils` (`cn`), shadcn primitives via `@/components/ui/*`.

---

## Index

1. [Base components](#1-base-components) — `src/components/eer/`
2. [Form components](#2-form-components) — `src/components/eer/forms/`
3. [User app screens](#3-user-app-screens) — `src/components/eer/screens/`
4. [Driver app screens](#4-driver-app-screens) — `src/components/eer/screens/driver/`
5. [System pages](#5-system-pages) — `src/components/eer/screens/system/`
6. [Admin components](#6-admin-components) — `src/components/eer/admin/`
7. [Email templates](#7-email-templates) — `src/components/eer/emails/`

---

## 1. Base components

| Component | File | Props | Purpose |
|---|---|---|---|
| `Logo` | `logo.tsx` | `size?, showWordmark?, subtitle?` | Brand logo (light/dark auto) |
| `ThemeToggle` | `theme-toggle.tsx` | — | Light/dark switch button |
| `ThemeProvider` | `../theme-provider.tsx` | next-themes props | Wraps app in layout |
| `StatusBadge` | `status-badge.tsx` | `tone?, dot?` | Pill status badge (7 tones) |
| `SectionLabel` | `section-label.tsx` | `action?` | Uppercase section heading + optional action |
| `EmptyState` | `empty-state.tsx` | `icon?, title, description?, action?` | Empty/zero-state card |
| `PhoneFrame` | `phone-frame.tsx` | `label?` | 380×760 mobile mockup frame |
| `AppHeader` | `app-header.tsx` | `greeting?, name?, showSearch?` | Gradient mobile app header |
| `BottomNav` | `bottom-nav.tsx` | `variant?, active?, onNavigate?, items?` | Mobile bottom nav. `variant`: `"user"` (Home/Trips/Ride-CTA/Wallet/Profile), `"driver"` (Home/Schedule/Online-CTA/Earnings/Profile), `"legacy"` |
| `WhereToBar` | `where-to-bar.tsx` | `title?, subtitle?, onClick?` | Search/destination bar (on gradient) |
| `ServiceCard` | `service-card.tsx` | `icon, title, description, accent?, onClick?` | Service tile (Reserve/Packages/Ads/Tow) |
| `RideOption` | `ride-option.tsx` | `icon, name, eta, price, selected?, onClick?` | Selectable ride tier row |
| `DriverCard` | `driver-card.tsx` | `name, rating, car, plate, initials` | Driver info + call/message actions |
| `EerAlert` | `eer-alert.tsx` | `variant, title, description?, icon?, action?, onDismiss?` | Inline alert banner (info/success/warning/danger/brand) |
| `DetailDrawer` | `detail-drawer.tsx` | `open, onOpenChange, title, description?, children, footer?, side?` | Sheet drawer for details (right/bottom) |
| `Skeletons` | `skeletons.tsx` | — | Exports `CardSkeleton`, `StatCardSkeleton`, `TableSkeleton`, `RideOptionSkeleton`, `DriverCardSkeleton`, `ScreenSkeleton` |
| `EerToastDemo` | `eer-toast-demo.tsx` | — | Demo triggering themed toasts |
| `accents` | `accents.ts` | — | Exports `Accent` type, `accentSolid`, `accentSoft`, `Tone`, `toneSoft` |

**Accent system**: `Accent = "brand" | "cyan" | "amber" | "magenta" | "gold" | "success"`.
`accentSolid[accent]` = solid bg+text. `accentSoft[accent]` = tinted bg+text.
See [THEME.md](./THEME.md) to add new accents.

---

## 2. Form components

All re-exported from `@/components/eer/forms` (barrel `index.ts`).

| Component | File | Key props | Purpose |
|---|---|---|---|
| `AddressInput` | `address-input.tsx` | `variant?, value?, onChange?, onDetectLocation?, onClear?` | Labeled address field. `variant`: `"pickup"` / `"destination"` / `"stop"` |
| `DateTimePicker` | `date-time-picker.tsx` | `date?, time?, onDateChange?, onTimeChange?` | Date + time picker with Now/Schedule toggle |
| `VehicleSelector` | `vehicle-selector.tsx` | `options: VehicleOption[], value?, onChange?` | Single-select vehicle tiers |
| `PaymentMethodSelector` | `payment-method-selector.tsx` | `methods: PaymentMethod[], value?, onChange?, onAddMethod?` | Radio-style payment picker |
| `FareSummary` | `fare-summary.tsx` | `items: FareSummaryItem[], total, discount?` | Fare breakdown card |
| `BookingSummaryCard` | `booking-summary-card.tsx` | `pickup, destination, serviceName, serviceAccent?, dateTime?, passengers?` | Compact booking summary with route |
| `TripProgress` | `trip-progress.tsx` | `steps: string[], current` | Horizontal multi-step indicator |
| `PromoCodeInput` | `promo-code-input.tsx` | `onApply?, applied?` | Promo code entry with apply/remove |
| `RatingStars` | `rating-stars.tsx` | `value?, onChange?, max?, size?, readonly?` | Interactive star rating |
| `FilterChips` | `filter-chips.tsx` | `options, value?, onChange?, allLabel?` | Horizontal filter chips |
| `FormField` | `form-field.tsx` | `label, error?, description?, required?, children` | Field wrapper with label + validation error |

**Exported types**: `VehicleOption`, `PaymentMethod`, `FareSummaryItem`,
`BookingSummaryCardProps`, `TripProgressProps`, `AppliedPromo`,
`AddressVariant`, `RatingStarsProps`, `FilterChipsProps`.

---

## 3. User app screens

All in `src/components/eer/screens/`. Each fits a 380px `PhoneFrame`.

| Screen | File | BottomNav | Purpose |
|---|---|---|---|
| `HomeScreen` | `home-screen.tsx` | legacy | Services grid + saved places + promo |
| `ReserveScreen` | `reserve-screen.tsx` | legacy | Book a one-way ride (ride options) |
| `TrackingScreen` | `tracking-screen.tsx` | none | Live ride tracking (map + driver) |
| `MapViewScreen` | `map-view-screen.tsx` | none | Full-screen live map with route |
| `ChauffeurScreen` | `chauffeur-screen.tsx` | legacy | Hourly chauffeur booking |
| `PackageScreen` | `package-screen.tsx` | legacy | Send a package |
| `DirectionsScreen` | `directions-screen.tsx` | legacy | Directions/transit |
| `AuthScreen` | `auth-screen.tsx` | none | User login/signup with role toggle |
| `ProfileScreen` | `profile-screen.tsx` | user | User profile + menu |
| `WalletScreen` | `wallet-screen.tsx` | user | Wallet balance + transactions |
| `RideHistoryScreen` | `ride-history-screen.tsx` | user | Past rides with filters |
| `PointsScreen` | `points-screen.tsx` | user | Loyalty points + history |
| `ReferralsScreen` | `referrals-screen.tsx` | user | Refer & earn + referral link |
| `TipsHistoryScreen` | `tips-history-screen.tsx` | user | Tips given history |
| `SettingsScreen` | `settings-screen.tsx` | user | Account/notification/privacy settings |
| `PaymentCheckoutScreen` | `payment-checkout-screen.tsx` | user | Checkout (payment + tip + promo) |
| `ForgotPasswordScreen` | `forgot-password-screen.tsx` | none | Request password reset |
| `ResetPasswordScreen` | `reset-password-screen.tsx` | none | Set new password + strength meter |
| `ProfileLockScreen` | `profile-lock-screen.tsx` | none | Re-authentication lock |

---

## 4. Driver app screens

All in `src/components/eer/screens/driver/`. Each fits a 380px `PhoneFrame`.

| Screen | File | BottomNav | Purpose |
|---|---|---|---|
| `DriverHomeScreen` | `driver-home-screen.tsx` | driver | Go online toggle + today's stats + upcoming |
| `DriverChauffeurScheduleScreen` | `driver-chauffeur-schedule-screen.tsx` | driver | Scheduled chauffeur jobs |
| `DriverPackagesScreen` | `driver-packages-screen.tsx` | driver | Package delivery queue (accept/decline) |
| `DriverMapScreen` | `driver-map-screen.tsx` | none | Driver live navigation |
| `DriverEarningsScreen` | `driver-earnings-screen.tsx` | driver | Earnings + bar chart + payouts |
| `DriverSigninScreen` | `driver-signin-screen.tsx` | none | Driver login |
| `DriverSignupScreen` | `driver-signup-screen.tsx` | none | Driver application form (vehicle + docs) |
| `DriverTipsReportScreen` | `driver-tips-report-screen.tsx` | driver | Tips report + chart |

---

## 5. System pages

All in `src/components/eer/screens/system/`.

| Screen | File | Props | Purpose |
|---|---|---|---|
| `ErrorScreen` | `error-screen.tsx` | `code: 403\|404\|500, title?, description?, onAction?, inFrame?` | Reusable error page |
| `MaintenanceScreen` | `maintenance-screen.tsx` | `inFrame?` | Scheduled maintenance |
| `PricingScreen` | `pricing-screen.tsx` | — | Plans + fare estimator + FAQ |

---

## 6. Admin components

All in `src/components/eer/admin/`. Desktop-first, use shadcn Card/Table primitives.

### Shell & layout

| Component | File | Purpose |
|---|---|---|
| `AdminSidebar` | `admin-sidebar.tsx` | Vertical nav (Overview/Operations/Finance/Content/System). Exports `adminNavItems`, `AdminNavItem` |
| `AdminTopbar` | `admin-topbar.tsx` | Top bar: title + search + actions + user. Props: `title, breadcrumb?, themeToggle?, user?` |
| `PageHeader` | `page-header.tsx` | Page title + description + actions |
| `ConfigField` | `config-field.tsx` | Labeled settings row (label/description + control) |

### Data display

| Component | File | Key types | Purpose |
|---|---|---|---|
| `StatCard` | `stat-card.tsx` | `StatCardData` | KPI tile with trend |
| `EarningsChart` | `earnings-chart.tsx` | `EarningsDataPoint` | 7-day earnings area chart |
| `RidesTable` | `rides-table.tsx` | `RideRow`, `RideStatus`, `ridesStatusTone` | Recent rides table |
| `DriversTable` | `drivers-table.tsx` | `DriverRow` | Drivers table |
| `UsersTable` | `users-table.tsx` | `UserRow`, `userStatusTone` | Users management table |
| `PaymentsTable` | `payments-table.tsx` | `PaymentRow`, `paymentStatusTone` | Payments/transactions table |
| `CancellationsTable` | `cancellations-table.tsx` | `CancellationRow` | Cancellations list |
| `RatingsTable` | `ratings-table.tsx` | `RatingRow` | Ratings/feedback with stars |
| `ReassignmentLogsTable` | `reassignment-logs-table.tsx` | `ReassignmentLog` | Dispatch reassignment logs |
| `CouponsTable` | `coupons-table.tsx` | `CouponRow`, `CouponType`, `CouponStatus` | Promo codes with usage bars |
| `ChauffeurBookingsTable` | `chauffeur-bookings-table.tsx` | `ChauffeurBooking`, `ChauffeurTier`, `ChauffeurStatus` | Hourly chauffeur bookings |
| `PackagesAdminTable` | `packages-admin-table.tsx` | `PackageRow`, `PackageStatus` | Package deliveries table |

### Configuration

| Component | File | Key types | Purpose |
|---|---|---|---|
| `FareConfigCard` | `fare-config-card.tsx` | `FareField` | Editable fare config per service |
| `CancellationPolicyEditor` | `cancellation-policy-editor.tsx` | `CancellationPolicyTier` | Cancellation policy per service |
| `DispatchConfigCard` | `dispatch-config-card.tsx` | `DispatchConfig`, `DispatchWeights` | Auto-dispatch settings + scoring sliders |
| `SurgePricingCard` | `surge-pricing-card.tsx` | `SurgeLevel`, `surgeLevelFor()`, `surgeGradient()` | Surge multiplier + simulator |
| `DriverEarningsConfig` | `driver-earnings-config.tsx` | `DriverEarningTier`, `DriverEarningsConfig` | Per-service driver % config |

### Operations

| Component | File | Key types | Purpose |
|---|---|---|---|
| `SafetyOverview` | `safety-overview.tsx` | `SafetyStats` (inline) | SOS/docs/shares stat tiles + recent alerts |
| `SosAlertCard` | `sos-alert-card.tsx` | `SosAlert`, `SosStatus`, `SosResolution` | SOS alert card (`compact` prop for list rows) |
| `DocumentVerificationRow` | `document-verification-row.tsx` | `DocumentDriver`, `DriverDocument`, `DocumentVerificationStatus` | Driver doc verification row |
| `DriversAvailableMap` | `drivers-available-map.tsx` | `AvailableDriver` | Map of available drivers + dispatch list |
| `TipsReportCard` | `tips-report-card.tsx` | `TipsDataPoint`, `TopTipper` | Admin tips report + chart |
| `WithdrawalRow` | `withdrawal-row.tsx` | `WithdrawalRow`, `WithdrawalStatus` | Payout request row (approve/reject) |
| `FleetVehicleCard` | `fleet-vehicle-card.tsx` | `VehicleRow`, `VehicleTier`, `VehicleStatus` | Fleet vehicle card |
| `AdCard` | `ad-card.tsx` | `AdRow`, `AdStatus` | Advertisement list card |

### Advertisements CRUD

| Component | File | Key types | Purpose |
|---|---|---|---|
| `AdCreateForm` | `ad-create-form.tsx` | `AdFormData` | Create advertisement (5 sections) |
| `AdEditForm` | `ad-edit-form.tsx` | `AdFormData`, `adDetailToFormData()` | Edit advertisement |
| `AdDetailCard` | `ad-detail-card.tsx` | `AdDetail`, `AdImpressionPoint` | Ad detail view + performance chart |
| `AdStatisticsCard` | `ad-statistics-card.tsx` | `AdStatPoint`, `AdPerfRow` | Ad statistics dashboard |

### Edit forms & auth

| Component | File | Key types | Purpose |
|---|---|---|---|
| `UserEditForm` | `user-edit-form.tsx` | `EditableUser`, `UserStatus` | Edit user (profile/verification/status) |
| `DriverEditForm` | `driver-edit-form.tsx` | `EditableDriver`, `DriverTier`, `DocumentStatus` | Edit driver (profile/vehicle/docs/earnings) |
| `AdminSigninScreen` | `admin-signin-screen.tsx` | — | Admin login (desktop, centered) |
| `AdminSignupScreen` | `admin-signup-screen.tsx` | `AdminRole` | Admin invite/signup (desktop) |

---

## 7. Email templates

All in `src/components/eer/emails/`. Re-exported from `index.ts`.

Emails render on **white background** with hardcoded oklch colors (email-client
safe). Wrap each in `<EmailFrame subject="...">` for preview.

| Email | File | Props | Recipient |
|---|---|---|---|
| `BookingConfirmation` | `booking-confirmation.tsx` | `riderName, bookingId, pickup, destination, dateTime, vehicle, driverName, rating, plate, fare` | Rider |
| `BookingCancelled` | `booking-cancelled.tsx` | `riderName, bookingId, reason, refundAmount, refundMethod` | Rider |
| `PaymentReceipt` | `payment-receipt.tsx` | `riderName, receiptId, rideSummary, items, total, paymentMethod, date` | Rider |
| `DriverAssignedNotification` | `driver-assigned-notification.tsx` | `riderName, driverName, rating, vehicle, plate, eta` | Rider |
| `DriverAssignedPassenger` | `driver-assigned-passenger.tsx` | `driverName, riderName, pickup, destination, fare, distance` | Driver |
| `AdminDriverAssignment` | `admin-driver-assignment.tsx` | `rideId, rider, driver, assignmentType, timestamp` | Admin |
| `AdminWithdrawalRequest` | `admin-withdrawal-request.tsx` | `driverName, amount, method, requestedDate` | Admin |
| `WithdrawalApproved` | `withdrawal-approved.tsx` | `driverName, amount, method, processedDate` | Driver |
| `WithdrawalRejected` | `withdrawal-rejected.tsx` | `driverName, amount, reason` | Driver |
| `ResetPasswordEmail` | `reset-password.tsx` | `userName, resetUrl?` | Any user |

**Helper**: `EmailFrame` (`email-frame.tsx`) — props: `subject, sender?, to?, date?, children`.

**To rebrand emails**: edit `emailColors` in `email-primitives.tsx`. See [THEME.md](./THEME.md).

---

## Usage patterns

### A complete mobile screen

```tsx
import { PhoneFrame } from "@/components/eer/phone-frame";
import { HomeScreen } from "@/components/eer/screens/home-screen";

<PhoneFrame label="Home">
  <HomeScreen />
</PhoneFrame>
```

### An admin page

```tsx
import { AdminSidebar } from "@/components/eer/admin/admin-sidebar";
import { AdminTopbar } from "@/components/eer/admin/admin-topbar";
import { StatCard } from "@/components/eer/admin/stat-card";
import { RidesTable } from "@/components/eer/admin/rides-table";

<div className="flex">
  <AdminSidebar active="Dashboard" />
  <div className="flex-1">
    <AdminTopbar title="Dashboard" />
    <div className="space-y-6 p-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total rides" value="1,284" change="+12.4%" trend="up" icon={Car} accent="brand" />
      </div>
      <RidesTable />
    </div>
  </div>
</div>
```

### Using accents

```tsx
import { ServiceCard } from "@/components/eer/service-card";
import { Car, Package, Megaphone, Truck } from "lucide-react";

<ServiceCard icon={Car} title="Reserve" description="Book a ride" accent="cyan" />
<ServiceCard icon={Package} title="Packages" description="Send items" accent="amber" />
<ServiceCard icon={Megaphone} title="Ads" description="Promote" accent="magenta" />
<ServiceCard icon={Truck} title="Tow Truck" description="Roadside help" accent="gold" />
```

### Form with validation

```tsx
import { FormField } from "@/components/eer/forms";
import { Input } from "@/components/ui/input";

<FormField label="Email" error="Enter a valid email" required>
  <Input type="email" defaultValue="not-an-email" />
</FormField>
```

### Detail drawer (click-to-open pattern)

```tsx
const [open, setOpen] = useState(false);
<>
  <Button onClick={() => setOpen(true)}>View details</Button>
  <DetailDrawer open={open} onOpenChange={setOpen} title="Ride EER-2491" description="Logan → Back Bay"
    footer={<><Button variant="outline">Cancel ride</Button><Button>Assign driver</Button></>}>
    {/* ride details */}
  </DetailDrawer>
</>
```

---

## Maps to real eagleeyerides pages

| Real page (EJS) | UI kit component(s) |
|---|---|
| `views/user/index.ejs` | `HomeScreen` |
| `views/user/bookings.ejs` | `RideHistoryScreen` |
| `views/user/mapView.ejs` | `MapViewScreen` |
| `views/user/payPayment.ejs` | `PaymentCheckoutScreen` |
| `views/user/payments.ejs` | `WalletScreen` |
| `views/user/points.ejs` | `PointsScreen` |
| `views/user/referrals.ejs` | `ReferralsScreen` |
| `views/user/settings.ejs` | `SettingsScreen` |
| `views/user/tips-history.ejs` | `TipsHistoryScreen` |
| `views/driver/chauffeur-schedule.ejs` | `DriverChauffeurScheduleScreen` |
| `views/driver/mapView.ejs` | `DriverMapScreen` |
| `views/driver/packages.ejs` | `DriverPackagesScreen` |
| `views/driver/payments.ejs` | `DriverEarningsScreen` |
| `views/driver/tips-report.ejs` | `DriverTipsReportScreen` |
| `views/driver/signin.ejs` / `signup.ejs` | `DriverSigninScreen` / `DriverSignupScreen` |
| `views/admin/index.ejs` | dashboard shell + `StatCard` + `EarningsChart` + `RidesTable` |
| `views/admin/bookings.ejs` | `RidesTable` |
| `views/admin/chauffeur-bookings.ejs` | `ChauffeurBookingsTable` |
| `views/admin/coupons.ejs` | `CouponsTable` |
| `views/admin/dispatch.ejs` | `DispatchConfigCard` |
| `views/admin/documents.ejs` | `DocumentVerificationRow` |
| `views/admin/driver-earnings.ejs` | `DriverEarningsConfig` |
| `views/admin/drivers.ejs` | `DriversTable` |
| `views/admin/driversAvailable.ejs` | `DriversAvailableMap` |
| `views/admin/cancellations.ejs` | `CancellationsTable` |
| `views/admin/cancellation-policy.ejs` | `CancellationPolicyEditor` |
| `views/admin/ratings.ejs` | `RatingsTable` |
| `views/admin/reassignment-logs.ejs` | `ReassignmentLogsTable` |
| `views/admin/safety.ejs` | `SafetyOverview` |
| `views/admin/sos.ejs` | `SosAlertCard` |
| `views/admin/surge.ejs` | `SurgePricingCard` |
| `views/admin/tips-report.ejs` | `TipsReportCard` |
| `views/admin/users.ejs` | `UsersTable` |
| `views/admin/userEdit.ejs` | `UserEditForm` |
| `views/admin/driverEdit.ejs` | `DriverEditForm` |
| `views/admin/withdrawals.ejs` | `WithdrawalRow` |
| `views/admin/payments.ejs` | `PaymentsTable` |
| `views/admin/settings.ejs` | `ConfigField` + `FareConfigCard` |
| `views/admin/signin.ejs` / `signup.ejs` | `AdminSigninScreen` / `AdminSignupScreen` |
| `views/admin/advertisements/{list,create,detail,edit,statistics}.ejs` | `AdCard` / `AdCreateForm` / `AdDetailCard` / `AdEditForm` / `AdStatisticsCard` |
| `views/admin/packages/index.ejs` | `PackagesAdminTable` |
| `views/authentication/sign-in.ejs` / `sign-up.ejs` | `AuthScreen` |
| `views/authentication/forgot-password.ejs` | `ForgotPasswordScreen` |
| `views/authentication/reset-password.ejs` | `ResetPasswordScreen` |
| `views/authentication/profile-lock.ejs` | `ProfileLockScreen` |
| `views/pages/{403,404,500}.ejs` | `ErrorScreen` |
| `views/pages/maintenance.ejs` | `MaintenanceScreen` |
| `views/pages/pricing.ejs` | `PricingScreen` |
| `views/emails/*.ejs` (10) | `src/components/eer/emails/*.tsx` (10) |

**Coverage: 100% of the 67 real eagleeyerides pages are now represented in the UI kit.**
