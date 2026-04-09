# ClubNexus Deployment Guide

This guide provides step-by-step instructions for deploying ClubNexus to production environments.

## 🚀 Quick Deployment (Vercel + Supabase)

### Prerequisites
- [Vercel Account](https://vercel.com/signup)
- [Supabase Account](https://supabase.com/dashboard)
- [GitHub Account](https://github.com)
- Node.js 18+ installed locally

## 📦 1. Supabase Setup

### 1.1 Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Enter project details:
   - **Name**: `clubnexus-production`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
4. Click "Create new project" (takes 1-2 minutes)

### 1.2 Configure Database
1. In your Supabase project, go to **SQL Editor**
2. Copy the entire content from `supabase/migrations/001_initial_schema.sql`
3. Paste and run the SQL to create all tables and policies
4. Verify tables are created in **Table Editor**

### 1.3 Set Up Authentication
1. Go to **Authentication** → **Providers**
2. Enable Email/Password authentication
3. (Optional) Configure OAuth providers (Google, GitHub)
4. Go to **Authentication** → **URL Configuration**
   - Set **Site URL**: `https://your-domain.vercel.app`
   - Set **Redirect URLs**: `https://your-domain.vercel.app/**`

### 1.4 Configure Storage
1. Go to **Storage** → **Create Bucket**
2. Create buckets:
   - `project-screenshots` (public)
   - `submission-files` (private)
   - `gallery-images` (public)
3. Set appropriate RLS policies for each bucket

### 1.5 Get API Keys
1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **service_role** (SUPABASE_SERVICE_ROLE_KEY) - Keep this secret!

## 🌐 2. Vercel Deployment

### 2.1 Push to GitHub
```bash
# Initialize git if not already
git init
git add .
git commit -m "Initial commit: ClubNexus platform"
git branch -M main
git remote add origin https://github.com/your-username/clubnexus.git
git push -u origin main
```

### 2.2 Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NODE_ENV=production
   ```
6. Click "Deploy"

### 2.3 Configure Custom Domain (Optional)
1. In Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Supabase Site URL with new domain

## 🔧 3. Environment Configuration

### 3.1 Local Development
Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_local_service_role_key
```

### 3.2 Production Environment
Update Vercel environment variables after deployment:
1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add/update variables:
   - `NEXT_PUBLIC_SUPABASE_URL` (production Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (production anon key)
   - `SUPABASE_SERVICE_ROLE_KEY` (production service role key)

## 📊 4. Database Migrations

### 4.1 Using Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push

# Generate types
supabase gen types typescript --project-id your-project-id > src/types/supabase.ts
```

### 4.2 Manual Migration Updates
1. Create new migration file: `supabase/migrations/002_feature_update.sql`
2. Apply via Supabase Dashboard SQL Editor
3. Test changes in staging environment first

## 🛡️ 5. Security Configuration

### 5.1 Row Level Security (RLS)
- All tables have RLS enabled by default
- Review and update policies in `001_initial_schema.sql`
- Test policies with different user roles

### 5.2 CORS Configuration
In Supabase Dashboard → **Settings** → **API**:
- Add your Vercel domain to CORS origins
- Example: `https://your-domain.vercel.app`

### 5.3 Rate Limiting
Consider implementing:
- Vercel rate limiting via Edge Functions
- Supabase request quotas
- API key rotation for service roles

## 📈 6. Monitoring & Analytics

### 6.1 Vercel Analytics
1. Enable Vercel Analytics in project settings
2. Monitor performance metrics
3. Set up alerts for errors

### 6.2 Supabase Monitoring
1. Use Supabase Dashboard → **Reports**
2. Monitor database performance
3. Set up alerts for high resource usage

### 6.3 Error Tracking
Recommended services:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay
- [PostHog](https://posthog.com) for product analytics

## 🔄 7. Continuous Deployment

### 7.1 GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 7.2 Database Backup Strategy
1. Enable automatic backups in Supabase
2. Frequency: Daily
3. Retention: 7 days minimum
4. Test restoration process quarterly

## 🧪 8. Testing Deployment

### 8.1 Pre-Deployment Checklist
- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] RLS policies tested
- [ ] Storage buckets configured
- [ ] Custom domain verified (if using)
- [ ] SSL certificates valid

### 8.2 Post-Deployment Tests
1. **Authentication**: Sign up, login, logout
2. **CRUD Operations**: Create, read, update, delete data
3. **File Uploads**: Test image and file uploads
4. **Real-time Features**: Verify leaderboard updates
5. **Performance**: Check page load times
6. **Mobile Responsiveness**: Test on different devices

## 🚨 9. Troubleshooting

### Common Issues

#### 9.1 Authentication Errors
- Verify Supabase URL and keys
- Check CORS configuration
- Ensure redirect URLs are correct

#### 9.2 Database Connection Issues
- Verify database is running
- Check network connectivity
- Review RLS policies

#### 9.3 Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs in Vercel

#### 9.4 Image Optimization Errors
- Check `next.config.ts` remote patterns
- Verify image domains are allowed
- Ensure proper image formats

### Getting Help
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- Create issue in GitHub repository

## 📚 10. Maintenance

### Regular Tasks
- **Weekly**: Review error logs, monitor performance
- **Monthly**: Update dependencies, backup verification
- **Quarterly**: Security audit, performance optimization
- **Annually**: Major version updates, architecture review

### Scaling Considerations
- Monitor Supabase usage limits
- Implement database indexing for large datasets
- Consider CDN for static assets
- Evaluate need for read replicas

---

## 🎉 Deployment Complete!

Your ClubNexus platform is now live! Share the URL with your college technical clubs and start managing events, challenges, and projects in one centralized platform.

### Next Steps
1. Create admin accounts for club organizers
2. Set up initial events and challenges
3. Invite team members to join
4. Monitor usage and gather feedback
5. Plan feature enhancements based on user needs

### Support
For additional help, refer to:
- [ClubNexus Documentation](https://github.com/your-username/clubnexus#readme)
- [Supabase Community](https://github.com/supabase/supabase)
- [Vercel Community](https://vercel.com/community)