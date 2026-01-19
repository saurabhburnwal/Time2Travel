import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, DollarSign, Users, Star, Shield, Map, Download, ChevronRight, ChevronDown, Home, Hotel, Clock, TrendingUp } from 'lucide-react';

// Mock Data
const STATES = ['Kerala', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana'];

const DESTINATIONS = {
  Kerala: ['Munnar', 'Alleppey', 'Kochi', 'Wayanad', 'Kovalam', 'Thekkady', 'Varkala', 'Kumarakom', 'Athirappilly', 'Bekal', 'Vagamon', 'Ponmudi', 'Kollam', 'Thrissur', 'Kannur', 'Palakkad', 'Idukki', 'Poovar', 'Marari', 'Nelliampathy'],
  Karnataka: ['Coorg', 'Hampi', 'Bangalore', 'Mysore', 'Chikmagalur', 'Gokarna', 'Udupi', 'Badami', 'Kabini', 'Dandeli', 'Sakleshpur', 'Bandipur', 'Belur', 'Shivamogga', 'Hassan', 'Bijapur', 'Mangalore', 'Karwar', 'Aihole', 'Pattadakal'],
  'Tamil Nadu': ['Ooty', 'Kodaikanal', 'Mahabalipuram', 'Rameswaram', 'Kanyakumari', 'Yercaud', 'Coimbatore', 'Thanjavur', 'Madurai', 'Pondicherry', 'Coonoor', 'Valparai', 'Kotagiri', 'Hogenakkal', 'Courtallam', 'Rameshwaram', 'Trichy', 'Kumbakonam', 'Kanchipuram', 'Vellore'],
  'Andhra Pradesh': ['Visakhapatnam', 'Araku Valley', 'Tirupati', 'Vijayawada', 'Amaravati', 'Srisailam', 'Horsley Hills', 'Ananthagiri Hills', 'Gandikota', 'Lambasingi', 'Nagarjuna Sagar', 'Borra Caves', 'Kondapalli', 'Belum Caves', 'Maredumilli', 'Ahobilam', 'Rajahmundry', 'Papi Hills', 'Kolleru Lake', 'Rushikonda'],
  Telangana: ['Hyderabad', 'Warangal', 'Ramoji Film City', 'Nagarjuna Sagar', 'Bhadrachalam', 'Medak', 'Khammam', 'Pochampally', 'Ananthagiri Hills', 'Karimnagar', 'Nizamabad', 'Kuntala Waterfall', 'Laknavaram Lake', 'Mallela Theertham', 'Yadagirigutta', 'Ethurnagaram', 'Pakhal Lake', 'Kinnerasani', 'Kolanupaka', 'Alampur']
};

const MOCK_HOTELS = [
  { id: 1, name: 'Hillside Resort & Spa', price: 2500, rating: 4.5, distance: '2 km from center', lat: 10.0889, lng: 77.0595 },
  { id: 2, name: 'Budget Inn Downtown', price: 1200, rating: 4.0, distance: '0.5 km from center', lat: 10.0889, lng: 77.0595 },
  { id: 3, name: 'Heritage Palace Hotel', price: 3200, rating: 4.8, distance: '3 km from center', lat: 10.0889, lng: 77.0595 },
  { id: 4, name: 'Backpacker Hostel Central', price: 600, rating: 3.8, distance: '1 km from center', lat: 10.0889, lng: 77.0595 }
];

const MOCK_HOSTS = [
  { id: 1, name: 'Priya Kumar', verified: true, foodIncluded: true, maxGuests: 2, rating: 4.9, distance: '1.5 km from center', lat: 10.0889, lng: 77.0595, bio: 'Local teacher, loves sharing culture' },
  { id: 2, name: 'Arjun Menon', verified: true, foodIncluded: false, maxGuests: 1, rating: 4.7, distance: '2.5 km from center', lat: 10.0889, lng: 77.0595, bio: 'Software developer, traveler at heart' },
  { id: 3, name: 'Lakshmi Iyer', verified: true, foodIncluded: true, maxGuests: 2, rating: 5.0, distance: '0.8 km from center', lat: 10.0889, lng: 77.0595, bio: 'Chef & food blogger' }
];

const MOCK_PLACES = [
  { id: 1, name: 'Tea Gardens', entryFee: 0, visitTime: '2 hours', category: 'Nature' },
  { id: 2, name: 'Botanical Gardens', entryFee: 50, visitTime: '1.5 hours', category: 'Nature' },
  { id: 3, name: 'Echo Point', entryFee: 30, visitTime: '1 hour', category: 'Viewpoint' },
  { id: 4, name: 'Top Station', entryFee: 0, visitTime: '2 hours', category: 'Viewpoint' },
  { id: 5, name: 'Mattupetty Dam', entryFee: 20, visitTime: '1.5 hours', category: 'Water Body' },
  { id: 6, name: 'Eravikulam National Park', entryFee: 120, visitTime: '3 hours', category: 'Wildlife' },
  { id: 7, name: 'Kundala Lake', entryFee: 0, visitTime: '1 hour', category: 'Water Body' },
  { id: 8, name: 'Rose Garden', entryFee: 50, visitTime: '1 hour', category: 'Nature' }
];

function App() {
  const [screen, setScreen] = useState('landing');
  const [tripData, setTripData] = useState({
    state: '',
    destination: '',
    budget: 5000,
    days: 3,
    selectedStay: null,
    stayType: null
  });
  const [expandedDay, setExpandedDay] = useState(null);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const updateTripData = (key, value) => {
    setTripData(prev => ({ ...prev, [key]: value }));
  };

  // Landing Screen
  const LandingScreen = () => (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-white">
        <div className="max-w-4xl text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Time2Travel
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-2">
            Smart Travel Planning Within Your Budget
          </p>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Fixed budget. Limited days. Optimized routes. We create intelligent roadmaps based on your stay location to minimize travel time and maximize experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => setScreen('input')}
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-2"
            >
              Plan My Trip <ChevronRight size={20} />
            </button>
            <button
              onClick={() => setScreen('how-it-works')}
              className="bg-transparent border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
            >
              See How It Works
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </div>
    </div>
  );

  // How It Works Screen
  const HowItWorksScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => setScreen('landing')} className="mb-8 text-purple-600 hover:text-purple-800 flex items-center gap-2">
          ← Back to Home
        </button>
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">How Time2Travel Works</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Choose Your Destination</h3>
            <p className="text-gray-600">Select from 100+ beautiful destinations across South India, set your budget (up to ₹10,000), and choose your travel days.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Home className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Select Your Stay</h3>
            <p className="text-gray-600">Choose from hotels, hostels, or connect with verified local hosts for an authentic experience. Your stay location determines your roadmap.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Map className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Get Smart Roadmaps</h3>
            <p className="text-gray-600">Our algorithm calculates distances from your stay and groups nearby tourist spots to minimize travel time and costs.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="text-pink-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Travel Efficiently</h3>
            <p className="text-gray-600">Follow your optimized day-by-day itinerary with up to 10 curated spots, complete with timings, costs, and routes.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setScreen('input')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Start Planning Now
          </button>
        </div>
      </div>
    </div>
  );

  // Input Screen
  const InputScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-90">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Plan Your Perfect Trip</h2>
          
          <div className="space-y-6">
            {/* State Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select State</label>
              <select
                value={tripData.state}
                onChange={(e) => updateTripData('state', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
              >
                <option value="">Choose a state...</option>
                {STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Destination Selection */}
            {tripData.state && (
              <div className="animate-fade-in">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Destination</label>
                <select
                  value={tripData.destination}
                  onChange={(e) => updateTripData('destination', e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                >
                  <option value="">Choose destination...</option>
                  {DESTINATIONS[tripData.state].map(dest => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Budget Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Budget per Person: ₹{tripData.budget.toLocaleString()}
              </label>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={tripData.budget}
                onChange={(e) => updateTripData('budget', parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹1,000</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Days Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Days</label>
              <div className="grid grid-cols-6 gap-2">
                {[2, 3, 4, 5, 6, 7].map(day => (
                  <button
                    key={day}
                    onClick={() => updateTripData('days', day)}
                    className={`p-3 rounded-xl font-semibold transition-all ${
                      tripData.days === day
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview Card */}
            {tripData.state && tripData.destination && (
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 mt-6 animate-fade-in">
                <h3 className="font-bold text-lg mb-3">Trip Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-purple-600" />
                    <span>{tripData.destination}, {tripData.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-green-600" />
                    <span>Budget: ₹{tripData.budget.toLocaleString()} per person</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <span>{tripData.days} days trip</span>
                  </div>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={() => tripData.state && tripData.destination && setScreen('stay-selection')}
              disabled={!tripData.state || !tripData.destination}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                tripData.state && tripData.destination
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Stay Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Stay Selection Screen
  const StaySelectionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => setScreen('input')} className="mb-6 text-purple-600 hover:text-purple-800 flex items-center gap-2">
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Stay Location</h2>
          <p className="text-gray-600 mb-6">Your roadmap will be optimized based on the stay you select</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Hotels Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hotel className="text-purple-600" />
                <h3 className="text-xl font-bold">Hotels & Hostels</h3>
              </div>
              
              <div className="space-y-4">
                {MOCK_HOTELS.map(hotel => (
                  <div
                    key={hotel.id}
                    onClick={() => {
                      updateTripData('selectedStay', hotel);
                      updateTripData('stayType', 'hotel');
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      tripData.selectedStay?.id === hotel.id && tripData.stayType === 'hotel'
                        ? 'border-purple-600 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{hotel.name}</h4>
                      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                        <Star size={14} className="text-yellow-600 fill-current" />
                        <span className="text-sm font-semibold">{hotel.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{hotel.distance}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-bold text-xl">₹{hotel.price}/night</span>
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Hosts Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="text-blue-600" />
                <h3 className="text-xl font-bold">Local Hosts</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">FREE</span>
              </div>
              
              <div className="space-y-4">
                {MOCK_HOSTS.map(host => (
                  <div
                    key={host.id}
                    onClick={() => {
                      updateTripData('selectedStay', host);
                      updateTripData('stayType', 'host');
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      tripData.selectedStay?.id === host.id && tripData.stayType === 'host'
                        ? 'border-blue-600 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg">{host.name}</h4>
                          {host.verified && (
                            <Shield size={16} className="text-green-600" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{host.bio}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                        <Star size={14} className="text-yellow-600 fill-current" />
                        <span className="text-sm font-semibold">{host.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{host.distance}</p>
                    <div className="flex gap-2 flex-wrap">
                      {host.foodIncluded && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Food Included</span>
                      )}
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Max {host.maxGuests} guest{host.maxGuests > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all">
                + Register as a Local Host
              </button>
            </div>
          </div>

          {tripData.selectedStay && (
            <button
              onClick={() => setScreen('generating')}
              className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Generate Roadmap
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Generating Animation Screen
  const GeneratingScreen = () => {
    const [step, setStep] = useState(0);
    const steps = [
      'Calculating distances from your stay...',
      'Grouping nearby tourist spots...',
      'Optimizing route to save time and money...',
      'Creating your perfect roadmap...'
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setStep(s => {
          if (s < steps.length - 1) return s + 1;
          setTimeout(() => setScreen('roadmap-options'), 1000);
          return s;
        });
      }, 1500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <div className="mb-8">
            <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Creating Your Roadmap</h2>
          <p className="text-xl opacity-90">{steps[step]}</p>
          <div className="mt-8 flex gap-2 justify-center">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i <= step ? 'bg-white' : 'bg-white bg-opacity-30'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Roadmap Options Screen
  const RoadmapOptionsScreen = () => {
    const roadmaps = [
      {
        id: 1,
        type: 'Fastest Route',
        stay: tripData.selectedStay.name,
        totalDistance: '45 km',
        estimatedCost: '₹4,200',
        placesCount: 8,
        intensity: 'Moderate',
        days: tripData.days
      },
      {
        id: 2,
        type: 'Budget Efficient',
        stay: tripData.selectedStay.name,
        totalDistance: '38 km',
        estimatedCost: '₹3,800',
        placesCount: 7,
        intensity: 'Relaxed',
        days: tripData.days
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => setScreen('stay-selection')} className="mb-6 text-purple-600 hover:text-purple-800 flex items-center gap-2">
            ← Try Different Stay
          </button>

          <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Personalized Roadmaps</h2>
          <p className="text-gray-600 mb-8">Based on your stay at {tripData.selectedStay.name}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {roadmaps.map(roadmap => (
              <div
                key={roadmap.id}
                onClick={() => {
                  setSelectedRoadmap(roadmap);
                  setScreen('itinerary');
                }}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-purple-600">{roadmap.type}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    roadmap.intensity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {roadmap.intensity}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Home className="text-gray-400" size={20} />
                    <span className="text-gray-700">{roadmap.stay}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-gray-400" size={20} />
                    <span className="text-gray-700">{roadmap.totalDistance} total travel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="text-gray-400" size={20} />
                    <span className="text-gray-700">{roadmap.estimatedCost} estimated</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-400" size={20} />
                    <span className="text-gray-700">{roadmap.placesCount} spots in {roadmap.days} days</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Budget usage</span>
                    <span className="text-sm font-semibold">{roadmap.estimatedCost} / ₹{tripData.budget.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                      style={{ width: `${(parseInt(roadmap.estimatedCost.replace(/[₹,]/g, '')) / tripData.budget) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Itinerary View Screen
  const ItineraryScreen = () => {
    const itinerary = {
      day1: [
        { time: '8:00 AM', place: MOCK_PLACES[0], distance: '2 km' },
        { time: '11:00 AM', place: MOCK_PLACES[1], distance: '1.5 km' },
        { time: '2:00 PM', place: MOCK_PLACES[2], distance: '3 km' }
      ],
      day2: [
        { time: '9:00 AM', place: MOCK_PLACES[3], distance: '5 km' },
        { time: '12:00 PM', place: MOCK_PLACES[4], distance: '2 km' },
        { time: '4:00 PM', place: MOCK_PLACES[5], distance: '4 km' }
      ],
      day3: [
        { time: '8:30 AM', place: MOCK_PLACES[6], distance: '3 km' },
        { time: '11:30 AM', place: MOCK_PLACES[7], distance: '2 km' }
      ]
    };

    const days = Object.keys(itinerary).slice(0, tripData.days);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setScreen('roadmap-options')} className="mb-6 text-purple-600 hover:text-purple-800 flex items-center gap-2">
            ← Back to Roadmaps
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Day-by-Day Itinerary</h2>
            <p className="text-gray-600 mb-6">{selectedRoadmap?.type} - Starting from {tripData.selectedStay.name}</p>

            <div className="space-y-4">
              {days.map((day, idx) => (
                <div key={day} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
                    className="w-full p-4 bg-gradient-to-r from-purple-50 to-blue-50 flex justify-between items-center hover:from-purple-100 hover:to-blue-100 transition-all"
                  >
                    <span className="font-bold text-lg">Day {idx + 1}</span>
                    <ChevronDown
                      className={`transition-transform ${expandedDay === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {expandedDay === idx && (
                    <div className="p-4 space-y-4">
                      {itinerary[day].map((item, itemIdx) => (
                        <div key={itemIdx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                            {itemIdx < itinerary[day].length - 1 && (
                              <div className="w-0.5 h-full bg-purple-200 flex-1 mt-1"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 pb-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-bold text-lg">{item.place.name}</h4>
                                  <span className="text-sm text-gray-500">{item.place.category}</span>
                                </div>
                                <span className="text-sm font-semibold text-purple-600">{item.time}</span>
                              </div>
                              <div className="flex gap-4 mt-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock size={14} />
                                  <span>{item.place.visitTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  <span>{item.distance} from stay</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign size={14} />
                                  <span>₹{item.place.entryFee}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setScreen('map-view')}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Map size={20} />
                View on Map
              </button>
              <button
                onClick={() => setScreen('expense-breakdown')}
                className="flex-1 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
              >
                <DollarSign size={20} />
                Expense Breakdown
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Map View Screen
  const MapViewScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => setScreen('itinerary')} className="mb-6 text-purple-600 hover:text-purple-800 flex items-center gap-2">
          ← Back to Itinerary
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Route Visualization</h2>
          
          {/* Map Placeholder */}
          <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl h-96 flex items-center justify-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'url("https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/77.0595,10.0889,10,0/800x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            
            <div className="relative z-10 text-center">
              <Map size={64} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-600 font-semibold">Interactive Map with Routes</p>
              <p className="text-sm text-gray-500 mt-2">
                Shows your stay location and optimized route to all tourist spots
              </p>
            </div>
          </div>

          {/* Map Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm">Your Stay</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Tourist Spots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm">Route Path</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-green-600" />
              <span className="text-sm">Landmarks</span>
            </div>
          </div>

          <button
            onClick={() => setScreen('final-review')}
            className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download Travel Pack
          </button>
        </div>
      </div>
    </div>
  );

  // Expense Breakdown Screen
  const ExpenseBreakdownScreen = () => {
    const expenses = {
      accommodation: tripData.stayType === 'hotel' ? tripData.selectedStay.price * tripData.days : 0,
      transport: 800,
      food: 1500,
      entryFees: 420
    };
    const total = Object.values(expenses).reduce((a, b) => a + b, 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setScreen('itinerary')} className="mb-6 text-purple-600 hover:text-purple-800 flex items-center gap-2">
            ← Back to Itinerary
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Expense Breakdown</h2>

            <div className="space-y-4 mb-8">
              {Object.entries(expenses).map(([category, amount]) => (
                <div key={category} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold capitalize">{category.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-lg font-bold text-purple-600">₹{amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                      style={{ width: `${(amount / total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total per Person</span>
                <span className="text-3xl font-bold text-purple-600">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Budget Remaining</span>
                <span className="font-semibold text-green-600">₹{(tripData.budget - total).toLocaleString()}</span>
              </div>
              <div className="w-full bg-white rounded-full h-3 mt-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                  style={{ width: `${(total / tripData.budget) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                {Math.round((total / tripData.budget) * 100)}% of your ₹{tripData.budget.toLocaleString()} budget used
              </p>
            </div>

            {tripData.stayType === 'host' && (
              <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <p className="text-green-700 font-semibold flex items-center gap-2">
                  <Shield size={20} />
                  You're saving ₹{(tripData.selectedStay.price || 2000) * tripData.days} by staying with a local host!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Final Review Screen
  const FinalReviewScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Trip is Ready!</h2>
          <p className="text-gray-600 mb-8">Download your complete travel pack</p>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-xl mb-4">Trip Summary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Destination</p>
                <p className="font-semibold">{tripData.destination}, {tripData.state}</p>
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-semibold">{tripData.days} days</p>
              </div>
              <div>
                <p className="text-gray-600">Stay</p>
                <p className="font-semibold">{tripData.selectedStay.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Budget</p>
                <p className="font-semibold">₹{tripData.budget.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <button className="w-full p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <Download size={20} />
              Download Complete Itinerary (PDF)
            </button>
            <button className="w-full p-4 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
              <Map size={20} />
              Download Offline Maps
            </button>
            <button className="w-full p-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Shield size={20} />
              Safety Contacts & Emergency Info
            </button>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Safety First:</strong> Share your itinerary with family. Keep emergency contacts handy. Travel smart!
            </p>
          </div>

          <button
            onClick={() => {
              setScreen('landing');
              setTripData({
                state: '',
                destination: '',
                budget: 5000,
                days: 3,
                selectedStay: null,
                stayType: null
              });
            }}
            className="w-full p-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            Plan Another Trip
          </button>
        </div>
      </div>
    </div>
  );

  // Render current screen
  return (
    <div className="font-sans">
      {screen === 'landing' && <LandingScreen />}
      {screen === 'how-it-works' && <HowItWorksScreen />}
      {screen === 'input' && <InputScreen />}
      {screen === 'stay-selection' && <StaySelectionScreen />}
      {screen === 'generating' && <GeneratingScreen />}
      {screen === 'roadmap-options' && <RoadmapOptionsScreen />}
      {screen === 'itinerary' && <ItineraryScreen />}
      {screen === 'map-view' && <MapViewScreen />}
      {screen === 'expense-breakdown' && <ExpenseBreakdownScreen />}
      {screen === 'final-review' && <FinalReviewScreen />}
    </div>
  );
}

export default App;
