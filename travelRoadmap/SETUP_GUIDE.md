# Quick Start Guide

## First Time Setup

### Step 1: Install Dependencies
Open PowerShell in the project directory and run:
```powershell
npm install
```

This will install all required packages:
- react (UI library)
- react-dom (DOM rendering)
- lucide-react (icons)
- vite (build tool)
- tailwindcss (styling)
- autoprefixer (CSS compatibility)
- postcss (CSS processing)

### Step 2: Start Development Server
```powershell
npm run dev
```

The app will automatically:
- Start on http://localhost:3000
- Open in your default browser
- Enable hot reload (changes update instantly)

### Step 3: Start Planning!
- Click "Plan My Trip" to begin
- Select a state and destination
- Set your budget and trip duration
- Choose your accommodation
- Get your optimized roadmap

## Other Commands

### Build for Production
```powershell
npm run build
```
Creates optimized files in the `dist` folder

### Preview Production Build
```powershell
npm run preview
```
Test the production build locally

## Troubleshooting

### Port 3000 Already in Use
If port 3000 is already in use, edit `vite.config.js` and change the port number:
```javascript
server: {
  port: 3001,  // or another available port
  open: true
}
```

### Dependencies Won't Install
Try clearing npm cache:
```powershell
npm cache clean --force
npm install
```

### App Not Loading
1. Make sure Node.js is installed: `node --version`
2. Check npm is working: `npm --version`
3. Delete node_modules and reinstall:
   ```powershell
   Remove-Item -Recurse node_modules
   npm install
   ```

## Project Structure Overview

```
travelRoadmap/
├── src/                    # Source code
│   ├── App.tsx            # Main component (all screens)
│   ├── main.tsx           # Entry point
│   └── index.css          # Tailwind styles
├── public/                # Static files (if needed)
├── index.html             # HTML template
├── package.json           # Dependencies & scripts
├── vite.config.js         # Build configuration
├── tailwind.config.js     # Tailwind settings
├── postcss.config.js      # CSS processing
└── README.md              # Full documentation
```

## Key Features

✅ Beautiful landing page with call-to-action
✅ Multi-step trip planning wizard
✅ 100+ destinations across South India
✅ Budget-friendly options (₹1,000-₹10,000)
✅ Hotel & local host accommodation options
✅ AI-optimized travel routes
✅ Day-by-day itinerary planning
✅ Expense breakdown & analysis
✅ Responsive design for all devices
✅ Smooth animations & transitions

## Next Steps After Running

1. Explore all the screens by navigating through the app
2. Try different destinations and budgets
3. Compare multiple roadmap options
4. View expense breakdowns
5. Check the "How It Works" page for feature overview

## Development Tips

- The entire app is in one `App.tsx` file for easy understanding
- Mock data is embedded (no backend needed)
- All styling uses Tailwind CSS classes
- Lucide icons provide beautiful UI elements
- Screen navigation uses React state

Enjoy planning your trips! 🚀
