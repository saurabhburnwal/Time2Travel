# Time2Travel - Complete Project Documentation

## Overview

**Time2Travel** is an intelligent travel planning application designed to help users create optimized travel itineraries within their budget constraints. The application focuses on South Indian destinations, providing users with smart route optimization, cost breakdowns, and personalized travel experiences. Users can choose from hotels, hostels, or stay with verified local hosts, making travel more affordable and socially connected.

The platform serves three types of users: travelers (who plan trips), hosts (who provide local accommodations), and administrators (who manage the system). With over 130+ destinations across 7 South Indian states, the application combines modern technology with practical travel planning features.

---

## User Interface Architecture

### Total Pages: 14 Interactive Pages

The Time2Travel application consists of **14 distinct pages**, each serving a specific purpose in the travel planning journey. The interface is built on a modern, responsive design using React 18 with Tailwind CSS styling, framer-motion animations, and Lucide icons for visual consistency.

All pages include:
- **Smooth animations** for enhanced user experience
- **Gradient styling** with brand colors (primary: brand-500 to ocean-500)
- **Glass-morphism cards** for modern aesthetic
- **Mobile-responsive design** for all screen sizes
- **Navigation bar** with contextual information (except on auth pages)
- **Footer** with additional information (except on auth pages)

---

## Page Flow & Architecture

### User Journey Map

```
Landing (Public) → How It Works (Public) → Auth (Login/Register)
                                              ↓
                                         Trip Planner (Destination Selection)
                                              ↓
                                         Trip Planner (Details)
                                              ↓
                                         Stay Selection
                                              ↓
                                         Roadmap Options
                                              ↓
                                         Itinerary
                                              ↓
                                    (Choice: Map or Expense)
                                         Itinerary / Map View / Expense Breakdown
                                              ↓
                                         Final Review
                                              ↓
                                    Admin Panel (Admin-only)
                                    Profile (All logged-in users)
                                    Host Registration (Optional)
```

---

## Detailed Page Documentation

### 1. **Landing Page** (`/`)

**Purpose:** The home page that welcomes users and introduces the application.

**UI Components:**
- **Animated hero section** with autoplay video background
- **Rotating travel quotes** that change every 5 seconds
- **Feature cards** highlighting key benefits (budget planning, destination selection, etc.)
- **Customer testimonials** with star ratings
- **Review carousel** showing user feedback
- **Stats section** displaying 130+ destinations, 500+ hotels, 100% free access
- **Call-to-action buttons** (Plan My Trip, Learn More)

**Key Features:**
- Auto-rotating hero images and quotes
- Responsive layout (mobile, tablet, desktop)
- Animated feature cards with stagger effect
- Embedded video background with gradient overlay

**Database Connections:**
- Fetches mock review data from `mockData.ts`
- No direct database queries (uses mock data)

**Flow:**
- Users land on homepage
- Click "Plan My Trip" → navigates to `/plan` (requires login)
- Click "How It Works" → navigates to `/how-it-works`
- Click "Learn More" → scroll to features section

---

### 2. **How It Works Page** (`/how-it-works`)

**Purpose:** Educational page explaining the 4-step process to plan a trip.

**UI Components:**
- **Hero banner** with travel imagery
- **4-step process cards** with icons and descriptions:
  1. Choose Destination
  2. Select Your Stay
  3. Get Smart Roadmaps
  4. Travel Efficiently
- **Statistics bar** showing 130+ destinations, 7 states, 500+ hotels, 100% free
- **Feature highlights** with icons and descriptions
- **Security and community badges**

**Key Features:**
- Step-by-step visual guide
- Decorative animated blobs in background
- Icons representing each step (MapPin, Home, Map, TrendingUp)

**Database Connections:**
- No database connections (static educational content)

**Flow:**
- Users learn how the app works
- Click CTA button → redirects to `/plan` or `/register`

---

### 3. **Login Page** (`/login`)

**Purpose:** Authenticate existing users into the system.

**UI Components:**
- **Left side:** Large travel-themed background image with welcome text
- **Right side:** Login form with:
  - Email input field (with Mail icon)
  - Password input field (with Lock icon)
  - Show/Hide password toggle (Eye/EyeOff icon)
  - "Remember me" checkbox
  - Submit button (blue gradient)
  - Sign up link

**Validation:**
- Email validation (required, must be valid format)
- Password validation (required, minimum 6 characters)
- Error toast notifications for invalid credentials
- Loading state during submission

**Key Features:**
- Glassmorphism design
- Symmetric layout with image and form
- Password visibility toggle
- Remember me functionality
- Smooth transitions and hover effects

**Database Connections:**
- Calls `loginUser()` from `supabaseService.ts`
- Authenticates against `users` table in Supabase
- Checks user role (admin/traveler/host)
- Admin users redirect to `/admin`, others to `/plan`

**Fields Stored in Database:**
```
users.email → Input validation
users.password_hash → Compared with entered password
users.role → Determines redirect after login
```

**Flow:**
1. User enters email and password
2. System validates credentials against `users` table
3. On success → sets user context and navigates to `/plan` or `/admin`
4. On failure → shows error toast
5. New users can click "Sign up" link to navigate to `/register`

---

### 4. **Register Page** (`/register`)

**Purpose:** Create new user accounts for the application.

**UI Components:**
- **Left side:** Travel-themed background image
- **Right side:** Registration form with:
  - Name input (with User icon)
  - Email input (with Mail icon)
  - Phone input (with Phone icon)
  - Password input (with Lock icon, visibility toggle)
  - Gender dropdown (Male, Female, Other)
  - Role selection (Traveler, Host)
  - Submit button
  - Login link for existing users

**Validation:**
- Name: Required, at least 2 characters
- Email: Required, valid email format, must be unique
- Phone: Optional, valid phone format
- Password: Required, minimum 6 characters
- Gender: Required
- Role: Pre-selected as 'traveler'
- Error toast notifications for validation failures

**Key Features:**
- Multi-field form with icons
- Role-based registration (traveler/host)
- Gender selection dropdown
- Glassmorphism design
- Password visibility toggle

**Database Connections:**
- Calls `registerUser()` from `supabaseService.ts`
- Inserts new record into `users` table
- Enforces unique email constraint
- Stores hashed password in `password_hash` field
- Assigns role_id based on selected role

**Fields Stored in Database:**
```
users.name → From "Name" input
users.email → From "Email" input
users.password_hash → Hashed from password input
users.phone → From "Phone" input
users.gender → Selected gender enum
users.role_id → Based on role selection
users.created_at → Auto-generated timestamp
```

**Flow:**
1. User fills registration form
2. System validates all required fields
3. On success → creates account and logs in user
4. Navigates to home page (`/`)
5. On failure → shows error message for specific field

---

### 5. **Trip Planner Page** (`/plan`)

**Purpose:** Multi-step form to gather trip details and preferences.

**UI Components:**
- **Step 1 - State & Destination Selection:**
  - State dropdown (with data from Supabase)
  - Destination dropdown (filtered by selected state)
  - Destination image carousel
  - Place count and description

- **Step 2 - Trip Details:**
  - Travel Type selector (Nature, Adventure, Beach, Heritage, Nightlife)
  - Group Type selector (Solo, Duo, Family, Friends)
  - Budget slider (₹1,000 - ₹10,000)
  - Duration slider (2-7 days)
  - Real-time budget and cost display

**Key Features:**
- Progressive form with animations
- Real-time destination images
- Budget visualization
- Travel type icons and color coding
- Responsive carousel layout

**Database Connections:**
- `fetchStates()` → Queries states from database
- `fetchDestinations(state)` → Filters destinations by state
- `fetchTravelTypes()` → Gets available travel type options
- `fetchGroupTypes()` → Gets group type options
- Falls back to mock data if Supabase is unavailable

**Tables Referenced:**
```
destinations.state → State selection dropdown
destinations.name → Destination selection dropdown
destinations.description → Displayed below destination
travel_types.name → Travel type options with icons
group_types.type_name → Group type options
```

**Context Updated:**
- `trip.state` → Selected state
- `trip.destination` → Selected destination
- `trip.travelType` → Selected travel type
- `trip.groupType` → Selected group type
- `trip.budget` → Slider value
- `trip.days` → Duration selection

**Flow:**
1. User logs in and sees Trip Planner
2. Step 1: Select state and destination
3. See destination image and details
4. Step 2: Choose travel preferences and budget
5. Continue button → navigates to `/stay-selection`

---

### 6. **Stay Selection Page** (`/stay-selection`)

**Purpose:** Allow users to choose accommodation type and specific property.

**UI Components:**
- **Tab switcher:** Hotels vs. Local Hosts
- **Hotels Tab:**
  - Hotel cards with:
    - Hotel image
    - Hotel name and rating (star display)
    - Price per night
    - Amenities (WiFi, Restaurant, Gym, Breakfast icons)
    - Location map thumbnail
    - Select button

- **Local Hosts Tab:**
  - Host profile cards with:
    - Host avatar
    - Host name and rating
    - Number of guests accepted
    - Special offerings (provides food, etc.)
    - Voluntary minimum amount
    - Select button

**Key Features:**
- Tab-based interface for hotel/host selection
- Real-time hotel loading from Supabase
- Star rating displays
- Amenity badges
- Loading states and spinners
- Selection confirmation

**Database Connections:**
- `fetchHotelsForDestination(destination)` → Queries hotels table
- Mock hosts for local accommodation
- Falls back to mock data if unavailable

**Tables Referenced:**
```
hotels.destination_id → Filter hotels by destination
hotels.name → Display hotel name
hotels.price_per_night → Show pricing
hotels.rating → Display star rating
hotels.latitude → For location data
hotels.longitude → For location data
```

**Context Updated:**
- `trip.selectedStay` → Selected hotel/host name
- `trip.stayType` → 'hotel' or 'host'
- `trip.stayLat` → Latitude for map
- `trip.stayLng` → Longitude for map

**Flow:**
1. User sees list of hotels for selected destination
2. Filters by price, rating, or amenities (optional)
3. Selects a hotel or switches to hosts tab
4. Clicks "Select Stay" → navigates to `/roadmap-options`

---

### 7. **Roadmap Options Page** (`/roadmap-options`)

**Purpose:** Present algorithmically generated travel itineraries based on stay location.

**UI Components:**
- **Header:** Back button, title, stay location display
- **Roadmap cards** (2 options):
  1. **Fastest Route:**
     - Zap icon (lightning bolt)
     - Distance estimate
     - Total cost breakdown
     - Number of places to visit
     - Intensity level
     - Orange/pink gradient

  2. **Budget Efficient:**
     - Wallet icon
     - Distance estimate
     - Total cost breakdown
     - Number of places to visit
     - Intensity level
     - Green/emerald gradient

**Key Features:**
- Glassmorphism card design
- Gradient decorative top border
- Hover animations (lift effect)
- Dynamic cost calculations
- Icon-based differentiation

**Database Connections:**
- No direct database connection
- Calculations based on:
  - Stay cost: `trip.stayType === 'hotel' ? 2000 * trip.days : 0`
  - Transport, food, entry fees calculated from fixed rates
  - Distance based on stay location and destinations

**Context Updated:**
- `trip.selectedRoadmap` → Selected roadmap object

**Flow:**
1. User views two roadmap options
2. Click on a roadmap card → navigates to `/itinerary`
3. Can go back to change stay selection

---

### 8. **Itinerary Page** (`/itinerary`)

**Purpose:** Display day-by-day detailed travel schedule with times and locations.

**UI Components:**
- **Header:** Title, roadmap type, stay location
- **Expandable day cards:**
  - Day number badge with gradient color
  - Day summary (time range, place count)
  - Expandable content showing:
    - Time slots (8 AM, 10 AM, 12 PM, etc.)
    - Place names
    - Distance from stay
    - Entry fees (if applicable)
    - Average visit time

**Key Features:**
- Accordion-style expand/collapse
- Color-coded days (7 different gradients)
- Animated transitions
- Time-based schedule
- Distance calculations
- Fully expandable itinerary

**Database Connections:**
- `getPlacesForDestination(destination)` → Gets places from mock data
- Distribution: places split across days evenly

**Tables Referenced:**
```
places.destination_id → Filter places by destination
places.name → Display place name
places.entry_fee → Show cost
places.avg_visit_time → Display duration
places.latitude → Calculate distance
places.longitude → Calculate distance
```

**Context Used:**
- `trip.destination` → Fetch places
- `trip.days` → Distribute places across days
- `trip.stayLat`, `trip.stayLng` → Calculate distances

**Flow:**
1. User sees detailed itinerary for selected roadmap
2. Click on day to expand details
3. View all activities, times, and costs
4. Can navigate to map view or expense breakdown
5. Back button returns to `/roadmap-options`

---

### 9. **Map View Page** (`/map-view`)

**Purpose:** Visualize the travel route and locations on an interactive map.

**UI Components:**
- **Leaflet Map showing:**
  - Red marker for stay location
  - Blue markers for each tourist place
  - Blue polyline connecting stay to all places
  - Day-based filters (View all or specific day)
  - Zoom and pan controls
  - Popup information on marker click

- **Day Filter Tabs:**
  - "All Days" button
  - Individual day buttons (Day 1, Day 2, etc.)
  - Selected day highlighted

**Key Features:**
- Interactive Leaflet.js map
- Real-time route visualization
- Day-wise filtering
- Custom marker icons
- Responsive map sizing

**Database Connections:**
- Place coordinates from mock data
- Destination coordinates from `DESTINATION_COORDS`

**External Libraries:**
- `react-leaflet` → Map component
- `leaflet` → Map functionality

**Context Used:**
- `trip.destination` → Get destination center
- `trip.days` → Filter by day
- `trip.stayLat`, `trip.stayLng` → Show stay location

**Flow:**
1. User views map with all locations
2. Can filter by specific day using tab buttons
3. See polyline route connecting all places
4. Click markers for place information
5. Download button to save map

---

### 10. **Expense Breakdown Page** (`/expense-breakdown`)

**Purpose:** Detailed cost analysis showing budget allocation across categories.

**UI Components:**
- **Header:** Trip summary info
- **Expense items (5 categories):**
  1. **Accommodation** (Building icon, brand color)
  2. **Transport** (Car icon, ocean color)
  3. **Food & Dining** (Utensils icon, orange color)
  4. **Entry Fees** (Ticket icon, green color)
  5. **Miscellaneous** (Package icon, gray color)

- **For each category:**
  - Category icon and label
  - Amount in rupees
  - Percentage bar (animated)
  - Color-coded gradient

- **Summary section:**
  - Total cost
  - Budget vs. actual
  - Remaining budget (or over budget warning)

**Validation:**
- Shows warning if expenses exceed budget
- Displays remaining amount prominently

**Key Features:**
- Icon representation for each expense type
- Animated percentage bars
- Color-coded categories
- Real-time calculations
- Warning for over-budget scenarios

**Database Connections:**
- `expenses` table structure:
  ```
  accommodation: 2000 * trip.days
  transport: 250 * trip.days
  food: 400 * trip.days
  entry_fees: 80 * trip.days
  misc: 100 * trip.days
  ```

**Tables Referenced:**
```
expenses.accommodation → Total stay cost
expenses.transport → Daily transport cost
expenses.food → Daily food cost
expenses.entry_fees → Daily entry fees
expenses.currency → Display currency (USD/INR)
```

**Context Used:**
- `trip.stayType` → Calculate accommodation
- `trip.days` → Multiply daily rates
- `trip.budget` → Compare against total

**Flow:**
1. User navigates from itinerary
2. Views detailed expense breakdown
3. Sees total cost and remaining budget
4. Can print or download expense summary
5. Proceed to final review (if within budget)

---

### 11. **Final Review Page** (`/final-review`)

**Purpose:** Last page where users review complete trip details and provide feedback.

**UI Components:**
- **Success animation:** Green circle with star icon
- **Trip Summary Card showing:**
  - Destination and state
  - Duration (days)
  - Selected stay name
  - Total budget

- **Action buttons:**
  - Download Complete Itinerary (PDF)
  - View Route on Map

- **Safety & Support section:**
  - Emergency contacts list
  - Solo traveler safety tips
  - Contact information for support

- **Review section:**
  - 5-star rating system
  - Comment text area
  - Submit button

- **New Trip button:** Reset and start over

**Key Features:**
- Success animation on page load
- Complete trip summary
- Safety information integration
- Review submission form
- Download PDF functionality

**Database Connections:**
- Saves review to `reviews` table after submission

**Tables Referenced:**
```
reviews.user_id → Current user ID
reviews.roadmap_id → Current roadmap ID
reviews.rating → Star rating (1-5)
reviews.comment → User comment
reviews.created_at → Timestamp of review
```

**Context Used:**
- `trip.destination`, `trip.state` → Display summary
- `trip.days` → Show duration
- `trip.selectedStay` → Show accommodation
- `trip.budget` → Show budget
- `resetTrip()` → Clear data for new trip

**Flow:**
1. User sees trip confirmation
2. Downloads itinerary as PDF
3. Views route on map
4. Submits review and rating
5. Clicks "Plan New Trip" → navigates to home

---

### 12. **Admin Dashboard** (`/admin`)

**Purpose:** Administrative panel for managing users, hosts, destinations, and places.

**UI Components:**
- **Tab Navigation:**
  1. Overview
  2. Users
  3. Hosts
  4. Places

- **Overview Tab:**
  - 4 stat cards showing:
    - Total users count
    - Active hosts count
    - Total destinations
    - Total hotels

- **Users Tab:**
  - Search bar for user lookup
  - User table with:
    - Name, Email, Phone
    - Role (Traveler/Host/Admin)
    - Account status
    - Join date
    - Action buttons (View, Edit, Deactivate)

- **Hosts Tab:**
  - Verified/unverified host list
  - Host information cards
  - Verification badges
  - Action buttons

- **Places Tab:**
  - Destination list with details
  - Place count per destination
  - Hotel count
  - View/edit options

**Access Control:**
- Only users with admin role can access
- Non-admin users see access denied message
- Admin status from AuthContext

**Key Features:**
- Multi-tab dashboard
- Search and filter functionality
- Data fetching from multiple tables
- Loading states
- Admin-only access protection

**Database Connections:**
- `fetchAllUsers()` → Query `users` table
- `fetchAllHosts()` → Query `host_profiles` table
- `fetchDestinationStats()` → Count destinations and places

**Tables Referenced:**
```
users → Display user data
host_profiles → Display host information
destinations → Count and display stats
hotels → Display hotel statistics
places → Get place counts by destination
```

**Flow:**
1. Admin logs in with admin credentials
2. Navigates to `/admin`
3. Views overview statistics
4. Can search and manage users, hosts, and places
5. Perform administrative actions (verify hosts, manage data)

---

### 13. **Profile Page** (`/profile`)

**Purpose:** Display user profile information and personal travel history.

**UI Components:**
- **Profile Header:**
  - User avatar (gradient circle)
  - User name
  - Email and phone
  - Role badge
  - Join date

- **Statistics Cards (3 columns):**
  - Trips planned count
  - Reviews given count
  - Places visited count

- **Travel History section:**
  - Past trips list with:
    - Destination name
    - Trip duration
    - Trip date
    - View itinerary link

- **Reviews section:**
  - Reviews given by user
  - Star ratings
  - Comments
  - Date posted

- **Emergency Contacts section:**
  - Saved safety contacts
  - Phone numbers
  - Edit/delete options

**Key Features:**
- User profile visualization
- Travel history tracking
- Review management
- Emergency contact storage
- Responsive profile layout

**Database Connections:**
- User data from AuthContext
- Mock past trips and reviews for display

**Tables Referenced:**
```
users → Display user profile data
travel_preferences → User trip history
reviews → User's given reviews
safety_contacts → Emergency contact list
```

**Context Used:**
- `user` from AuthContext
- Display user name, email, phone, role

**Flow:**
1. Logged-in user navigates to profile
2. Sees personal profile information
3. Views past trips and reviews
4. Can edit profile or emergency contacts
5. View detailed trip histories

---

### 14. **Host Registration Page** (`/host-register`)

**Purpose:** Allow users to register as local hosts and offer accommodations.

**UI Components:**
- **Registration Form with fields:**
  - Full Name (required)
  - Phone Number (required)
  - State selection
  - Destination selection
  - Address (required)
  - Maximum guests (number input)
  - Provides food (checkbox)
  - Voluntary minimum amount (currency input)

- **Submit Button** with validation
- **Success screen** showing:
  - Check mark icon
  - Success message
  - Verification timeline (24-48 hours)
  - Back to home button

**Validation:**
- Name: Required, at least 2 characters
- Phone: Required, valid format
- Destination: Required
- Address: Required
- Max guests: Must be positive number
- Amenities: Optional selection

**Key Features:**
- Multi-field registration form
- State-based destination filtering
- Checkbox for amenities
- Success confirmation screen
- Email verification requirement

**Database Connections:**
- `registerHost()` → Insert into `host_profiles` table

**Tables Referenced:**
```
host_profiles.user_id → Current user ID
host_profiles.destination_id → Selected destination
host_profiles.max_guests → Max guests capacity
host_profiles.provides_food → Food service flag
host_profiles.voluntary_min_amount → Minimum amount
host_profiles.verified → Initially false (manual review)
host_profiles.is_active → Initially true
```

**Flow:**
1. User clicks "Become a Host" link
2. Fills registration form with property details
3. Submits form → inserted into database
4. Shows success message
5. Admin reviews profile within 24-48 hours
6. Host receives verification email

---

## Database Schema & Table Connections

### Complete Database Structure

The application uses **Supabase PostgreSQL** with the following 17 tables:

#### **1. Users Table** (`users`)
Stores user account information and authentication data.

```sql
user_id (Primary Key)
name (VARCHAR 100) - User full name
email (VARCHAR 100) - Unique email
password_hash (VARCHAR 255) - Encrypted password
phone (VARCHAR 15) - Contact number
gender (ENUM: MALE, FEMALE, OTHER)
role_id (Foreign Key → roles)
is_active (BOOLEAN) - Account status
created_at (TIMESTAMP) - Registration date
```

**Connected To:** TripPlanner, Login, Register, AdminDashboard, Profile

---

#### **2. Destinations Table** (`destinations`)
Stores all available destinations for trip planning.

```sql
destination_id (Primary Key)
name (VARCHAR 100) - Destination name
state (VARCHAR 100) - State name
description (TEXT) - Destination description
best_season (VARCHAR 50) - Best time to visit
```

**Connected To:** TripPlanner, StaySelection, HostRegistration

---

#### **3. Hotels Table** (`hotels`)
Stores hotel and accommodation information.

```sql
hotel_id (Primary Key)
destination_id (Foreign Key → destinations)
name (VARCHAR 100) - Hotel name
price_per_night (NUMERIC 10,2) - Rate per night
rating (NUMERIC 2,1) - Star rating (0-5)
latitude (NUMERIC 10,8) - Location latitude
longitude (NUMERIC 11,8) - Location longitude
```

**Connected To:** StaySelection, RoadmapOptions, ExpenseBreakdown, MapView

---

#### **4. Places Table** (`places`)
Stores tourist attractions and points of interest.

```sql
place_id (Primary Key)
destination_id (Foreign Key → destinations)
travel_type_id (Foreign Key → travel_types)
name (VARCHAR 100) - Place name
latitude (NUMERIC 10,8) - Location latitude
longitude (NUMERIC 11,8) - Location longitude
entry_fee (NUMERIC 10,2) - Entry cost
avg_visit_time (INTEGER) - Time in minutes
```

**Connected To:** Itinerary, MapView, ExpenseBreakdown

---

#### **5. Travel Types Table** (`travel_types`)
Pre-defined travel preferences/themes.

```sql
travel_type_id (Primary Key)
name (VARCHAR 50) - Type name (Nature, Adventure, Beach, Heritage, Nightlife)
```

**Connected To:** TripPlanner, Places

---

#### **6. Group Types Table** (`group_types`)
Travel companion types/group categories.

```sql
group_type_id (Primary Key)
type_name (VARCHAR 20) - Group type (Solo, Duo, Family, Friends)
```

**Connected To:** TripPlanner

---

#### **7. Travel Preferences Table** (`travel_preferences`)
Stores user's travel preferences for recommendations.

```sql
preference_id (Primary Key)
user_id (Foreign Key → users)
travel_type_id (Foreign Key → travel_types)
days (INTEGER) - Preferred duration
budget (NUMERIC 10,2) - Budget amount
group_type_id (Foreign Key → group_types)
```

**Connected To:** TripPlanner

---

#### **8. Roadmaps Table** (`roadmaps`)
Stores generated travel itineraries.

```sql
roadmap_id (Primary Key)
user_id (Foreign Key → users)
destination_id (Foreign Key → destinations)
roadmap_type_id (Foreign Key → roadmap_types)
total_distance (NUMERIC 10,2) - Total travel distance
estimated_cost (NUMERIC 10,2) - Total cost
created_at (TIMESTAMP) - Creation date
```

**Connected To:** RoadmapOptions, Itinerary, MapView

---

#### **9. Roadmap Types Table** (`roadmap_types`)
Types of routing algorithms.

```sql
roadmap_type_id (Primary Key)
type_name (VARCHAR 30) - Type (Fastest Route, Budget Efficient, etc.)
```

**Connected To:** RoadmapOptions

---

#### **10. Roadmap Places Table** (`roadmap_places`)
Day-wise mapping of places in a roadmap.

```sql
id (Primary Key)
roadmap_id (Foreign Key → roadmaps)
place_id (Foreign Key → places)
day_number (INTEGER) - Which day (1-7)
visit_order (INTEGER) - Sequence in day
estimated_start_time (TIME) - 8:00 AM format
estimated_end_time (TIME) - End time
```

**Connected To:** Itinerary, MapView

---

#### **11. Roadmap Accommodations Table** (`roadmap_accommodations`)
Hotel selection for each day of roadmap.

```sql
accommodation_id (Primary Key)
roadmap_id (Foreign Key → roadmaps)
hotel_id (Foreign Key → hotels)
day_number (INTEGER) - Check-in day
check_in_time (TIME) - Check-in time
```

**Connected To:** StaySelection, RoadmapOptions

---

#### **12. Expenses Table** (`expenses`)
Detailed cost breakdown for each roadmap.

```sql
expense_id (Primary Key)
roadmap_id (Foreign Key → roadmaps)
accommodation (NUMERIC 10,2) - Stay costs
food (NUMERIC 10,2) - Meal costs
transport (NUMERIC 10,2) - Travel costs
entry_fees (NUMERIC 10,2) - Attraction costs
currency (VARCHAR 10) - Currency code (USD/INR)
last_updated (TIMESTAMP) - Update timestamp
```

**Connected To:** ExpenseBreakdown, FinalReview

---

#### **13. Host Profiles Table** (`host_profiles`)
Information for local hosts offering accommodations.

```sql
host_id (Primary Key)
user_id (Foreign Key → users)
destination_id (Foreign Key → destinations)
max_guests (INTEGER) - Guest capacity
provides_food (BOOLEAN) - Meal service available
verified (BOOLEAN) - Admin verification status
voluntary_min_amount (NUMERIC 10,2) - Minimum donation
is_active (BOOLEAN) - Active status
```

**Connected To:** HostRegistration, StaySelection

---

#### **14. Reviews Table** (`reviews`)
User reviews and ratings for trips.

```sql
review_id (Primary Key)
user_id (Foreign Key → users)
roadmap_id (Foreign Key → roadmaps)
rating (INTEGER) - 1-5 star rating
comment (TEXT) - Review text
created_at (TIMESTAMP) - Review date
```

**Connected To:** FinalReview, Profile

---

#### **15. Safety Contacts Table** (`safety_contacts`)
Emergency contact information for travelers.

```sql
contact_id (Primary Key)
user_id (Foreign Key → users)
name (VARCHAR 100) - Contact name
phone (VARCHAR 15) - Contact number
```

**Connected To:** FinalReview, Profile

---

#### **16. Roles Table** (`roles`)
User role types for access control.

```sql
role_id (Primary Key)
role_name (VARCHAR 30) - Role (traveler, host, admin)
```

**Connected To:** Users

---

#### **17. Gender Enum Type**
PostgreSQL custom enum for gender values:
- MALE
- FEMALE
- OTHER

---

## Data Flow Architecture

### User Registration Flow
```
Register Page → ValidationCheck → registerUser() → 
INSERT INTO users (name, email, password_hash, phone, gender, role_id)
→ AuthContext Updated → Redirect to Home
```

### Trip Planning Flow
```
TripPlanner (State/Destination/Budget/Days) → 
StaySelection (SELECT FROM hotels WHERE destination_id) → 
RoadmapOptions → 
Itinerary (SELECT FROM places WHERE destination_id) → 
MapView (Display on Leaflet Map) → 
ExpenseBreakdown → 
FinalReview → 
INSERT INTO reviews → 
Redirect to Home
```

### Host Registration Flow
```
HostRegistration Form → 
INSERT INTO host_profiles (user_id, destination_id, max_guests, ...) →
Admin Review → 
UPDATE host_profiles SET verified = true →
Host can offer accommodations
```

### Admin Dashboard Flow
```
AdminDashboard → 
SELECT COUNT(*) FROM users → 
SELECT COUNT(*) FROM host_profiles →
SELECT * FROM destinations, hotels, places →
Display Statistics and Lists
```

---

## Technologies & Tools Used

### Frontend Framework
- **React 18** (`^18.2.0`)
  - Component-based UI architecture
  - Hooks for state management
  - Context API for global state
  - Fast rendering with virtual DOM

### Styling & Design
- **Tailwind CSS** (`^3.3.0`)
  - Utility-first CSS framework
  - Responsive design system
  - Custom color gradients
  - Animation utilities
- **PostCSS** (`^8.4.24`)
  - CSS processing and transformation
  - Autoprefixer for browser compatibility

### Animation Library
- **Framer Motion** (`^11.0.0`)
  - Page transitions and animations
  - Stagger animations for lists
  - Smooth element animations
  - Spring physics for natural motion
  - Used on every page for UX enhancement

### Routing
- **React Router** (`^6.22.0`)
  - Client-side page routing
  - Protected routes (auth-based)
  - Dynamic navigation
  - Route-based code splitting

### Icons
- **Lucide React** (`^0.263.1`)
  - 1000+ SVG icons
  - Consistent icon design
  - Used throughout UI:
    - MapPin for locations
    - Building2 for accommodations
    - DollarSign for budget
    - Calendar for dates
    - Users for group types
    - Eye/EyeOff for password visibility
    - And 50+ more throughout app

### Notifications
- **React Hot Toast** (`^2.4.1`)
  - Non-intrusive toast notifications
  - Success/error/info messages
  - Auto-dismiss functionality
  - Styled to match app theme

### Maps & Geolocation
- **Leaflet** (`^1.9.4`)
  - Interactive map library
  - Map tiles and layers
  - Markers and polylines
  - Zoom and pan controls

- **React Leaflet** (`^4.2.1`)
  - React wrapper for Leaflet
  - Component-based map building
  - integrated with React lifecycle

### Backend & Database
- **Supabase** (Real-time PostgreSQL)
  - `@supabase/supabase-js` (`^2.97.0`)
  - PostgreSQL database with 17 tables
  - Real-time subscriptions
  - User authentication
  - Row-level security
  - RESTful API endpoints

### Build Tools
- **Vite** (`^4.5.14`)
  - Lightning-fast development server
  - Hot module replacement (HMR)
  - Optimized production builds
  - ES modules support
  - NPM scripts defined in `package.json`

- **@vitejs/plugin-react** (`^4.0.0`)
  - React Fast Refresh
  - JSX transformation

### Development Tools
- **TypeScript** (Development)
  - Type-safe development
  - IDE intellisense
  - Compile-time error detection
  - Used for all `.tsx` and `.ts` files

- **Autoprefixer** (`^10.4.14`)
  - CSS vendor prefixes
  - Browser compatibility

- **npm** (Package Manager)
  - Dependency management
  - Script execution

### Additional Type Definitions
- `@types/react` (`^18.2.0`)
- `@types/react-dom` (`^18.2.0`)
- `@types/leaflet` (`^1.9.8`)

---

## Key Design Patterns & Features

### UI/UX Features Across All Pages

1. **Glassmorphism Design**
   - Semi-transparent cards with backdrop blur
   - Modern, elegant aesthetic
   - Applied to all content cards

2. **Gradient System**
   - Brand colors: brand-500 to ocean-500
   - Category-specific gradients (green, orange, red)
   - Decorative gradient borders on card tops

3. **Smooth Animations**
   - Page transition animations (slide + fade)
   - Stagger animation for lists
   - Hover effects on interactive elements
   - Loading skeleton screens

4. **Responsive Design**
   - Mobile-first approach
   - Tailwind breakpoints (sm, md, lg, xl)
   - Touch-friendly button sizes
   - Adaptive layouts

5. **Icon Integration**
   - Every action has an associated icon
   - Icons aid in quick user understanding
   - Consistent icon sizing and styling

6. **Form Validation**
   - Real-time field validation
   - Clear error messages via toasts
   - Required field indicators
   - Input masking for phone numbers

7. **Loading States**
   - Loading spinners for async operations
   - Disabled state for buttons during submission
   - Skeleton screens for content loading
   - Clear feedback during data fetching

---

## Context Management

### AuthContext
Manages all authentication-related state:
- `user`: Current logged-in user object
- `isLoggedIn`: Boolean authentication status
- `isAdmin`: Check if user is administrator
- `isHost`: Check if user is host
- Functions: `login()`, `register()`, `logout()`

### TripContext
Manages trip planning state throughout user journey:
- `trip`: Complete trip object with all selections
- `updateTrip()`: Partial state updates
- `resetTrip()`: Clear all trip data

---

## Validation Rules

### Login Page
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Credentials must match database records

### Register Page
- Name: Required, minimum 2 characters
- Email: Required, unique in database
- Password: Required, minimum 6 characters
- Phone: Optional, valid format if provided
- Gender: Required selection
- Role: Pre-selected as 'traveler'

### Trip Planner Page
- State: Required selection
- Destination: Required, filtered by state
- Travel Type: Required selection
- Group Type: Required selection
- Budget: Required, range 1000-10000
- Days: Required, range 2-7

### Stay Selection Page
- Must select at least one accommodation
- Shows loading state while fetching hotels

### Host Registration Page
- Name: Required, minimum 2 characters
- Phone: Required, valid format
- Destination: Required selection
- Address: Required
- Max guests: Required, positive number
- Shows success confirmation

---

## Performance Optimizations

1. **Code Splitting**
   - Routes lazy-loaded via React Router
   - Each page loaded on demand

2. **Image Optimization**
   - External images from Pexels API
   - Lazy loading on images
   - WebP format support

3. **Animation Performance**
   - Framer Motion uses GPU acceleration
   - Will-change CSS properties
   - Requestanimationframe for smooth 60fps

4. **Database Queries**
   - Query caching where possible
   - Efficient filtering on frontend
   - Mock data fallback for offline mode

5. **Bundle Size**
   - Vite tree-shaking
   - Minified production builds
   - Gzip compression enabled

---

## Security Features

1. **Authentication**
   - Password hashing in database
   - Secure session management
   - Protected routes with AuthContext

2. **Authorization**
   - Role-based access control
   - Admin pages protected
   - User-specific data visibility

3. **Form Validation**
   - Input sanitization
   - Type checking with TypeScript
   - Email uniqueness validation

4. **Supabase Security**
   - Row-level security policies
   - Secure API endpoints
   - Environment variable protection

---

## API Integration

### Supabase Service Methods
Located in `lib/supabaseService.ts`:

```typescript
// Authentication
loginUser(email, password)
registerUser(userData)

// Data Fetching
fetchStates()
fetchDestinations(state)
fetchTravelTypes()
fetchGroupTypes()
fetchHotelsForDestination(destination)
fetchPlacesForDestination(destination)

// Admin Operations
fetchAllUsers()
fetchAllHosts()
fetchDestinationStats()

// Data Submission
submitReview(reviewData)
registerHost(hostData)
```

---

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Internet Explorer**: Not supported (uses ES6+ features)
- **Mobile Browsers**: Fully responsive (iOS Safari, Chrome Mobile)

---

## File Structure Summary

```
travelRoadmap/
├── src/
│   ├── pages/                          (14 pages)
│   │   ├── Landing.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── TripPlanner.tsx
│   │   ├── StaySelection.tsx
│   │   ├── RoadmapOptions.tsx
│   │   ├── Itinerary.tsx
│   │   ├── MapView.tsx
│   │   ├── ExpenseBreakdown.tsx
│   │   ├── FinalReview.tsx
│   │   ├── Profile.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── HostRegistration.tsx
│   ├── components/                     (Reusable components)
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AnimatedPage.tsx
│   │   └── StarRating.tsx
│   ├── contexts/                       (Global state)
│   │   ├── AuthContext.tsx
│   │   └── TripContext.tsx
│   ├── lib/                            (Services & utilities)
│   │   ├── supabaseClient.ts
│   │   └── supabaseService.ts
│   ├── data/
│   │   └── mockData.ts                 (Mock data & defaults)
│   ├── App.tsx                         (Root component)
│   ├── main.tsx                        (Entry point)
│   └── index.css                       (Tailwind imports)
├── package.json                        (Dependencies)
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

---

## Running the Application

### Development Mode
```bash
npm install
npm run dev
```
Starts development server at `http://localhost:3000`

### Production Build
```bash
npm run build
```
Creates optimized build in `dist/` folder

### Preview Build
```bash
npm run preview
```
Local preview of production build

---

## Conclusion

**Time2Travel** is a comprehensive travel planning application that combines modern web technologies with practical UX design. The 14-page interface guides users through a seamless journey from destination selection to final trip review, with each page carefully designed to handle specific aspects of travel planning. The application leverages Supabase for data management, React for UI rendering, Tailwind CSS for styling, and Framer Motion for smooth animations, creating a responsive and engaging platform for budget-conscious travelers in South India.

The database schema with 17 tables provides robust data management, while the component-based architecture ensures maintainability and scalability. The system supports three user roles (travelers, hosts, and administrators), enabling a complete ecosystem for travel planning and local community engagement.

---

**Project Documentation Compiled**

**Author:** AI Assistant Documentation System

**Date:** February 23, 2026

**Version:** 1.0

---
