# ClubNexus - Centralized Platform for College Technical Clubs

![ClubNexus Banner](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-3.0-green?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38b2ac?style=for-the-badge&logo=tailwind-css)

ClubNexus is a comprehensive platform designed to centralize activities, projects, and competitions for college technical clubs. It provides a unified ecosystem where students can discover events, participate in challenges, showcase projects, track leaderboards, and collaborate with peers.

## 🚀 Features

### 🏠 **Homepage & Dashboard**
- Interactive hero banner with animated statistics
- Real-time quick stats (active users, events, challenges, projects)
- Upcoming events strip with countdown timers
- Featured challenges and projects carousel
- Top leaderboard with animated podium visualization
- Announcement ticker for important updates

### 👥 **Team Management**
- Team member directory with filtering by domain and batch year
- Interactive member cards with detailed profiles
- Modal view for member details (skills, projects, contact)
- Domain-based categorization (AI/ML, Web Dev, Cybersecurity, etc.)

### 📅 **Events System**
- Comprehensive events listing with search and filtering
- Event detail pages with registration forms
- Event schedule with timeline visualization
- Speaker profiles and session details
- FAQ sections for event information
- Registration confirmation with QR codes

### 🏆 **Challenges & Competitions**
- Challenge listing with category filtering
- Detailed challenge pages with requirements and scoring rules
- Submission form with file upload support
- Per-challenge leaderboard with real-time updates
- Resource library with downloadable materials
- Countdown timers for submission deadlines

### 💼 **Projects Showcase**
- Project gallery with search and filtering capabilities
- Project detail pages with extended descriptions
- Interactive like system with animations
- Tech stack visualization with color-coded badges
- Screenshot galleries with lightbox functionality
- Team member attribution and collaboration features

### 🖼️ **Media Gallery**
- Album-based gallery organization
- Masonry grid layout for optimal image display
- Lightbox with keyboard navigation (← → ESC)
- Album statistics (image count, views, likes)
- Responsive image loading with blur placeholders

### 🏅 **Leaderboard & Analytics**
- Global leaderboard with real-time ranking updates
- Top 3 podium visualization with crown animations
- Time-based filtering (daily, weekly, monthly, all-time)
- Badge system with achievement explanations
- Personal dashboard with score progress charts
- Activity heatmap for engagement tracking
- Points breakdown by category

### 👑 **Admin Panel**
- Comprehensive admin dashboard with statistics
- User management with role-based permissions
- Pending submissions review and approval
- Audit log for tracking platform activities
- Content moderation tools
- System health monitoring

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - PostgreSQL database with real-time
- **Row Level Security (RLS)** - Data protection
- **Authentication** - Email/password & OAuth
- **Storage** - File uploads and media management

### Development Tools
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **Vercel** - Deployment platform

## 📁 Project Structure

```
clubnexus/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Admin dashboard
│   │   ├── challenges/         # Challenge pages
│   │   ├── dashboard/          # Personal dashboard
│   │   ├── events/             # Event pages
│   │   ├── gallery/            # Media gallery
│   │   ├── leaderboard/        # Leaderboard pages
│   │   ├── projects/           # Project showcase
│   │   ├── team/               # Team directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable components
│   │   ├── challenges/         # Challenge components
│   │   ├── events/             # Event components
│   │   ├── home/               # Homepage components
│   │   ├── layout/             # Layout components
│   │   ├── projects/           # Project components
│   │   ├── team/               # Team components
│   │   └── ui/                 # UI components
│   ├── lib/                    # Utility libraries
│   │   ├── supabase/           # Supabase clients
│   │   ├── constants.ts        # App constants
│   │   └── utils.ts            # Helper functions
│   ├── types/                  # TypeScript definitions
│   └── middleware.ts           # Authentication middleware
├── supabase/
│   └── migrations/             # Database migrations
├── public/                     # Static assets
└── package.json                # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm/bun
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clubnexus
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL migration from `supabase/migrations/001_initial_schema.sql`
   - Enable Row Level Security (RLS) policies
   - Set up storage buckets for file uploads

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:

- **profiles** - User profiles with role-based permissions
- **teams** - Team information and member associations
- **events** - Event details, schedules, and registrations
- **challenges** - Competition challenges with scoring rules
- **submissions** - User submissions for challenges
- **projects** - Project showcase with like functionality
- **gallery_albums** - Media gallery organization
- **gallery_images** - Individual images with metadata
- **audit_logs** - System activity tracking

Full schema details available in `supabase/migrations/001_initial_schema.sql`

## 🎨 Design System

### Color Palette (Dark Theme)
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Violet)
- **Accent**: `#10b981` (Emerald)
- **Background**: `#0f172a` (Dark Blue)
- **Surface**: `#1e293b` (Slate)
- **Text**: `#f1f5f9` (Light Gray)
- **Border**: `#334155` (Gray)

### Typography
- **Primary Font**: Inter (via `next/font`)
- **Code Font**: Geist Mono
- **Heading Weights**: 600-700
- **Body Weights**: 400-500

### Animations
- **Page Transitions**: Framer Motion page transitions
- **Staggered Cards**: Sequential card animations
- **Hover Effects**: Lift, scale, and glow effects
- **Loading States**: Skeleton loaders with pulse animations

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Tailwind CSS utility classes
- Implement responsive design patterns
- Write reusable components

## 📱 Responsive Design

The application is fully responsive across all device sizes:

- **Mobile (< 640px)**: Single column layout, hamburger menu
- **Tablet (640px - 1024px)**: Two column grids, adjusted spacing
- **Desktop (> 1024px)**: Full multi-column layouts, sidebars

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level permission control
- **Authentication Middleware**: Protected routes and API endpoints
- **Input Validation**: Client and server-side validation
- **File Upload Security**: Type and size restrictions
- **Audit Logging**: Comprehensive activity tracking

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables**
   Add the same environment variables from `.env.local` to Vercel project settings.

4. **Deploy**
   Click "Deploy" and Vercel will build and deploy your application.

### Supabase Deployment

1. **Deploy Database Changes**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Link your project
   supabase link --project-ref your-project-ref
   
   # Push migrations
   supabase db push
   ```

2. **Set up Production Environment**
   - Create production Supabase project
   - Update environment variables with production keys
   - Configure custom domains if needed

## 📈 Performance Optimizations

- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Component and image lazy loading
- **Caching**: Static generation and ISR for fast page loads
- **Bundle Analysis**: Regular bundle size monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Supabase** for the excellent backend platform
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for the animation library
- **Recharts** for data visualization components

## 📞 Support

For support, please:
1. Check the [documentation](#)
2. Open an issue in the GitHub repository
3. Contact the development team

---

**Built with ❤️ for college technical clubs worldwide**
