# mobeen-auth

A complete authentication boilerplate installer for Next.js applications with TypeScript, Prisma, NextAuth.js, and shadcn/ui components.

## Overview

`mobeen-auth` is a CLI tool that quickly sets up a complete authentication system in your Next.js project. It installs pre-built authentication pages, API routes, components, and database schema to get you up and running with authentication in minutes.

## Features

- 🔐 Complete authentication system using NextAuth.js (beta)
- 🎨 Beautiful UI components with shadcn/ui
- 🗃️ Database integration with Prisma ORM
- 📱 Responsive login and register pages
- 🔒 Secure authentication flows with middleware
- ⚡ TypeScript support throughout
- 🚀 One-command setup
- 🛡️ Password hashing with bcryptjs
- 📧 Toast notifications with react-hot-toast
- 🎯 Ready-to-use API routes

## Prerequisites

**IMPORTANT**: Before installing `mobeen-auth`, ensure you have:

- ✅ **Next.js project with shadcn/ui setup** (Required)
- ✅ Node.js 18+ 
- ✅ TypeScript configured
- ✅ Tailwind CSS configured

### Setting up Next.js with shadcn/ui

If you haven't set up shadcn/ui in your Next.js project yet, follow these steps:

1. Create a new Next.js project:
```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
```

2. Initialize shadcn/ui:
```bash
npx shadcn@latest init
```

3. Install required shadcn/ui components:
```bash
npx shadcn@latest add button input label card form
```

## Installation & Setup

### Option 1: NPX (Recommended)
```bash
npx mobeen-auth
```

### Option 2: Global Install
```bash
npm install -g mobeen-auth
mobeen-auth
```

## What Gets Installed

When you run `mobeen-auth`, it will set up the following structure in your project:

```
your-project/
├── prisma/
│   └── schema.prisma          # User, Account, Session models
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   │   └── route.ts   # NextAuth API route
│   │   │   └── register/
│   │   │       └── route.ts   # User registration API
│   │   ├── login/
│   │   │   └── page.tsx       # Login page
│   │   └── register/
│   │       └── page.tsx       # Register page
│   ├── components/
│   │   ├── login-form.tsx     # Login form component
│   │   └── register-form.tsx  # Register form component
│   └── lib/
│       ├── auth.ts           # NextAuth configuration
│       ├── middleware.ts     # Auth middleware
│       ├── password.ts       # Password utilities
│       └── prisma.ts         # Prisma client
└── .env.example              # Environment variables template
```

## Dependencies Installed

The installer will automatically install these packages:

**Runtime Dependencies:**
- `next-auth@beta` - Authentication for Next.js
- `@auth/prisma-adapter` - Prisma adapter for NextAuth
- `@prisma/client` - Prisma database client
- `bcryptjs` - Password hashing
- `react-icons` - Icon components
- `axios` - HTTP client
- `react-hot-toast` - Toast notifications

**Development Dependencies:**
- `prisma` - Database toolkit
- `typescript` - TypeScript language
- `@types/node` - Node.js types
- `@types/react` - React types
- `@types/bcryptjs` - bcryptjs types

## Quick Start

1. **Ensure Prerequisites**: Make sure your Next.js project has shadcn/ui configured

2. **Run the installer**:
```bash
npx mobeen-auth
```

3. **Configure environment variables**:
```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL="your-database-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. **Set up your database**:
```bash
# Push the schema to your database
npx prisma db push

# Or run migrations
npx prisma migrate dev
```

5. **Start your development server**:
```bash
npm run dev
```

6. **Test the authentication**:
   - Visit `/login` for the login page
   - Visit `/register` for the registration page

## File Structure Explained

### API Routes
- `api/auth/[...nextauth]/route.ts` - Handles all NextAuth.js authentication
- `api/register/route.ts` - Custom registration endpoint with password hashing

### Pages
- `login/page.tsx` - Login page with form validation
- `register/page.tsx` - Registration page with form validation

### Components
- `login-form.tsx` - Reusable login form component
- `register-form.tsx` - Reusable registration form component

### Library Files
- `lib/auth.ts` - NextAuth.js configuration
- `lib/middleware.ts` - Authentication middleware
- `lib/password.ts` - Password hashing utilities
- `lib/prisma.ts` - Prisma client configuration

### Database Schema
- `prisma/schema.prisma` - User authentication models compatible with NextAuth.js

## Configuration

### Environment Variables

The installer creates a `.env.example` file with all required variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Customizing OAuth Providers

The authentication system supports multiple OAuth providers. Edit `src/lib/auth.ts` to add or remove providers:

```typescript
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

// Add providers in the auth configuration
providers: [
  Google,
  GitHub,
]
```

## Usage

After installation, you can:

1. **Navigate to authentication pages**:
   - `/login` - User login
   - `/register` - User registration

2. **Use components in your pages**:
```tsx
import { LoginForm } from '@/components/login-form'
import { RegisterForm } from '@/components/register-form'

export default function CustomAuthPage() {
  return (
    <div className="container mx-auto px-4">
      <LoginForm />
    </div>
  )
}
```

3. **Protect routes with middleware**:
The installed middleware automatically protects routes. Configure protected paths in `src/lib/middleware.ts`.

## Database Support

`mobeen-auth` works with any database supported by Prisma:
- PostgreSQL (recommended)
- MySQL
- SQLite
- MongoDB
- SQL Server

## Troubleshooting

### Common Issues
1. **"Module not found" errors**: Ensure all shadcn/ui components are installed
2. **Database connection errors**: Check your `DATABASE_URL` in `.env.local`
3. **NextAuth errors**: Verify `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are set

### Getting Help

- Check that all prerequisites are met
- Ensure environment variables are properly configured
- Verify database connection and schema

## What's Included

- ✅ Complete user authentication flow
- ✅ Password-based and OAuth authentication
- ✅ User registration with email validation
- ✅ Responsive UI components
- ✅ Database models and migrations
- ✅ TypeScript throughout
- ✅ Error handling and validation
- ✅ Toast notifications
- ✅ Route protection middleware

## Requirements

- Next.js 15+
- TypeScript
- Tailwind CSS
- shadcn/ui components
- A database (PostgreSQL, MySQL, SQLite, etc.)

## Version Compatibility

- Next.js: 15.x
- NextAuth.js: 5.0.0-beta.x
- Prisma: 5.x
- React: 18.x

## License

MIT License

## Support

For issues and questions:
- Create an issue on the GitHub repository
- Check the documentation for common solutions
- Ensure all prerequisites are properly configured

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests to improve the authentication boilerplate.

---

**Note**: This package requires a Next.js project with shadcn/ui already configured. The installer will not work without proper shadcn/ui setup.