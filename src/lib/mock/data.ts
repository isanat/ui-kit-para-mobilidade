/**
 * Eagle Eye Rides UI Kit — Mock Data
 * US-based, USD currency. Realistic but fictional data for pattern demos.
 * All monetary values are in USD ($).
 */

export type ServiceType = 'one-way' | 'tow' | 'chauffeur' | 'package' | 'ad'
export type BookingStatus =
  | 'scheduled'
  | 'searching'
  | 'accepted'
  | 'en-route'
  | 'arrived'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
export type PaymentStatus = 'succeeded' | 'pending' | 'failed' | 'refunded'
export type PaymentMethod = 'card' | 'cash' | 'google-pay' | 'apple-pay'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  points: number
  referralCode: string
  memberSince: string
}

export interface Driver {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  rating: number
  totalRides: number
  vehicle: {
    type: 'black-suv' | 'black-sedan' | 'luxury-sedan' | 'suv' | 'sedan'
    model: string
    color: string
    plate: string
  }
  walletBalance: number
  totalEarnings: number
  status: 'online' | 'busy' | 'offline'
}

export interface Address {
  label: string
  line: string
  city: string
  state: string
  zip: string
  lat: number
  lng: number
}

export interface Booking {
  id: string
  displayId: string
  service: ServiceType
  status: BookingStatus
  passenger: Pick<User, 'id' | 'name' | 'phone'>
  driver?: Pick<Driver, 'id' | 'name' | 'phone' | 'vehicle' | 'rating' | 'avatar'>
  pickup: Address
  dropoff: Address
  scheduledAt: string
  fare: number
  tip?: number
  distance: number // miles
  duration: number // minutes
  vehicleClass?: string
  notes?: string
}

export interface Payment {
  id: string
  bookingId: string
  amount: number
  tip?: number
  method: PaymentMethod
  status: PaymentStatus
  createdAt: string
  passenger: Pick<User, 'id' | 'name'>
}

// ── Currency formatting (USD) ──
export function formatUSD(amount: number, opts?: { showCents?: boolean }): string {
  const showCents = opts?.showCents ?? true
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(amount)
}

export function formatDistance(miles: number): string {
  return `${miles.toFixed(1)} mi`
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)} min`
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return formatDateTime(iso)
}

// ── Mock data ──

export const mockPassengers: User[] = [
  {
    id: 'u_001',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    phone: '+1 (415) 555-0142',
    points: 2450,
    referralCode: 'SARAH2450',
    memberSince: '2024-03-15',
  },
  {
    id: 'u_002',
    name: 'James Carter',
    email: 'j.carter@email.com',
    phone: '+1 (212) 555-0188',
    points: 1820,
    referralCode: 'JAMES1820',
    memberSince: '2024-01-22',
  },
  {
    id: 'u_003',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '+1 (305) 555-0177',
    points: 3950,
    referralCode: 'EMILY3950',
    memberSince: '2023-11-08',
  },
]

export const mockDrivers: Driver[] = [
  {
    id: 'd_001',
    name: 'Michael Thompson',
    email: 'm.thompson@eer.com',
    phone: '+1 (646) 555-0123',
    rating: 4.9,
    totalRides: 1284,
    vehicle: {
      type: 'black-suv',
      model: 'Cadillac Escalade',
      color: 'Black',
      plate: 'NYC-4821',
    },
    walletBalance: 1240.5,
    totalEarnings: 38450.75,
    status: 'online',
  },
  {
    id: 'd_002',
    name: 'David Chen',
    email: 'd.chen@eer.com',
    phone: '+1 (917) 555-0167',
    rating: 4.8,
    totalRides: 856,
    vehicle: {
      type: 'black-sedan',
      model: 'Mercedes E-Class',
      color: 'Black',
      plate: 'NYC-7204',
    },
    walletBalance: 890.25,
    totalEarnings: 24180.5,
    status: 'busy',
  },
  {
    id: 'd_003',
    name: 'Robert Williams',
    email: 'r.williams@eer.com',
    phone: '+1 (718) 555-0199',
    rating: 5.0,
    totalRides: 2104,
    vehicle: {
      type: 'luxury-sedan',
      model: 'BMW 7 Series',
      color: 'Black',
      plate: 'NYC-9156',
    },
    walletBalance: 2150.0,
    totalEarnings: 62300.0,
    status: 'online',
  },
]

export const mockAddresses: Address[] = [
  {
    label: 'Home',
    line: '123 W 21st St',
    city: 'New York',
    state: 'NY',
    zip: '10011',
    lat: 40.7426,
    lng: -73.9951,
  },
  {
    label: 'Work',
    line: '456 Park Ave',
    city: 'New York',
    state: 'NY',
    zip: '10022',
    lat: 40.7531,
    lng: -73.9771,
  },
  {
    label: 'JFK Airport',
    line: 'John F. Kennedy Intl Airport',
    city: 'Queens',
    state: 'NY',
    zip: '11430',
    lat: 40.6413,
    lng: -73.7781,
  },
  {
    label: 'The Plaza',
    line: '768 5th Ave',
    city: 'New York',
    state: 'NY',
    zip: '10019',
    lat: 40.7644,
    lng: -73.9744,
  },
  {
    label: 'Madison Square Garden',
    line: '4 Pennsylvania Plaza',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    lat: 40.7505,
    lng: -73.9934,
  },
]

const now = Date.now()
const hoursAgo = (h: number) => new Date(now - h * 3600000).toISOString()
const hoursAhead = (h: number) => new Date(now + h * 3600000).toISOString()

export const mockBookings: Booking[] = [
  {
    id: 'b_001',
    displayId: 'EER-4821',
    service: 'one-way',
    status: 'in-progress',
    passenger: { id: 'u_001', name: 'Sarah Mitchell', phone: '+1 (415) 555-0142' },
    driver: {
      id: 'd_001',
      name: 'Michael Thompson',
      phone: '+1 (646) 555-0123',
      rating: 4.9,
      vehicle: mockDrivers[0].vehicle,
    },
    pickup: mockAddresses[0],
    dropoff: mockAddresses[1],
    scheduledAt: hoursAgo(0.2),
    fare: 32.5,
    tip: 6,
    distance: 2.8,
    duration: 18,
    vehicleClass: 'Black Sedan',
  },
  {
    id: 'b_002',
    displayId: 'EER-4822',
    service: 'chauffeur',
    status: 'scheduled',
    passenger: { id: 'u_001', name: 'Sarah Mitchell', phone: '+1 (415) 555-0142' },
    driver: {
      id: 'd_003',
      name: 'Robert Williams',
      phone: '+1 (718) 555-0199',
      rating: 5.0,
      vehicle: mockDrivers[2].vehicle,
    },
    pickup: mockAddresses[3],
    dropoff: mockAddresses[2],
    scheduledAt: hoursAhead(3),
    fare: 240.0,
    distance: 18.5,
    duration: 65,
    vehicleClass: 'Luxury Sedan',
    notes: 'Flight DL 452 at Terminal 4. Please meet at arrivals.',
  },
  {
    id: 'b_003',
    displayId: 'EER-4820',
    service: 'one-way',
    status: 'completed',
    passenger: { id: 'u_001', name: 'Sarah Mitchell', phone: '+1 (415) 555-0142' },
    driver: {
      id: 'd_002',
      name: 'David Chen',
      phone: '+1 (917) 555-0167',
      rating: 4.8,
      vehicle: mockDrivers[1].vehicle,
    },
    pickup: mockAddresses[1],
    dropoff: mockAddresses[0],
    scheduledAt: hoursAgo(28),
    fare: 28.0,
    tip: 5,
    distance: 2.5,
    duration: 15,
    vehicleClass: 'Black Sedan',
  },
  {
    id: 'b_004',
    displayId: 'EER-4815',
    service: 'package',
    status: 'completed',
    passenger: { id: 'u_001', name: 'Sarah Mitchell', phone: '+1 (415) 555-0142' },
    pickup: mockAddresses[0],
    dropoff: mockAddresses[4],
    scheduledAt: hoursAgo(72),
    fare: 18.5,
    tip: 3,
    distance: 1.2,
    duration: 8,
  },
  {
    id: 'b_005',
    displayId: 'EER-4810',
    service: 'tow',
    status: 'completed',
    passenger: { id: 'u_001', name: 'Sarah Mitchell', phone: '+1 (415) 555-0142' },
    pickup: mockAddresses[4],
    dropoff: mockAddresses[0],
    scheduledAt: hoursAgo(120),
    fare: 85.0,
    distance: 2.8,
    duration: 35,
  },
  {
    id: 'b_006',
    displayId: 'EER-4805',
    service: 'one-way',
    status: 'cancelled',
    passenger: { id: 'u_001', name: 'Sarah Mitchell', phone: '+1 (415) 555-0142' },
    pickup: mockAddresses[2],
    dropoff: mockAddresses[0],
    scheduledAt: hoursAgo(168),
    fare: 0,
    distance: 18.5,
    duration: 0,
  },
]

export const mockPayments: Payment[] = [
  {
    id: 'p_001',
    bookingId: 'EER-4820',
    amount: 28.0,
    tip: 5,
    method: 'card',
    status: 'succeeded',
    createdAt: hoursAgo(28),
    passenger: { id: 'u_001', name: 'Sarah Mitchell' },
  },
  {
    id: 'p_002',
    bookingId: 'EER-4815',
    amount: 18.5,
    tip: 3,
    method: 'google-pay',
    status: 'succeeded',
    createdAt: hoursAgo(72),
    passenger: { id: 'u_001', name: 'Sarah Mitchell' },
  },
  {
    id: 'p_003',
    bookingId: 'EER-4810',
    amount: 85.0,
    method: 'card',
    status: 'succeeded',
    createdAt: hoursAgo(120),
    passenger: { id: 'u_001', name: 'Sarah Mitchell' },
  },
  {
    id: 'p_004',
    bookingId: 'EER-4802',
    amount: 42.0,
    tip: 7,
    method: 'apple-pay',
    status: 'pending',
    createdAt: hoursAgo(1),
    passenger: { id: 'u_001', name: 'Sarah Mitchell' },
  },
]

export const mockPointsHistory = [
  { id: 'pt_1', type: 'credited' as const, amount: 50, reason: 'Ride EER-4820', date: hoursAgo(28) },
  { id: 'pt_2', type: 'credited' as const, amount: 35, reason: 'Ride EER-4815', date: hoursAgo(72) },
  { id: 'pt_3', type: 'credited' as const, amount: 170, reason: 'Ride EER-4810', date: hoursAgo(120) },
  { id: 'pt_4', type: 'redeemed' as const, amount: -200, reason: '$2 discount applied', date: hoursAgo(96) },
  { id: 'pt_5', type: 'credited' as const, amount: 100, reason: 'Referral bonus — James C.', date: hoursAgo(240) },
]

export const mockReferrals = [
  { id: 'r_1', name: 'James Carter', email: 'j.carter@email.com', date: hoursAgo(240), status: 'completed' as const, reward: 10 },
  { id: 'r_2', name: 'Lisa Park', email: 'l.park@email.com', date: hoursAgo(120), status: 'completed' as const, reward: 10 },
  { id: 'r_3', name: 'Mark Davis', email: 'm.davis@email.com', date: hoursAgo(48), status: 'pending' as const, reward: 0 },
]

export const mockTips = [
  { id: 't_1', driver: mockDrivers[1], booking: 'EER-4820', amount: 5, date: hoursAgo(28) },
  { id: 't_2', driver: mockDrivers[2], booking: 'EER-4812', amount: 8, date: hoursAgo(96) },
  { id: 't_3', driver: mockDrivers[0], booking: 'EER-4808', amount: 4, date: hoursAgo(144) },
]

// ── Driver-side mock data ──
export const mockDriverToday = {
  earnings: 187.5,
  rides: 6,
  tipsToday: 32.0,
  completed: 5,
  walletBalance: 1240.5,
}

export const mockDriverRides = [
  {
    id: 'dr_1',
    bookingId: 'EER-4825',
    passenger: { name: 'Olivia Martinez', phone: '+1 (646) 555-0144' },
    vehicleClass: 'Black SUV',
    status: 'accepted' as BookingStatus,
    fare: 45.0,
    tip: 0,
    pickup: mockAddresses[3],
    dropoff: mockAddresses[2],
    date: hoursAgo(0.1),
    distance: 16.2,
    duration: 55,
  },
  {
    id: 'dr_2',
    bookingId: 'EER-4824',
    passenger: { name: 'Daniel Lee', phone: '+1 (917) 555-0162' },
    vehicleClass: 'Black Sedan',
    status: 'completed' as BookingStatus,
    fare: 32.0,
    tip: 6,
    pickup: mockAddresses[1],
    dropoff: mockAddresses[0],
    date: hoursAgo(2),
    distance: 2.8,
    duration: 18,
  },
  {
    id: 'dr_3',
    bookingId: 'EER-4823',
    passenger: { name: 'Sophia Brown', phone: '+1 (212) 555-0191' },
    vehicleClass: 'Black Sedan',
    status: 'completed' as BookingStatus,
    fare: 28.5,
    tip: 5,
    pickup: mockAddresses[4],
    dropoff: mockAddresses[1],
    date: hoursAgo(4),
    distance: 1.5,
    duration: 10,
  },
  {
    id: 'dr_4',
    bookingId: 'EER-4822',
    passenger: { name: 'Sarah Mitchell', phone: '+1 (415) 555-0142' },
    vehicleClass: 'Luxury Sedan',
    status: 'cancelled' as BookingStatus,
    fare: 0,
    tip: 0,
    pickup: mockAddresses[3],
    dropoff: mockAddresses[2],
    date: hoursAgo(6),
    distance: 0,
    duration: 0,
  },
]

export const mockDriverWithdrawals = [
  { id: 'w_1', amount: 500, method: 'Zelle', fee: 12.5, net: 487.5, status: 'completed' as const, date: hoursAgo(240) },
  { id: 'w_2', amount: 300, method: 'Bank Transfer', fee: 7.5, net: 292.5, status: 'pending' as const, date: hoursAgo(24) },
  { id: 'w_3', amount: 750, method: 'Venmo', fee: 18.75, net: 731.25, status: 'completed' as const, date: hoursAgo(480) },
]

// ── Admin-side mock data ──
export const mockAdminStats = {
  bookings: { awaiting: 12, inProgress: 8, completed: 248, cancelled: 14 },
  revenue: { today: 4820.5, week: 31240.75, month: 142800.0 },
  drivers: { total: 86, online: 34, busy: 18, available: 16 },
  users: { total: 4820, active: 3210, newToday: 24 },
  tips: { monthly: 2840.5, ridesWithTips: 186, average: 15.27 },
}

export const mockAdminBookings = mockBookings.map((b) => ({
  id: b.id,
  displayId: b.displayId,
  service: b.service,
  status: b.status,
  fare: b.fare,
  passenger: { name: b.passenger.name, phone: b.passenger.phone },
  driver: b.driver ? { name: b.driver.name, phone: b.driver.phone } : null,
  pickup: b.pickup.line,
  dropoff: b.dropoff.line,
  date: b.scheduledAt,
}))

export const mockAdminAlerts = [
  {
    id: 'sos_1',
    type: 'sos' as const,
    bookingId: 'EER-4825',
    status: 'active' as const,
    message: 'Passenger triggered SOS — feels unsafe with route deviation.',
    user: { name: 'Olivia Martinez', phone: '+1 (646) 555-0144' },
    driver: { name: 'Michael Thompson', phone: '+1 (646) 555-0123' },
    location: '40.7589, -73.9851',
    date: hoursAgo(0.1),
  },
  {
    id: 'sos_2',
    type: 'feel-unsafe' as const,
    bookingId: 'EER-4821',
    status: 'active' as const,
    message: 'Driver reports passenger is intoxicated and aggressive.',
    user: { name: 'Sarah Mitchell', phone: '+1 (415) 555-0142' },
    driver: { name: 'Michael Thompson', phone: '+1 (646) 555-0123' },
    location: '40.7426, -73.9951',
    date: hoursAgo(0.3),
  },
  {
    id: 'sos_3',
    type: 'accident' as const,
    bookingId: 'EER-4818',
    status: 'resolved' as const,
    message: 'Minor fender bender reported. No injuries. Police notified.',
    user: { name: 'Daniel Lee', phone: '+1 (917) 555-0162' },
    driver: { name: 'David Chen', phone: '+1 (917) 555-0167' },
    location: '40.7505, -73.9934',
    date: hoursAgo(5),
  },
]

// ═══════════════════════════════════════════════════════════════
// SERVICE-SPECIFIC MOCK DATA (P4a-P4d specialized flows)
// ═══════════════════════════════════════════════════════════════

// ── One-Way vehicle classes ──
export const oneWayVehicleClasses = [
  { id: 'sedan', name: 'Black Sedan', desc: 'Mercedes E-Class · 4 seats', price: 32, eta: 4, icon: 'sedan' },
  { id: 'suv', name: 'Black SUV', desc: 'Cadillac Escalade · 6 seats', price: 45, eta: 6, icon: 'suv' },
  { id: 'luxury', name: 'Luxury', desc: 'BMW 7 Series · 4 seats', price: 65, eta: 8, icon: 'luxury' },
]

// ── Tow Truck: vehicle breakdown types ──
export const towBreakdownTypes = [
  { id: 'flat-tire', label: 'Flat tire', icon: 'tire' },
  { id: 'dead-battery', label: 'Dead battery', icon: 'battery' },
  { id: 'engine', label: 'Engine trouble', icon: 'engine' },
  { id: 'accident', label: 'Accident / collision', icon: 'accident' },
  { id: 'locked-out', label: 'Locked out', icon: 'key' },
  { id: 'other', label: 'Other issue', icon: 'wrench' },
]

export const towVehicleTypes = [
  { id: 'sedan', label: 'Sedan' },
  { id: 'suv', label: 'SUV' },
  { id: 'truck', label: 'Pickup truck' },
  { id: 'van', label: 'Van' },
  { id: 'motorcycle', label: 'Motorcycle' },
]

export const towTruckOptions = [
  { id: 'flatbed', name: 'Flatbed tow truck', desc: 'Best for luxury / AWD vehicles', price: 85, eta: 22 },
  { id: 'wheel-lift', name: 'Wheel-lift tow truck', desc: 'Standard for most vehicles', price: 65, eta: 18 },
  { id: 'heavy-duty', name: 'Heavy-duty tow truck', desc: 'For trucks, vans, large SUVs', price: 145, eta: 35 },
]

// ── Chauffeur: durations & vehicles ──
export const chauffeurDurations = [
  { hours: 3, label: '3 hours', popular: true },
  { hours: 4, label: '4 hours' },
  { hours: 6, label: '6 hours' },
  { hours: 8, label: '8 hours', popular: true },
  { hours: 10, label: '10 hours' },
  { hours: 12, label: '12 hours' },
]

export const chauffeurVehicles = [
  { id: 'sedan', name: 'Black Sedan', desc: 'Mercedes E-Class · up to 4 passengers', pricePerHour: 80 },
  { id: 'suv', name: 'Black SUV', desc: 'Cadillac Escalade · up to 6 passengers', pricePerHour: 110 },
  { id: 'luxury', name: 'Luxury Sedan', desc: 'BMW 7 Series · up to 4 passengers', pricePerHour: 150 },
  { id: 'sprinter', name: 'Sprinter Van', desc: 'Mercedes Sprinter · up to 12 passengers', pricePerHour: 180 },
]

// ── Package Delivery ──
export const packageSizes = [
  { id: 'small', label: 'Small', desc: 'Up to 5 lbs · envelopes, documents', price: 12 },
  { id: 'medium', label: 'Medium', desc: '5–25 lbs · small boxes', price: 18 },
  { id: 'large', label: 'Large', desc: '25–60 lbs · larger boxes', price: 28 },
  { id: 'xl', label: 'Extra Large', desc: '60+ lbs · requires 2 handlers', price: 45 },
]

export const packageContactTypes = [
  { id: 'person', label: 'Person', desc: 'Hand to a specific person' },
  { id: 'front-desk', label: 'Front desk', desc: 'Leave with reception / front desk' },
  { id: 'door', label: 'Door drop-off', desc: 'Leave at the door' },
]
