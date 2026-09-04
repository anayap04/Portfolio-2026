# GitHub Secrets Setup — Step-by-Step

## Overview
Your portfolio deployment requires 4 GitHub Secrets to authenticate with Hostinger's SFTP server. These secrets are encrypted and never exposed in logs.

---

## Step 1: Navigate to Repository Settings

1. Go to your GitHub repository: https://github.com/anayap04/pao_portfolio
2. Click **Settings** (top-right navigation)
3. In the left sidebar, click **Secrets and variables**
4. Click **Actions**

You should now see a "Repository secrets" section with a **"New repository secret"** button.

---

## Step 2: Find Your Hostinger SFTP Credentials

Before adding secrets, gather your Hostinger credentials:

### Method A: Through Hostinger cPanel
1. Log in to Hostinger: https://www.hostinger.com/cpanel
2. Search for **"SFTP Accounts"** or **"SSH/SFTP Users"**
3. Look for an existing SFTP account or create one
4. You'll see:
   - **Server/Host**: e.g., `ftp.anayap.tech`
   - **Username**: e.g., `anayapxxx`
   - **Password**: Your SFTP password
   - **Port**: Usually `22` (SFTP) or `21` (FTP)

### Method B: Check Hostinger Welcome Email
Look for the initial setup email from Hostinger with subject "Welcome to Hostinger". It should contain:
- FTP/SFTP host
- Username
- Password
- Port

---

## Step 3: Add Each Secret

Add the following 4 secrets to GitHub, one by one:

### Secret 1: HOSTINGER_HOST

**Name**: `HOSTINGER_HOST`
**Value**: Your Hostinger server address
**Example**: `ftp.anayap.tech` or `ftp123.hostinger.com`

**Steps**:
1. Click **"New repository secret"**
2. In "Name" field, type: `HOSTINGER_HOST`
3. In "Secret" field, paste your Hostinger server address
4. Click **"Add secret"**

---

### Secret 2: HOSTINGER_USERNAME

**Name**: `HOSTINGER_USERNAME`
**Value**: Your SFTP username
**Example**: `anayapxxx` (usually matches your Hostinger username)

**Steps**:
1. Click **"New repository secret"**
2. In "Name" field, type: `HOSTINGER_USERNAME`
3. In "Secret" field, paste your SFTP username
4. Click **"Add secret"**

---

### Secret 3: HOSTINGER_PASSWORD

**Name**: `HOSTINGER_PASSWORD`
**Value**: Your SFTP password
**Example**: Your secure password

**Steps**:
1. Click **"New repository secret"**
2. In "Name" field, type: `HOSTINGER_PASSWORD`
3. In "Secret" field, paste your SFTP password
4. Click **"Add secret"**

⚠️ **Important**: Never share this password. GitHub keeps it encrypted.

---

### Secret 4: HOSTINGER_PORT

**Name**: `HOSTINGER_PORT`
**Value**: SFTP port number
**Example**: `22` (for SFTP) or `21` (for FTP)

**Steps**:
1. Click **"New repository secret"**
2. In "Name" field, type: `HOSTINGER_PORT`
3. In "Secret" field, type: `22` (unless Hostinger specified differently)
4. Click **"Add secret"**

---

## Step 4: Verify Secrets Were Added

After adding all 4 secrets, you should see them listed:

```
Repository secrets
  • HOSTINGER_HOST
  • HOSTINGER_PASSWORD
  • HOSTINGER_PORT
  • HOSTINGER_USERNAME
```

The secret values will show as dots (•••••) — this is normal, they're encrypted.

---

## Step 5: Test the Deployment

Once all secrets are added, you're ready to deploy!

### Test 1: Automatic Deployment

```bash
# Make a small change
echo "# Updated on $(date)" >> README.md

# Commit and push
git add README.md
git commit -m "Test deployment"
git push origin main
```

### Test 2: Manual Deployment

1. Go to GitHub: **Actions** tab
2. Select **"Build & Deploy to Hostinger"** workflow
3. Click **"Run workflow"** button
4. Select branch: `main`
5. Click **"Run workflow"** again

### Check Deployment Status

After triggering deployment:
1. Go to **Actions** tab
2. Click the latest "Build & Deploy to Hostinger" run
3. Watch the logs in real-time:
   - ✓ "Checkout code"
   - ✓ "Setup Node.js"
   - ✓ "Install dependencies"
   - ✓ "Install TypeScript"
   - ✓ "Type check"
   - ✓ "Build"
   - ✓ "Deploy to Hostinger via SFTP"
   - ✓ "Deployment Success"

---

## Troubleshooting Secrets

### "Deploy fails with authentication error"
- Double-check credentials in Hostinger cPanel
- Verify the secret values have no extra spaces
- Make sure SFTP account is enabled (not disabled)
- Try accessing via SFTP manually with an FTP client to test

### "Can't find SFTP account in cPanel"
- Log in to Hostinger cPanel
- Look for: "SFTP Accounts", "SSH/SFTP", "FTP Accounts", or "SSH Keys"
- If not found, create a new SFTP account
- Use the auto-generated credentials

### "Port 22 doesn't work"
- Some Hostinger plans use different ports
- Try port `21` (FTP) instead
- Or check Hostinger cPanel for the correct port number

### "Deployment succeeds but files not on server"
- Log in to Hostinger cPanel → File Manager
- Navigate to `/public_html/`
- Check if new files are there
- Refresh browser cache (Ctrl+Shift+R or Cmd+Shift+R)

---

## Security Best Practices

✓ **DO**:
- Use Hostinger's auto-generated SFTP credentials when possible
- Keep your Hostinger account password separate from SFTP password
- Rotate SFTP passwords periodically
- Use a strong, unique password for SFTP

✗ **DON'T**:
- Hardcode credentials in code or config files
- Share secrets with teammates via email or chat
- Use the same password for multiple accounts
- Commit `.env` files with secrets
- Share your GitHub secrets page with others

---

## Verifying Live Deployment

After successful deployment, verify your site is live:

```bash
# Check if domain is accessible
curl -I https://anayap.tech

# Expected output:
# HTTP/1.1 200 OK
# Server: LiteSpeed
# ...

# Test SPA routing (should not get 404)
curl -I https://anayap.tech/projects
# Should return 200, not 404
```

Or simply visit: https://anayap.tech in your browser!

---

## Monitoring Future Deployments

Every time you push to `main`, the CI/CD workflow runs automatically:

```bash
# This triggers automatic deployment
git push origin main

# Check status at: https://github.com/anayap04/pao_portfolio/actions
```

Monitor the workflow to see:
- ✓ Successful deployments
- ✗ Failed builds (with error messages)
- ⏱ Deployment time

---

## Updating Secrets

To update a secret (e.g., if you change your Hostinger password):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Find the secret (e.g., `HOSTINGER_PASSWORD`)
3. Click the **Update** button (pencil icon)
4. Enter the new value
5. Click **Update secret**

---

## Questions?

- **Hostinger Support**: https://www.hostinger.com/support
- **GitHub Actions Docs**: https://docs.github.com/actions/security-guides/using-secrets-in-github-actions
- **This Project**: See DEPLOYMENT.md or QUICK_START.md

---

## Deployment Workflow Summary

```
1. You push code to main branch
   ↓
2. GitHub detects push → Triggers Actions workflow
   ↓
3. Workflow retrieves your 4 GitHub Secrets
   ↓
4. Workflow uses secrets to connect to Hostinger SFTP
   ↓
5. Files from dist/ uploaded to /public_html/
   ↓
6. Your site updates live at https://anayap.tech
   ↓
7. GitHub logs show ✓ Deployment Success
```

**That's it!** Once secrets are set up, deployments happen automatically on every push.

---

**Ready?** Add the 4 GitHub Secrets above, then commit and push to `main`!
