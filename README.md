# 🌤️ AppNation - Weather Application

A modern and user-friendly weather application. Built with real-time weather data, 5-day forecast, animated weather effects, and responsive design.

Live project link: [AppNation](https://app-nation.vercel.app/)

## ✨ Features

- 🌍 **Real-time Weather**: Live weather information
- 📅 **5-Day Forecast**: Detailed weather prediction
- 🎨 **Animated Effects**: SVG-based weather animations
- 📱 **Responsive Design**: Mobile, tablet and desktop compatible
- 🌡️ **Unit Conversion**: Celsius/Fahrenheit support
- 📍 **Search History**: Recently searched cities
- 🎯 **Modern UI/UX**: Modern design with Tailwind CSS
- ⚡ **Fast Performance**: Next.js 14 and optimizations

## 🛠️ Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **API**: OpenWeatherMap API
- **Animations**: CSS Animations + SVG Icons
- **Package Manager**: pnpm

## 📁 Project Structure

```
AppNation/
├── public/
│   ├── weather-icons.svg     # Weather SVG icons
│   └── ...                   # Other static files
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── weather/
│   │   │       └── route.ts  # Weather API endpoint
│   │   ├── globals.css       # Global styles and animations
│   │   ├── layout.tsx        # Main layout
│   │   └── page.tsx          # Main page
│   ├── components/
│   │   ├── ForecastCard.tsx  # Forecast card
│   │   ├── QueryProvider.tsx # Redux provider
│   │   ├── SearchBar.tsx     # Search bar
│   │   ├── UnitToggle.tsx    # Unit converter
│   │   ├── WeatherAnimations.tsx # Weather animations
│   │   └── WeatherCard.tsx   # Weather card
│   ├── hooks/
│   │   └── useWeather.ts     # Weather hook
│   ├── store/
│   │   ├── hooks.ts          # Redux hooks
│   │   ├── provider.tsx      # Redux provider
│   │   ├── store.ts          # Redux store
│   │   └── weatherSlice.ts   # Weather state management
│   └── types/
│       └── weather.ts        # TypeScript types
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## 🚀 Installation

### Requirements

- Node.js 18+
- pnpm (recommended) or npm/yarn
- OpenWeatherMap API key

### 1. Clone the Project

```bash
git clone <repository-url>
cd AppNation
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Set Up API Key

Get a free API key from [OpenWeatherMap](https://openweathermap.org/api) and create a `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Start Development Server

```bash
pnpm dev
# or
npm run dev
```

The application will run at [http://localhost:3000](http://localhost:3000).

## 🔑 Getting API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Get your API key from the API Keys section
4. Add it to your `.env.local` file

**Note**: New API keys become active within 2 hours.

## 📱 Usage

1. **Search**: Type a city name and press Enter
2. **Unit Conversion**: Switch between Celsius/Fahrenheit
3. **History**: Recently searched cities are automatically saved
4. **Animations**: Automatic animations based on weather conditions

## 🎨 Animations

The application includes special animations for the following weather conditions:

- ☀️ **Sunny**: Rotating sun icons
- ☁️ **Cloudy**: Floating cloud icons
- 🌧️ **Rainy**: Falling raindrops
- ❄️ **Snowy**: Rotating snowflakes
- 💨 **Windy**: Flying wind icons

## 🔧 Development

### Adding New Features

1. Create component in `src/components/`
2. Define TypeScript types in `src/types/`
3. Manage Redux state in `src/store/`
4. Create API endpoints in `src/app/api/`

### Style Changes

Uses Tailwind CSS. Custom animations are defined in `src/app/globals.css`.

### API Changes

OpenWeatherMap API integration is in `src/app/api/weather/route.ts`.

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
```

### Other Platforms

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) - Weather API
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management

## 📞 Contact

You can open an issue for questions or contact us.

---

⭐ Don't forget to star this project if you liked it!
