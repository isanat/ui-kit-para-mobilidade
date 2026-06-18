"use client";

import {
  Bell,
  CalendarDays,
  Car,
  Crown,
  CreditCard,
  Banknote,
  Wallet,
  MapPin,
  Megaphone,
  Package,
  Search,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/components/eer/logo";
import { ThemeToggle } from "@/components/eer/theme-toggle";
import { StatusBadge } from "@/components/eer/status-badge";
import { SectionLabel } from "@/components/eer/section-label";
import { EmptyState } from "@/components/eer/empty-state";
import { PhoneFrame } from "@/components/eer/phone-frame";
import { ServiceCard } from "@/components/eer/service-card";
import { RideOption } from "@/components/eer/ride-option";
import { DriverCard } from "@/components/eer/driver-card";
import { WhereToBar } from "@/components/eer/where-to-bar";
import { BottomNav } from "@/components/eer/bottom-nav";

import { HomeScreen } from "@/components/eer/screens/home-screen";
import { ReserveScreen } from "@/components/eer/screens/reserve-screen";
import { TrackingScreen } from "@/components/eer/screens/tracking-screen";
import { ChauffeurScreen } from "@/components/eer/screens/chauffeur-screen";
import { PackageScreen } from "@/components/eer/screens/package-screen";
import { AuthScreen } from "@/components/eer/screens/auth-screen";
import { ProfileScreen } from "@/components/eer/screens/profile-screen";
import { WalletScreen } from "@/components/eer/screens/wallet-screen";
import { RideHistoryScreen } from "@/components/eer/screens/ride-history-screen";
import { DirectionsScreen } from "@/components/eer/screens/directions-screen";
import { PointsScreen } from "@/components/eer/screens/points-screen";
import { ReferralsScreen } from "@/components/eer/screens/referrals-screen";
import { TipsHistoryScreen } from "@/components/eer/screens/tips-history-screen";
import { MapViewScreen } from "@/components/eer/screens/map-view-screen";

import { DriverHomeScreen } from "@/components/eer/screens/driver/driver-home-screen";
import { DriverChauffeurScheduleScreen } from "@/components/eer/screens/driver/driver-chauffeur-schedule-screen";
import { DriverPackagesScreen } from "@/components/eer/screens/driver/driver-packages-screen";
import { DriverMapScreen } from "@/components/eer/screens/driver/driver-map-screen";
import { DriverEarningsScreen } from "@/components/eer/screens/driver/driver-earnings-screen";

import {
  AddressInput,
  DateTimePicker,
  VehicleSelector,
  PaymentMethodSelector,
  FareSummary,
  BookingSummaryCard,
  TripProgress,
  PromoCodeInput,
  RatingStars,
  FilterChips,
  type VehicleOption,
  type PaymentMethod,
  type FareSummaryItem,
} from "@/components/eer/forms";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { AdminSidebar } from "@/components/eer/admin/admin-sidebar";
import { AdminTopbar } from "@/components/eer/admin/admin-topbar";
import { StatCard } from "@/components/eer/admin/stat-card";
import { EarningsChart } from "@/components/eer/admin/earnings-chart";
import { RidesTable, type RideRow } from "@/components/eer/admin/rides-table";
import {
  DriversTable,
  type DriverRow,
} from "@/components/eer/admin/drivers-table";
import {
  FareConfigCard,
  type FareField,
} from "@/components/eer/admin/fare-config-card";
import { ConfigField } from "@/components/eer/admin/config-field";
import {
  WithdrawalRow,
  type WithdrawalRow as WithdrawalRowData,
} from "@/components/eer/admin/withdrawal-row";
import { AdCard, type AdRow } from "@/components/eer/admin/ad-card";
import {
  FleetVehicleCard,
  type VehicleRow,
} from "@/components/eer/admin/fleet-vehicle-card";
import { PageHeader } from "@/components/eer/admin/page-header";
import { DispatchConfigCard } from "@/components/eer/admin/dispatch-config-card";
import { SurgePricingCard } from "@/components/eer/admin/surge-pricing-card";
import {
  CouponsTable,
  type CouponRow,
} from "@/components/eer/admin/coupons-table";
import { SosAlertCard, type SosAlert } from "@/components/eer/admin/sos-alert-card";
import { SafetyOverview } from "@/components/eer/admin/safety-overview";
import {
  DocumentVerificationRow,
  type DocumentDriver,
} from "@/components/eer/admin/document-verification-row";
import {
  ChauffeurBookingsTable,
  type ChauffeurBooking,
} from "@/components/eer/admin/chauffeur-bookings-table";
import { DriverEarningsConfig } from "@/components/eer/admin/driver-earnings-config";

/* ------------------------------------------------------------------ */
/* Design token data                                                   */
/* ------------------------------------------------------------------ */

const colorTokens: { name: string; cls: string; label: string }[] = [
  { name: "Primary", cls: "bg-primary", label: "Royal Blue" },
  { name: "Cyan", cls: "bg-cyan", label: "Reserve" },
  { name: "Amber", cls: "bg-amber", label: "Packages" },
  { name: "Magenta", cls: "bg-magenta", label: "Ads" },
  { name: "Gold", cls: "bg-gold", label: "Tow Truck" },
  { name: "Success", cls: "bg-success", label: "Status" },
];

const neutralTokens = [
  { name: "Background", cls: "bg-background" },
  { name: "Card", cls: "bg-card" },
  { name: "Muted", cls: "bg-muted" },
  { name: "Border", cls: "bg-border" },
  { name: "Foreground", cls: "bg-foreground" },
];

const icons: LucideIcon[] = [
  Search,
  Bell,
  Car,
  Package,
  Megaphone,
  Truck,
  Crown,
  MapPin,
  CalendarDays,
  Users,
];

const sections = [
  { id: "tokens", label: "Tokens" },
  { id: "foundations", label: "Foundations" },
  { id: "mobile-components", label: "Mobile" },
  { id: "forms", label: "Forms" },
  { id: "screens", label: "User screens" },
  { id: "driver-screens", label: "Driver" },
  { id: "admin", label: "Admin" },
];

/* ------------------------------------------------------------------ */
/* Sample data                                                         */
/* ------------------------------------------------------------------ */

const vehicleOptions: VehicleOption[] = [
  {
    id: "comfort",
    name: "Comfort",
    description: "4 seats · 3 bags",
    eta: "3 min away",
    price: "$12.40",
    icon: Car,
    accent: "cyan",
  },
  {
    id: "black",
    name: "Black",
    description: "4 seats · 2 bags",
    eta: "5 min away",
    price: "$19.80",
    icon: Crown,
    accent: "brand",
  },
  {
    id: "black-suv",
    name: "Black SUV",
    description: "6 seats · 4 bags",
    eta: "7 min away",
    price: "$24.00",
    icon: Truck,
    accent: "gold",
  },
];

const paymentMethods: PaymentMethod[] = [
  { id: "card", label: "Visa", sublabel: "•••• 4242", icon: CreditCard },
  { id: "cash", label: "Cash", sublabel: "Pay driver directly", icon: Banknote },
  {
    id: "wallet",
    label: "Eagle Wallet",
    sublabel: "Balance $128.40",
    icon: Wallet,
  },
];

const fareItems: FareSummaryItem[] = [
  { label: "Base fare", amount: "$30.00" },
  { label: "Time", amount: "$5.34" },
  { label: "Distance", amount: "$13.14" },
  { label: "Surcharge", amount: "$1.20" },
];

const fareFields: FareField[] = [
  { key: "base", label: "Base fare", value: "30", prefix: "$" },
  { key: "time", label: "Per minute", value: "0.89", prefix: "$" },
  { key: "distance", label: "Per mile", value: "2.19", prefix: "$" },
  { key: "min", label: "Minimum fare", value: "10", prefix: "$" },
  { key: "surcharge", label: "Surcharge", value: "1.2", prefix: "$" },
  { key: "earning", label: "Driver earning", value: "80", prefix: "%" },
];

const sampleRides: RideRow[] = [
  {
    id: "EER-2491",
    rider: "Olivia Bennett",
    driver: "Marcus Reed",
    pickup: "Logan Airport",
    destination: "Back Bay",
    date: "Today · 4:32 PM",
    fare: "$28.40",
    status: "Completed",
  },
  {
    id: "EER-2490",
    rider: "Daniel Cho",
    driver: "Sofia Alvarez",
    pickup: "Kendall Sq",
    destination: "Fenway Park",
    date: "Today · 3:58 PM",
    fare: "$15.20",
    status: "In progress",
  },
  {
    id: "EER-2489",
    rider: "Priya Shah",
    driver: "James Okafor",
    pickup: "Seaport Blvd",
    destination: "North End",
    date: "Today · 2:10 PM",
    fare: "$19.80",
    status: "Scheduled",
  },
  {
    id: "EER-2488",
    rider: "Liam Walsh",
    driver: "—",
    pickup: "South Station",
    destination: "Cambridge",
    date: "Today · 1:24 PM",
    fare: "$0.00",
    status: "Cancelled",
  },
];

const sampleDrivers: DriverRow[] = [
  {
    id: "DRV-01",
    name: "Marcus Reed",
    initials: "MR",
    rating: 4.9,
    vehicle: "Tesla Model 3",
    plate: "EAG-4821",
    online: true,
    totalRides: 1284,
    earnings: "$3,940",
  },
  {
    id: "DRV-02",
    name: "Sofia Alvarez",
    initials: "SA",
    rating: 4.8,
    vehicle: "Mercedes E-Class",
    plate: "EAG-1190",
    online: true,
    totalRides: 982,
    earnings: "$3,210",
  },
  {
    id: "DRV-03",
    name: "James Okafor",
    initials: "JO",
    rating: 4.7,
    vehicle: "BMW 5 Series",
    plate: "EAG-7732",
    online: false,
    totalRides: 741,
    earnings: "$2,480",
  },
];

const sampleWithdrawals: WithdrawalRowData[] = [
  {
    id: "WD-101",
    driverName: "Marcus Reed",
    initials: "MR",
    amount: "$820.00",
    method: "Bank",
    requestedDate: "Today · 4:02 PM",
    status: "Pending",
  },
  {
    id: "WD-100",
    driverName: "Sofia Alvarez",
    initials: "SA",
    amount: "$540.00",
    method: "PayPal",
    requestedDate: "Today · 1:15 PM",
    status: "Approved",
  },
];

const sampleAds: AdRow[] = [
  {
    id: "AD-01",
    title: "Summer Getaway Promo",
    advertiser: "Boston Harbor Hotel",
    placement: "Home banner",
    status: "Active",
    impressions: 18420,
    clicks: 612,
    active: true,
    gradient: "from-cyan to-[oklch(0.4_0.18_210)]",
  },
  {
    id: "AD-02",
    title: "Black Friday Rides",
    advertiser: "Eagle Eye Rides",
    placement: "Ride list",
    status: "Scheduled",
    impressions: 0,
    clicks: 0,
    active: false,
    gradient: "from-magenta to-[oklch(0.4_0.2_330)]",
  },
];

const sampleVehicles: VehicleRow[] = [
  {
    id: "VHC-01",
    make: "Tesla",
    model: "Model 3",
    plate: "EAG-4821",
    tier: "Black",
    status: "In ride",
    driver: "Marcus Reed",
    seats: 4,
    bags: 2,
  },
  {
    id: "VHC-02",
    make: "Cadillac",
    model: "Escalade",
    plate: "EAG-3091",
    tier: "Chauffeur",
    status: "Available",
    driver: "Sofia Alvarez",
    seats: 6,
    bags: 4,
  },
  {
    id: "VHC-03",
    make: "Ford",
    model: "Transit",
    plate: "EAG-2204",
    tier: "Package",
    status: "Maintenance",
    seats: 2,
    bags: 0,
  },
];

const sampleCoupons: CouponRow[] = [
  {
    id: "CP-1",
    code: "RIDE20",
    type: "percentage",
    value: "20%",
    used: 142,
    limit: 500,
    status: "Active",
    isActive: true,
  },
  {
    id: "CP-2",
    code: "EAGLE50",
    type: "fixed",
    value: "$10",
    used: 410,
    limit: 500,
    status: "Active",
    isActive: true,
  },
  {
    id: "CP-3",
    code: "SPRING15",
    type: "percentage",
    value: "15%",
    used: 320,
    limit: 320,
    status: "Used Up",
    isActive: false,
  },
  {
    id: "CP-4",
    code: "LOGAN10",
    type: "fixed",
    value: "$5",
    used: 88,
    limit: 200,
    status: "Expired",
    isActive: false,
  },
];

const sampleSosAlerts: SosAlert[] = [
  {
    id: "SOS-1042",
    rider: "Olivia Bennett",
    driver: "Marcus Reed",
    rideId: "EER-2491",
    triggeredAt: "2 min ago",
    location: "Back Bay, Dartmouth St",
    status: "active",
  },
  {
    id: "SOS-1041",
    rider: "Daniel Cho",
    driver: "Sofia Alvarez",
    rideId: "EER-2487",
    triggeredAt: "18 min ago",
    location: "Seaport Blvd",
    status: "resolved",
  },
];

const sampleDocumentDrivers: DocumentDriver[] = [
  {
    id: "DRV-04",
    name: "Liam Chen",
    initials: "LC",
    documentVerificationStatus: "pending",
    fileCount: 3,
    documents: [
      { type: "License", status: "valid" },
      { type: "Insurance", status: "valid" },
      { type: "Registration", status: "missing" },
    ],
  },
  {
    id: "DRV-05",
    name: "Aisha Khan",
    initials: "AK",
    documentVerificationStatus: "verified",
    fileCount: 4,
    documents: [
      { type: "License", status: "valid" },
      { type: "Insurance", status: "valid" },
      { type: "Registration", status: "valid" },
      { type: "Background check", status: "valid" },
    ],
  },
  {
    id: "DRV-06",
    name: "Noah Patel",
    initials: "NP",
    documentVerificationStatus: "rejected",
    fileCount: 2,
    documents: [
      { type: "License", status: "expired" },
      { type: "Insurance", status: "valid" },
    ],
  },
];

const sampleChauffeurBookings: ChauffeurBooking[] = [
  {
    id: "CHF-201",
    customer: "Olivia Bennett",
    chauffeur: "Marcus Reed",
    tier: "Luxury",
    date: "Today",
    time: "6:00 PM",
    durationHours: 4,
    totalFare: "$320.00",
    status: "Scheduled",
  },
  {
    id: "CHF-200",
    customer: "Daniel Cho",
    chauffeur: null,
    tier: "Business",
    date: "Today",
    time: "8:30 PM",
    durationHours: 2,
    totalFare: "$140.00",
    status: "Scheduled",
  },
  {
    id: "CHF-199",
    customer: "Priya Shah",
    chauffeur: "Sofia Alvarez",
    tier: "First",
    date: "Today",
    time: "2:10 PM",
    durationHours: 6,
    totalFare: "$510.00",
    status: "In Progress",
  },
  {
    id: "CHF-198",
    customer: "Liam Walsh",
    chauffeur: "James Okafor",
    tier: "Luxury",
    date: "Yesterday",
    time: "9:00 PM",
    durationHours: 3,
    totalFare: "$270.00",
    status: "Completed",
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Block({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Logo subtitle="UI Kit" />
          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <StatusBadge tone="brand" dot>
                v1.0 Design System
              </StatusBadge>
            </span>
            <a
              href="https://github.com/isanat/eagleeyerides"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:inline"
            >
              eagleeyerides
            </a>
            <ThemeToggle />
          </div>
        </div>
        {/* Section nav */}
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-20 px-5 py-12">
        {/* Hero */}
        <div className="max-w-2xl space-y-4">
          <StatusBadge tone="cyan">Urban Mobility Platform</StatusBadge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            Eagle Eye Rides Design System
          </h1>
          <p className="text-lg text-pretty text-muted-foreground">
            A complete UI kit for the Eagle Eye Rides platform — tokens,
            mobile components, booking forms, ready-to-use app screens and a
            full admin dashboard. Built on the mobility design language from
            the original UI kit, expanded for the whole system.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button className="h-10 px-4" asChild>
              <a href="#screens">Explore screens</a>
            </Button>
            <Button variant="outline" className="h-10 px-4" asChild>
              <a href="#admin">View admin</a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            <StatusBadge tone="muted">13 base components</StatusBadge>
            <StatusBadge tone="muted">10 form components</StatusBadge>
            <StatusBadge tone="muted">14 user screens</StatusBadge>
            <StatusBadge tone="muted">5 driver screens</StatusBadge>
            <StatusBadge tone="muted">20 admin components</StatusBadge>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TOKENS                                                       */}
        {/* ============================================================ */}
        <Block
          id="tokens"
          title="Design tokens"
          description="A royal-blue primary paired with service-specific accents over deep navy neutrals. OKLCH-based, fully theme-aware (light + dark)."
        >
          <Panel>
            <SectionLabel className="mb-3">Brand accents</SectionLabel>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {colorTokens.map((c) => (
                <div
                  key={c.name}
                  className="overflow-hidden rounded-2xl border border-border bg-background"
                >
                  <div className={`h-20 ${c.cls}`} />
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground">
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <SectionLabel className="mb-3 mt-6">Neutrals</SectionLabel>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {neutralTokens.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                >
                  <span
                    className={`size-8 rounded-lg border border-border ${c.cls}`}
                  />
                  <span className="text-sm text-foreground">{c.name}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionLabel className="mb-4">Typography</SectionLabel>
            <div className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                <p className="text-4xl font-semibold tracking-tight text-foreground">
                  Where to?
                </p>
                <span className="text-xs text-muted-foreground">
                  Display · 36px · Semibold
                </span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                <p className="text-xl font-semibold text-foreground">
                  Book a ride in seconds
                </p>
                <span className="text-xs text-muted-foreground">
                  Heading · 20px · Semibold
                </span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                <p className="text-base text-foreground">
                  Your driver is on the way and will arrive shortly.
                </p>
                <span className="text-xs text-muted-foreground">
                  Body · 16px · Regular
                </span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Services
                </p>
                <span className="text-xs text-muted-foreground">
                  Label · 12px · Uppercase
                </span>
              </div>
            </div>
          </Panel>

          <Panel>
            <SectionLabel className="mb-4">Icons</SectionLabel>
            <div className="flex flex-wrap gap-3">
              {icons.map((Icon, i) => (
                <div
                  key={i}
                  className="flex size-14 items-center justify-center rounded-xl border border-border bg-background text-foreground"
                >
                  <Icon className="size-5" aria-hidden />
                </div>
              ))}
            </div>
          </Panel>
        </Block>

        {/* ============================================================ */}
        {/* FOUNDATIONS                                                  */}
        {/* ============================================================ */}
        <Block
          id="foundations"
          title="Foundations"
          description="Buttons, badges and the building blocks shared across the whole system."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel>
              <SectionLabel className="mb-4">Buttons</SectionLabel>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Confirm ride</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Cancel</Button>
                <Button variant="link">Learn more</Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="icon">
                  <Search />
                </Button>
              </div>
            </Panel>

            <Panel>
              <SectionLabel className="mb-4">Status badges</SectionLabel>
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone="brand" dot>
                  On the way
                </StatusBadge>
                <StatusBadge tone="success">Completed</StatusBadge>
                <StatusBadge tone="amber">Pending</StatusBadge>
                <StatusBadge tone="cyan">Scheduled</StatusBadge>
                <StatusBadge tone="magenta">Promo</StatusBadge>
                <StatusBadge tone="gold">Premium</StatusBadge>
                <StatusBadge tone="muted">Draft</StatusBadge>
              </div>
            </Panel>

            <Panel>
              <SectionLabel className="mb-4">Where to bar</SectionLabel>
              <div className="rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.4_0.18_268)] p-4">
                <WhereToBar />
              </div>
            </Panel>

            <Panel>
              <SectionLabel className="mb-4">Empty state</SectionLabel>
              <EmptyState
                icon={Megaphone}
                title="No promotions right now"
                description="Check back soon for ride discounts and offers."
              />
            </Panel>
          </div>
        </Block>

        {/* ============================================================ */}
        {/* MOBILE COMPONENTS                                            */}
        {/* ============================================================ */}
        <Block
          id="mobile-components"
          title="Mobile components"
          description="Composable building blocks for the rider-facing app."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel>
              <SectionLabel className="mb-3">Service cards</SectionLabel>
              <div className="grid grid-cols-2 gap-3">
                <ServiceCard
                  icon={Car}
                  title="Reserve"
                  description="Book a ride"
                  accent="cyan"
                />
                <ServiceCard
                  icon={Package}
                  title="Packages"
                  description="Send items"
                  accent="amber"
                />
                <ServiceCard
                  icon={Megaphone}
                  title="Ads"
                  description="Promote"
                  accent="magenta"
                />
                <ServiceCard
                  icon={Truck}
                  title="Tow Truck"
                  description="Roadside help"
                  accent="gold"
                />
              </div>
            </Panel>

            <Panel>
              <SectionLabel className="mb-3">Ride options</SectionLabel>
              <div className="space-y-2">
                <RideOption
                  icon={Car}
                  name="Eagle X"
                  eta="3 min away"
                  price="$12.40"
                  selected
                />
                <RideOption
                  icon={Crown}
                  name="Eagle Premium"
                  eta="5 min away"
                  price="$19.80"
                />
                <RideOption
                  icon={Truck}
                  name="Eagle XL"
                  eta="7 min away"
                  price="$24.00"
                />
              </div>
            </Panel>

            <Panel>
              <SectionLabel className="mb-3">Driver card</SectionLabel>
              <DriverCard
                name="Marcus Reed"
                rating={4.9}
                car="Tesla Model 3"
                plate="EAG-4821"
                initials="MR"
              />
            </Panel>

            <Panel>
              <SectionLabel className="mb-3">Bottom navigation</SectionLabel>
              <div className="overflow-hidden rounded-2xl border border-border">
                <BottomNav />
              </div>
            </Panel>
          </div>
        </Block>

        {/* ============================================================ */}
        {/* FORMS                                                        */}
        {/* ============================================================ */}
        <Block
          id="forms"
          title="Booking forms"
          description="Reusable inputs and summaries that power the reservation, chauffeur and package flows."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel className="space-y-4">
              <SectionLabel>Address inputs</SectionLabel>
              <div className="space-y-2">
                <AddressInput
                  variant="pickup"
                  label="Pickup"
                  value="Current location"
                />
                <AddressInput
                  variant="destination"
                  label="Destination"
                  placeholder="Where to?"
                />
              </div>
              <SectionLabel className="pt-2">Date & time</SectionLabel>
              <DateTimePicker />
            </Panel>

            <Panel className="space-y-4">
              <SectionLabel>Vehicle selector</SectionLabel>
              <VehicleSelector options={vehicleOptions} value="comfort" />
            </Panel>

            <Panel className="space-y-4">
              <SectionLabel>Payment method</SectionLabel>
              <PaymentMethodSelector methods={paymentMethods} value="card" />
            </Panel>

            <Panel className="space-y-4">
              <SectionLabel>Fare summary</SectionLabel>
              <FareSummary items={fareItems} total="$49.68" discount="$3.00" />
            </Panel>

            <Panel className="space-y-4">
              <SectionLabel>Booking summary</SectionLabel>
              <BookingSummaryCard
                pickup="Logan Airport, Terminal C"
                destination="Back Bay, 200 Dartmouth St"
                serviceName="Black"
                serviceAccent="brand"
                dateTime="Today · 4:30 PM"
                passengers={2}
              />
            </Panel>

            <Panel className="space-y-4">
              <SectionLabel>Trip progress</SectionLabel>
              <TripProgress
                steps={["Route", "Vehicle", "Payment", "Confirm"]}
                current={1}
              />
              <SectionLabel className="pt-2">Promo code</SectionLabel>
              <PromoCodeInput
                applied={{ code: "EAGLE20", discount: "$3.00" }}
              />
              <SectionLabel className="pt-2">Rating</SectionLabel>
              <RatingStars value={4} />
              <SectionLabel className="pt-2">Filter chips</SectionLabel>
              <FilterChips
                options={["All", "Completed", "Cancelled"]}
                value="All"
              />
            </Panel>
          </div>
        </Block>

        {/* ============================================================ */}
        {/* MOBILE SCREENS                                               */}
        {/* ============================================================ */}
        <Block
          id="screens"
          title="User app screens"
          description="The components assembled into the real Eagle Eye Rides rider app — the full user journey, including loyalty, referrals and live map."
        >
          <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
            <PhoneFrame label="Home">
              <HomeScreen />
            </PhoneFrame>
            <PhoneFrame label="Book a ride">
              <ReserveScreen />
            </PhoneFrame>
            <PhoneFrame label="Live tracking">
              <TrackingScreen />
            </PhoneFrame>
            <PhoneFrame label="Live map">
              <MapViewScreen />
            </PhoneFrame>
            <PhoneFrame label="Chauffeur service">
              <ChauffeurScreen />
            </PhoneFrame>
            <PhoneFrame label="Send a package">
              <PackageScreen />
            </PhoneFrame>
            <PhoneFrame label="Directions">
              <DirectionsScreen />
            </PhoneFrame>
            <PhoneFrame label="Sign in / Sign up">
              <AuthScreen />
            </PhoneFrame>
            <PhoneFrame label="Profile">
              <ProfileScreen />
            </PhoneFrame>
            <PhoneFrame label="Wallet">
              <WalletScreen />
            </PhoneFrame>
            <PhoneFrame label="Ride history">
              <RideHistoryScreen />
            </PhoneFrame>
            <PhoneFrame label="Loyalty points">
              <PointsScreen />
            </PhoneFrame>
            <PhoneFrame label="Refer & earn">
              <ReferralsScreen />
            </PhoneFrame>
            <PhoneFrame label="Tips history">
              <TipsHistoryScreen />
            </PhoneFrame>
          </div>
        </Block>

        {/* ============================================================ */}
        {/* DRIVER SCREENS                                               */}
        {/* ============================================================ */}
        <Block
          id="driver-screens"
          title="Driver app screens"
          description="The separate driver-facing app: go online, accept chauffeur & package jobs, navigate, and track earnings."
        >
          <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
            <PhoneFrame label="Driver home">
              <DriverHomeScreen />
            </PhoneFrame>
            <PhoneFrame label="Chauffeur schedule">
              <DriverChauffeurScheduleScreen />
            </PhoneFrame>
            <PhoneFrame label="Package queue">
              <DriverPackagesScreen />
            </PhoneFrame>
            <PhoneFrame label="Driver navigation">
              <DriverMapScreen />
            </PhoneFrame>
            <PhoneFrame label="Driver earnings">
              <DriverEarningsScreen />
            </PhoneFrame>
          </div>
        </Block>

        {/* ============================================================ */}
        {/* ADMIN                                                        */}
        {/* ============================================================ */}
        <Block
          id="admin"
          title="Admin dashboard"
          description="The operations console for managing rides, drivers, fleet, fares, earnings, ads and withdrawals."
        >
          {/* Dashboard shell */}
          <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <div className="flex">
              {/* Sidebar (desktop) */}
              <aside className="hidden w-64 shrink-0 lg:block">
                <AdminSidebar active="Dashboard" />
              </aside>

              {/* Main */}
              <div className="min-w-0 flex-1">
                <AdminTopbar
                  title="Dashboard"
                  breadcrumb={["Admin", "Overview"]}
                  themeToggle={<ThemeToggle />}
                  user={{ name: "Alex Morgan", role: "Operator", initials: "AM" }}
                />

                <div className="space-y-6 p-5 lg:p-6">
                  <PageHeader
                    title="Overview"
                    description="Real-time operations across Boston & New England."
                    actions={
                      <Button>
                        <CalendarDays className="size-4" aria-hidden />
                        Last 7 days
                      </Button>
                    }
                  />

                  {/* Stat cards */}
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                      label="Total rides"
                      value="1,284"
                      change="+12.4%"
                      trend="up"
                      icon={Car}
                      accent="brand"
                    />
                    <StatCard
                      label="Gross earnings"
                      value="$38,420"
                      change="+8.1%"
                      trend="up"
                      icon={Wallet}
                      accent="success"
                    />
                    <StatCard
                      label="Active drivers"
                      value="47"
                      change="+3"
                      trend="up"
                      icon={Users}
                      accent="cyan"
                    />
                    <StatCard
                      label="Cancellations"
                      value="2.1%"
                      change="-0.4%"
                      trend="down"
                      icon={Megaphone}
                      accent="amber"
                    />
                  </div>

                  {/* Chart + config */}
                  <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="p-5 lg:col-span-2">
                      <EarningsChart />
                    </Card>
                    <FareConfigCard
                      serviceName="Comfort"
                      accent="cyan"
                      fields={fareFields}
                    />
                  </div>

                  {/* Tables */}
                  <div className="grid gap-6 xl:grid-cols-2">
                    <RidesTable rides={sampleRides} />
                    <DriversTable drivers={sampleDrivers} />
                  </div>

                  {/* Fleet + Ads */}
                  <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-3 lg:col-span-1">
                      <SectionLabel>Fleet</SectionLabel>
                      <div className="space-y-3">
                        {sampleVehicles.map((v) => (
                          <FleetVehicleCard key={v.id} vehicle={v} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3 lg:col-span-2">
                      <SectionLabel>Advertisements</SectionLabel>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {sampleAds.map((a) => (
                          <AdCard key={a.id} ad={a} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Withdrawals */}
                  <div className="space-y-3">
                    <SectionLabel>Withdrawal requests</SectionLabel>
                    <div className="space-y-2">
                      {sampleWithdrawals.map((w) => (
                        <WithdrawalRow key={w.id} withdrawal={w} />
                      ))}
                    </div>
                  </div>

                  {/* Operations: dispatch + surge */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <DispatchConfigCard />
                    <SurgePricingCard />
                  </div>

                  {/* Coupons + chauffeur bookings */}
                  <div className="grid gap-6 xl:grid-cols-2">
                    <CouponsTable coupons={sampleCoupons} />
                    <ChauffeurBookingsTable bookings={sampleChauffeurBookings} />
                  </div>

                  {/* Safety overview + SOS alerts */}
                  <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                      <SafetyOverview recentAlerts={sampleSosAlerts} />
                    </div>
                    <div className="space-y-3 lg:col-span-2">
                      <SectionLabel>SOS alerts</SectionLabel>
                      <div className="space-y-3">
                        {sampleSosAlerts.map((a) => (
                          <SosAlertCard key={a.id} alert={a} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Document verification */}
                  <div className="space-y-3">
                    <SectionLabel>Driver document verification</SectionLabel>
                    <div className="space-y-2">
                      {sampleDocumentDrivers.map((d) => (
                        <DocumentVerificationRow key={d.id} driver={d} />
                      ))}
                    </div>
                  </div>

                  {/* Driver earnings config */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <DriverEarningsConfig />
                  </div>

                  {/* Config sample */}
                  <div className="space-y-3">
                    <SectionLabel>Settings sample</SectionLabel>
                    <Card className="divide-y divide-border p-0">
                      <div className="p-5">
                        <ConfigField
                          label="Advance booking window"
                          description="Minimum hours before a chauffeur reservation can be made."
                          htmlFor="adv-book"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              id="adv-book"
                              defaultValue="5"
                              className="h-9 w-20 rounded-lg border border-input bg-background px-3 text-sm"
                            />
                            <span className="text-sm text-muted-foreground">
                              hours
                            </span>
                          </div>
                        </ConfigField>
                      </div>
                      <div className="p-5">
                        <ConfigField
                          label="Allow cash payments"
                          description="Let riders pay drivers in cash for one-way rides."
                        >
                          <span className="inline-flex h-6 items-center rounded-full bg-success/20 px-2 text-xs font-medium text-success">
                            Enabled
                          </span>
                        </ConfigField>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Block>
      </main>

      <footer className="mt-auto border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 sm:flex-row">
          <Logo size={32} />
          <p className="text-sm text-muted-foreground">
            Eagle Eye Rides UI Kit — built for the full mobility platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
