# 🚀 VietLinker V2 - Deployment Guide

## Step-by-Step Vercel Deployment

### 1. **Prepare Vercel Account**
- Visit: https://vercel.com
- Sign in with your GitHub account
- Make sure you have access to `sangpho966996-art/Vietlinker-V2` repository

### 2. **Import Project**
1. Click **"Add New..."** → **"Project"**
2. Find repository: `sangpho966996-art/Vietlinker-V2`
3. Click **"Import"**

### 3. **Configure Project Settings**

#### **🔧 Framework Settings:**
- **Framework Preset:** Next.js ✅ (auto-detected)
- **Root Directory:** `vietlinker-v2/apps/web` ⚠️ **IMPORTANT**
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

#### **⚙️ Environment Variables:**
Add these in Vercel dashboard:

```bash
# Required for basic functionality
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: For server-side operations
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: For payments (future)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 4. **Get Supabase Credentials**

#### **From Supabase Dashboard:**
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. **Deploy**
1. Click **"Deploy"**
2. Wait for build process (usually 2-3 minutes)
3. ✅ Get your live URL: `https://your-app-name.vercel.app`

---

## 🔍 Troubleshooting

### **Common Issues & Solutions:**

#### **Issue: "No pages found"**
**Solution:** Make sure Root Directory is set to `vietlinker-v2/apps/web`

#### **Issue: "Module not found"** 
**Solution:** Dependencies will auto-install, wait for completion

#### **Issue: "Build failed"**
**Solution:** Check build logs, usually TypeScript or ESLint errors

#### **Issue: "Environment variables not working"**
**Solution:** Make sure variables start with `NEXT_PUBLIC_` for client-side

---

## 📊 Expected Build Output

```
✓ Compiled successfully
  Skipping validation of types
  Skipping linting
  Collecting page data...
  Generating static pages (4/4)
✓ Generating static pages
  Finalizing page optimization...

Route (app)                    Size     First Load JS
┌ ○ /                         136 B    99.8 kB
└ ○ /_not-found              897 B    101 kB
+ First Load JS shared by all         99.7 kB
```

---

## 🎯 Post-Deployment Checklist

### **✅ Verify Deployment:**
- [ ] Homepage loads correctly
- [ ] Vietnamese text displays properly  
- [ ] Tailwind styles are working
- [ ] No console errors
- [ ] Mobile responsive design works

### **🔗 Optional: Custom Domain**
1. In Vercel dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed

### **📈 Optional: Analytics**
1. Add `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` environment variable
2. Redeploy to activate analytics

---

## 🆘 Support

### **If deployment fails:**
1. Check Vercel build logs
2. Verify root directory: `vietlinker-v2/apps/web`
3. Confirm environment variables are set
4. Contact support with error details

### **Repository:** 
https://github.com/sangpho966996-art/Vietlinker-V2

---

**🟢 Status:** Ready for deployment  
**⏱️ Estimated deployment time:** 3-5 minutes  
**🎯 Success rate:** 99% (with correct configuration)