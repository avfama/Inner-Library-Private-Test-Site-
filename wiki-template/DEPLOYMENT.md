# Deployment Guide

## Quick Start

This guide will walk you through deploying your wiki to Vercel.

## Prerequisites

1. A Supabase account with a project created
2. A Vercel account
3. Git repository with your code

## Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Run the migration
5. Go to Settings → API and copy:
   - Project URL
   - `anon` public key
   - `service_role` key (keep this secret!)

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build:all`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm run install:all`

5. Add Environment Variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_API_URL=https://your-project.vercel.app/api
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_service_role_key
   ```

6. Click "Deploy"

## Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `VITE_API_URL` environment variable to use your custom domain

## Troubleshooting

### Build Fails

- Make sure all dependencies are listed in package.json
- Check that TypeScript compiles locally: `npm run build`
- Verify environment variables are set correctly

### API Not Working

- Ensure `VITE_API_URL` points to your Vercel deployment
- Check Supabase credentials are correct
- Verify CORS is enabled in backend (it should be by default)

### Database Connection Issues

- Verify Supabase URL and keys
- Check RLS policies in Supabase
- Ensure migrations have been run

## Production Checklist

- [ ] Database migrations run successfully
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] Authentication working
- [ ] Test create/read/update/delete operations
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

## Monitoring

- Use Vercel Analytics for performance monitoring
- Check Vercel logs for errors
- Monitor Supabase database usage

## Updating Your Deployment

```bash
# Make changes to your code
git add .
git commit -m "Your changes"
git push

# Vercel will automatically deploy on push
```

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables
4. Check Supabase logs
