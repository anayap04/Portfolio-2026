# Deployment Guide — Hostinger via GitHub Actions

## Overview
This portfolio uses GitHub Actions to automatically build and deploy to Hostinger's shared hosting. The workflow triggers on every push to `main` branch.

## Prerequisites

### 1. Hostinger Setup
- Shared hosting account with cPanel access
- SFTP credentials:
  - **Host**: Your Hostinger SFTP server (typically `ftp.yourdomain.com`)
  - **Username**: Your cPanel SFTP username
  - **Password**: Your cPanel SFTP password
  - **Port**: 22 (SFTP) or 21 (FTP)
  - **Remote path**: `/public_html/` (where your website files go)

### 2. GitHub Repository Secrets
Add the following secrets to your GitHub repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:

| Secret Name | Value | Example |
|------------|-------|---------|
| `HOSTINGER_HOST` | Your Hostinger server hostname | `ftp.anayap.tech` |
| `HOSTINGER_USERNAME` | Your cPanel SFTP username | `anayapxxx` |
| `HOSTINGER_PASSWORD` | Your cPanel SFTP password | `your-secure-password` |
| `HOSTINGER_PORT` | SFTP port (usually 22) | `22` |

## Deployment Workflow

### Automatic Deployment (CI/CD)
1. **Push code to `main` branch**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. **GitHub Actions Workflow** automatically:
   - Installs dependencies (`npm ci`)
   - Runs type checking (`npm run type-check`)
   - Builds the project (`npm run build`)
   - Deploys `dist/` folder to Hostinger via SFTP
   - Reports deployment status

3. **Monitor deployment**:
   - Go to **Actions** tab in your GitHub repository
   - Click the latest workflow run to see logs
   - Look for "Deployment Success" message

### Manual Deployment
To manually trigger deployment (without code changes):
1. Go to **Actions** → **Build & Deploy to Hostinger**
2. Click **Run workflow**
3. Wait for completion

## Deployment Architecture

```
┌─────────────────┐
│  Local Machine  │
│  (git push)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│ • Install deps  │
│ • Type check    │
│ • Build (dist/) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Hostinger     │
│  /public_html/  │
│  (SFTP upload)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ anayap.tech     │
│ (live website)  │
└─────────────────┘
```

## Routing & SPA Handling

### Static File Serving
The `.htaccess` file in `/public/` handles routing for the single-page application:
- All requests that don't match physical files/folders → redirect to `/index.html`
- React Router handles client-side routing

### Features Enabled
1. **SPA Routing** — All routes fall back to `index.html`
2. **Gzip Compression** — CSS, JS, and JSON are compressed
3. **Browser Caching** — Static assets cached for 1 year; CSS/JS for 1 month
4. **Security Headers** — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`

## Verifying Live Deployment

### Check Website
```bash
# Visit your domain
https://anayap.tech/

# Test SPA routing (should load without 404)
https://anayap.tech/#/projects
https://anayap.tech/#/experience
https://anayap.tech/#/contact
```

### Verify with curl
```bash
# Test that non-existent routes fallback to index.html
curl -I https://anayap.tech/nonexistent-route
# Should return 200, not 404
```

## Troubleshooting

### Build Fails
1. Check GitHub Actions logs: **Actions** tab → latest run
2. Common issues:
   - Missing dependencies: `npm ci` should fix
   - TypeScript errors: Run `npm run type-check` locally first
   - Build issues: Run `npm run build` locally and check output

### Deployment Fails
1. Check GitHub Actions logs for SFTP error details
2. Verify Hostinger credentials are correct and set as secrets
3. Ensure `/public_html/` exists on Hostinger
4. Check Hostinger's file manager to confirm files were uploaded
5. Verify `.htaccess` is present in `/public_html/`

### Site Not Loading
1. Visit Hostinger cPanel → File Manager
2. Verify `dist/` contents are in `/public_html/`
3. Check browser console for errors (F12 Developer Tools)
4. Try hard refresh: **Ctrl+Shift+R** (Windows/Linux) or **Cmd+Shift+R** (Mac)

### Routing Issues (404 on page refresh)
- Ensure `.htaccess` is in `/public_html/`
- Verify `mod_rewrite` is enabled on Hostinger (usually default)
- Contact Hostinger support if `.htaccess` rules aren't working

## Performance Optimization

### Current Setup
- **Build output size**: ~30KB (CSS) + ~388KB (JS gzipped to ~124KB)
- **Caching strategy**: Assets cached based on file type
- **Compression**: Gzip enabled for text-based assets

### Future Improvements
- Code splitting for route-based chunks
- Image optimization (WebP with fallbacks)
- CDN integration for global delivery
- Service Worker for offline support

## Environment Variables

The portfolio uses these environment variables:
- `import.meta.env.DEV` — True in development, false in production
  - Used to enable/disable i18n debugging

## Security Considerations

1. **HTTPS** — Hostinger should auto-redirect HTTP → HTTPS (configure in cPanel)
2. **Headers** — `.htaccess` sets security headers (no `X-XSS-Protection` needed for modern browsers)
3. **Secret Management** — GitHub Secrets never logged or exposed
4. **Deployments** — Workflow files are public but secrets are protected

## Support

### Hostinger
- Visit: https://www.hostinger.com/cpanel
- Support: https://www.hostinger.com/support

### GitHub Actions
- Docs: https://docs.github.com/en/actions
- Secrets: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions

### Build Issues
1. Run locally: `npm run build`
2. Check output in `dist/` folder
3. Verify no errors in terminal

---

**Last Updated**: 2025-09-04
**Deployment Target**: https://anayap.tech
**CI/CD Workflow**: `.github/workflows/deploy.yml`
