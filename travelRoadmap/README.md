# Time2Travel - Smart Travel Planning App

A React-based travel planning application that helps users create optimized travel itineraries within their budget.

## Features

- 🗺️ **Destination Selection**: Choose from 100+ destinations across South India
- 💰 **Budget Planning**: Set your budget and get cost-optimized routes
- 🏨 **Stay Selection**: Choose from hotels, hostels, or local hosts
- 📅 **Day-by-Day Itinerary**: Get personalized travel plans
- 💸 **Expense Breakdown**: Detailed cost analysis
- 🗓️ **Flexible Duration**: Plan trips for 2-7 days

## Project Structure

```
travelRoadmap/
├── src/
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # React entry point
│   └── index.css         # Tailwind CSS styles
├── public/               # Static assets
├── index.html            # HTML entry point
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## Installation

1. **Prerequisites**: Make sure you have Node.js (v16+) and npm installed

2. **Install dependencies**:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the development server at `http://localhost:3000` and automatically open it in your browser.

### Production Build
```bash
npm run build
```
This creates an optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
This previews the production build locally.

## Technologies Used

- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful icon library
- **TypeScript** - Type-safe JavaScript

## How to Use

1. **Start Planning**: Click "Plan My Trip" on the landing page
2. **Select Destination**: Choose a state and destination
3. **Set Budget**: Use the slider to set your budget (₹1,000-₹10,000)
4. **Choose Duration**: Select number of travel days (2-7)
5. **Pick Your Stay**: Choose from hotels or connect with local hosts
6. **Generate Roadmap**: Get AI-optimized travel itineraries
7. **Review & Download**: View detailed itinerary and expense breakdown

## Available Destinations

### Kerala
Munnar, Alleppey, Kochi, Wayanad, Kovalam, Thekkady, and more...

### Karnataka
Coorg, Hampi, Bangalore, Mysore, Chikmagalur, and more...

### Tamil Nadu
Ooty, Kodaikanal, Mahabalipuram, Rameswaram, Kanyakumari, and more...

### Andhra Pradesh
Visakhapatnam, Araku Valley, Tirupati, Vijayawada, and more...

### Telangana
Hyderabad, Warangal, Ramoji Film City, and more...

## Features in Detail

### Smart Route Optimization
- Calculates distances from your stay location
- Groups nearby tourist spots
- Minimizes travel time and costs
- Generates multiple itinerary options

### Expense Management
- Detailed breakdown by category
- Hotel/hostel costs
- Transport costs
- Food expenses
- Entry fees for attractions

### Local Host Connection
- Connect with verified local hosts
- Free or affordable stays
- Authentic travel experiences
- Food included options

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lightning-fast development with Vite
- Optimized production builds
- Responsive design for all devices
- Smooth animations and transitions

## Notes

- Mock data is used for demonstration
- Coordinates are for reference only
- Prices are approximate
- Contact information for safety emergencies should be added before travel

## Future Enhancements

- Real-time pricing integration
- Booking system integration
- GPS-based route tracking
- Weather forecasts
- Travel insurance options
- Photo gallery integration

## License

This project is open source and available for personal and educational use.

## Support

For issues or questions, please check the application's help section or contact the development team.
