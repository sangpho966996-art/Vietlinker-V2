# VietLinker Development - Next Session Prompt

## 🎯 SESSION CONTEXT
Copy and paste this prompt to Claude Code in your next session:

---

**CONTEXT:** I'm continuing development on VietLinker - a Vietnamese Marketplace & Services platform. This is a 12-week project currently in Phase 1 completion.

## 📋 PROJECT STATUS

**Current Progress:** Phase 1 Foundation - 100% COMPLETE ✅
- Database schema with 13 tables ✅ 
- NextAuth + Google OAuth authentication ✅
- Project structure with TypeScript types ✅
- UI component library (Button, Input, Card, etc.) ✅
- Environment configuration template ✅

**Tech Stack:** Next.js 15, TypeScript, Supabase, NextAuth, Tailwind CSS, Radix UI

**Project Location:** `C:\Users\willi\vietlinker-web\vietlinker-v2\apps\web\`

## 📖 IMPORTANT FILES TO READ FIRST

1. **Read the development log:** `C:\Users\willi\vietlinker-web\vietlinker-v2\DEVELOPMENT_LOG.md` - Contains complete project history and progress
2. **Database schema:** `apps/web/database/schema.sql` - Complete database structure
3. **Current package.json:** `apps/web/package.json` - Installed dependencies

## 🚀 NEXT PHASE GOALS

**PHASE 2: MARKETPLACE CORE (Week 3-5)**
Priority tasks for this session:

### Week 3: User Management (START HERE)
1. **User Profile Management**
   - Create profile pages (`/profile/[id]`)
   - Profile editing forms
   - Avatar upload functionality
   - Business profile vs personal profile

2. **User Dashboard** 
   - Dashboard layout (`/dashboard`)
   - My listings management
   - Profile stats and analytics
   - Account settings

### Week 4: Listing System
3. **Create Listings**
   - Multi-category listing form
   - Image upload with multiple files
   - Location selection (Google Maps integration)
   - Draft vs published listings

4. **Browse Listings**
   - Category-based browsing
   - Search functionality
   - Filter system (price, location, condition)
   - Pagination

### Week 5: Core Interactions  
5. **Listing Details**
   - Individual listing pages
   - Contact seller functionality
   - Image galleries
   - Related listings

6. **Basic Messaging**
   - Simple inquiry system
   - Message threading
   - Email notifications

## 🎯 IMMEDIATE TODO FOR THIS SESSION

**Start with User Profile Management:**

1. **Create User Profile Pages**
   - `src/app/profile/[id]/page.tsx` - Public profile view
   - `src/app/profile/edit/page.tsx` - Edit profile form
   - Profile components in `src/components/features/profile/`

2. **Create User Dashboard**
   - `src/app/dashboard/page.tsx` - Main dashboard
   - `src/app/dashboard/listings/page.tsx` - Manage listings
   - `src/app/dashboard/settings/page.tsx` - Account settings

3. **Build Profile Forms**
   - Personal profile form
   - Business profile form  
   - Avatar upload component
   - Form validation

## ⚠️ IMPORTANT NOTES

- **Authentication is already working** - use `useAuth()` hook from `src/contexts/AuthContext.tsx`
- **Database tables are ready** - use helper functions from `src/lib/supabase.ts`
- **UI components available** - Button, Input, Card, etc. in `src/components/ui/`
- **Continue using TodoWrite tool** to track progress
- **Update DEVELOPMENT_LOG.md** when completing features

## 🔧 ENVIRONMENT SETUP REMINDER

If needed for testing:
1. Create Supabase project and run `database/schema.sql`
2. Set up Google OAuth credentials  
3. Copy `.env.example` to `.env.local` with real values
4. Run `npm run dev` to start development

## 💡 DEVELOPMENT APPROACH

- Focus on functionality over perfect styling initially
- Use existing UI components from the library
- Implement TypeScript properly with database types
- Test authentication flows
- Keep Vietnamese language support in mind

---

**TASK:** Continue with Phase 2 - Start with User Profile Management. Create profile pages, dashboard, and profile editing functionality. Use the TodoWrite tool to track progress and update the development log as you complete features.

Ready to continue building VietLinker! 🚀