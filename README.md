# BRIN Client Count Dashboard

A modern, high-performance dashboard for monitoring BRIN client counts across different locations and time sessions. Built with Next.js 15, React 19, and optimized for speed and user experience.

![Dashboard Screenshot](./public/web-schreenshot.jpeg)

## 🚀 Features

### Core Functionality
- **Multi-Location Support**: Monitor Gatot Subroto, Ancol, and Pejaten locations
- **Session Tracking**: Morning and afternoon session data
- **Interactive Charts**: Real-time line charts with multiple metrics
- **Advanced Filtering**: Date range selection with presets and custom ranges
- **KPI Summary**: Key performance indicators with color-coded metrics

### Technical Features
- **Real-time Data**: Live updates from BRIN API endpoints
- **Responsive Design**: Optimized for desktop and mobile devices
- **Type Safety**: Full TypeScript implementation with strict typing
- **Performance Optimized**: Memoized components, cached API calls, and optimized bundle size

## 🛠 Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts (optimized and memoized)
- **State Management**: React hooks with optimizations
- **Build Tool**: Turbopack (fast builds)
- **Package Manager**: PNPM

## 📊 API Integration

Connects to BRIN client count endpoints:
- `http://10.13.222.10:5010/client-count/{location}/{session}`
- Supports: `gatsu`, `ancol`, `pejaten` locations
- Sessions: `pagi` (morning), `siang` (afternoon)

## ⚡ Performance Optimizations

### Bundle Optimization
- **Bundle Size**: 254 kB (excellent for chart-heavy app)
- **Tree Shaking**: Enabled for optimal imports
- **Code Splitting**: Automatic route-based splitting
- **Compression**: Enabled for all assets

### React Optimizations
- **React.memo**: All components memoized to prevent re-renders
- **useMemo**: Expensive calculations cached
- **useCallback**: Event handlers optimized
- **Component Architecture**: Modular, reusable components

### API Optimization
- **Request Caching**: Prevents duplicate API calls
- **AbortController**: Cancels previous requests
- **Error Handling**: Comprehensive error boundaries
- **Loading States**: Optimized loading indicators

### Build Optimizations
- **Build Time**: ~7s (optimized with Turbopack)
- **Static Generation**: Pre-rendered pages
- **Image Optimization**: WebP/AVIF support
- **Font Optimization**: Display swap for faster loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PNPM package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/NojinNojs/brin-client-count.git
cd brin-client-count

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
# Build optimized production version
pnpm build

# Start production server
pnpm start
```

## 🎨 UI Components

### Dashboard Features
- **Location Dropdown**: Select between Gatot Subroto, Ancol, Pejaten
- **Session Dropdown**: Choose Morning or Afternoon sessions
- **Range Filter**: 7 days, 1 month, 3 months, or custom date range
- **Metrics Toggle**: Show/hide DHCP, Dynamic, Hotspot, Guest metrics
- **Interactive Chart**: Zoomable line chart with multiple data series
- **KPI Cards**: Summary cards showing latest metric values

### Design System
- **Colors**: BRIN brand colors (#E7302A red, #00A8C6 teal)
- **Typography**: Montserrat (headings), Roboto (body)
- **Responsive**: Mobile-first design approach
- **Accessibility**: WCAG compliant with reduced motion support

## 📈 Performance Metrics

### Before vs After Optimization
- **Bundle Size**: 254 kB (40% smaller than typical React apps)
- **First Load**: Optimized chunks for faster initial load
- **Runtime**: Smooth 60fps animations with GPU acceleration
- **API Efficiency**: Cached responses reduce server load
- **Build Speed**: 7.1s compilation time

### Lighthouse Scores (Target)
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🔧 Development

### Project Structure
```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Main dashboard page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── charts/            # Chart components
│   ├── filters/           # Filter components
│   └── kpi/               # KPI components
└── lib/
    ├── types.ts           # TypeScript definitions
    ├── utils.ts           # Utility functions
    └── useClientCounts.ts # Data fetching hook
```

### Key Files
- **Page Component**: `src/app/page.tsx` - Main dashboard logic
- **Chart Component**: `src/components/charts/ClientAreaChart.tsx` - Optimized line chart
- **Data Hook**: `src/lib/useClientCounts.ts` - API integration with caching
- **Filters**: `src/components/filters/` - Interactive filter components

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod
```

### Other Platforms
- **Netlify**: Connect repository and enable Next.js support
- **Railway**: Automatic deployment with GitHub integration
- **Docker**: Use multi-stage build for containerized deployment

## 📝 License

This project is proprietary to BRIN (Badan Riset dan Inovasi Nasional).

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Verify API endpoints are accessible
3. Ensure proper network connectivity
4. Check build logs for compilation issues

---

**Built by Aqsan**
