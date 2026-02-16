# Wiki Template - React + NestJS + Supabase

A modern, full-stack wiki application built with React, NestJS, and Supabase, deployable on Vercel.

## ✨ Features

- 📝 **Full CRUD Operations** - Create, read, update, and delete wiki pages
- 🔍 **Full-Text Search** - Search across all page titles and content
- 👥 **User Authentication** - Sign up and sign in with Supabase Auth
- 🎨 **Markdown Support** - Write content in Markdown with live preview
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🚀 **Easy Deployment** - One-click deploy to Vercel
- 🎯 **Modern UI** - Clean interface built with Tailwind CSS

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Routing**: React Router v6
- **Markdown**: react-markdown
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A [Supabase](https://supabase.com) account (free tier works!)
- A [Vercel](https://vercel.com) account (optional, for deployment)
- Git installed

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd wiki-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be ready

#### Run the Database Migration

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste it into the SQL Editor and run it
4. This will create the `pages` table and all necessary functions

#### Get Your API Keys

1. Go to Settings > API in your Supabase dashboard
2. Copy the **Project URL** and **anon/public key**

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
wiki-template/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Header.tsx     # Navigation header
│   │   └── Layout.tsx     # Main layout wrapper
│   ├── pages/             # Page components
│   │   ├── HomePage.tsx   # List all pages
│   │   ├── PageView.tsx   # View single page
│   │   ├── PageEditor.tsx # Create/edit pages
│   │   ├── SearchPage.tsx # Search results
│   │   └── AuthPage.tsx   # Sign in/up
│   ├── lib/               # Utilities
│   │   ├── supabase.ts   # Supabase client
│   │   └── api.ts        # API functions
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── App.tsx           # Main app with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── supabase/
│   └── migrations/       # Database migrations
│       └── 001_initial_schema.sql
├── public/               # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── vercel.json          # Vercel deployment config
└── package.json         # Dependencies
```

## 🗄 Database Schema

### Pages Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| slug | TEXT | URL-friendly identifier (unique) |
| title | TEXT | Page title |
| content | TEXT | Markdown content |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| author_id | UUID | Reference to auth.users |
| is_published | BOOLEAN | Publication status |

### Features

- **Row Level Security (RLS)** enabled for data protection
- **Full-text search** with PostgreSQL's built-in capabilities
- **Automatic timestamp updates** via triggers
- **User authentication** handled by Supabase Auth

## 🔌 API Functions

The app uses Supabase client directly, but the main operations are:

- `getPages()` - Fetch all published pages
- `getPage(slug)` - Fetch a single page by slug
- `createPage(data)` - Create a new page
- `updatePage(slug, data)` - Update an existing page
- `deletePage(slug)` - Delete a page
- `searchPages(query)` - Full-text search

## 🌐 Deployment to Vercel

### Method 1: Via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables when prompted
```

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    },
  },
}
```

### Add New Features

The codebase is structured for easy extension:

1. Add new pages in `src/pages/`
2. Add routes in `src/App.tsx`
3. Create reusable components in `src/components/`
4. Add API functions in `src/lib/api.ts`

## 🔒 Security Features

- Row Level Security (RLS) on all tables
- User authentication via Supabase Auth
- CSRF protection
- SQL injection prevention via parameterized queries
- XSS protection via React's built-in escaping

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Issues

- Verify your `.env.local` has correct values
- Check that your Supabase project is active
- Ensure the migration was run successfully

### Pages Not Showing

- Check browser console for errors
- Verify RLS policies are set up correctly
- Ensure you're signed in if required

## 📝 License

MIT License - feel free to use this for any project!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you have questions or need help, please open an issue on GitHub.

---

Built with ❤️ using React, Supabase, and Vercel
