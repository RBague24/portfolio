# 📚 PORTFOLIO DATABASE SETUP GUIDE
## MongoDB + Node.js + Render (Full Walkthrough)

---

## STEP 1: Set Up MongoDB (Database)

### 1a. Create MongoDB Account
1. Go to **https://www.mongodb.com**
2. Click **"Sign Up"** → Create a free account
3. Verify your email

### 1b. Create a Database
1. Click **"Build a Database"**
2. Choose **"FREE"** tier
3. Select your cloud provider: **AWS** (default is fine)
4. Select a region close to you (e.g., **N. Virginia** for Delaware)
5. Click **"Create"** and wait ~5 minutes

### 1c. Create Database User
1. In the MongoDB dashboard, go to **"Security"** → **"Database Access"**
2. Click **"Add New Database User"**
3. Username: `portfoliouser` (or any name)
4. Password: Create a strong password (SAVE THIS!)
5. Role: **Built-in Role: readWriteAnyDatabase**
6. Click **"Create User"**

### 1d. Allow Network Access
1. Go to **"Security"** → **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Add Current IP Address"** OR **"Allow Access from Anywhere"** (select 0.0.0.0/0)
4. Click **"Confirm"**

### 1e. Get Connection String
1. Go back to **"Databases"**
2. Click **"Connect"** on your cluster
3. Choose **"Drivers"**
4. Select **"Node.js"** as the driver
5. Copy the connection string that looks like:
   ```
   mongodb+srv://portfoliouser:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `PASSWORD` with your actual password**
7. Change `/?retryWrites...` to `/portfolio?retryWrites...` (add database name)
8. **SAVE THIS STRING** - you'll need it in Render

**EXAMPLE:**
```
mongodb+srv://portfoliouser:mySecurePassword123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## STEP 2: Set Up Render (Host the Backend)

### 2a. Create Render Account
1. Go to **https://render.com**
2. Click **"Sign Up"**
3. Sign up with **GitHub** (easiest) or email
4. Verify email

### 2b. Deploy the Backend Server

#### Option 1: Deploy from GitHub (Recommended)
If you have GitHub:

1. Create a GitHub repo:
   - Go to **https://github.com/new**
   - Name it: `portfolio-backend`
   - Create README (optional)
   - Click **"Create repository"**

2. Upload the server files:
   - Click **"Add file"** → **"Upload files"**
   - Upload these files:
     - `server.js`
     - `package.json`
   - Click **"Commit changes"**

3. In Render, click **"New +"** → **"Web Service"**
4. Click **"Connect a repository"**
5. Find your `portfolio-backend` repo and click **"Connect"**
6. Fill in the form:
   - **Name:** `portfolio-api`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
7. Click **"Create Web Service"** and wait for deployment (~2 minutes)

#### Option 2: Paste Code Directly
1. In Render, click **"New +"** → **"Web Service"**
2. Choose **"Public Git Repository"**
3. Paste this repo URL: (you can use a simple test repo)
4. Continue with setup above

### 2c. Add Environment Variables in Render

1. In your deployed service, go to **"Environment"**
2. Click **"Add Environment Variable"**
3. Add this variable:
   - **Key:** `MONGODB_URI`
   - **Value:** (Paste your MongoDB connection string)
   - Example: `mongodb+srv://portfoliouser:myPassword@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority`
4. Click **"Save Changes"**
5. Your service will redeploy automatically

### 2d. Get Your Render URL
1. Go to **"Settings"** in your Render service
2. Find **"Web Service URL"** - it looks like:
   ```
   https://portfolio-api-abc123.onrender.com
   ```
3. **COPY THIS URL** - you'll need it next

---

## STEP 3: Update Your Portfolio Frontend

### 3a. Update the API Base URL
1. Open `portfolio-frontend.html`
2. Find this line (around line 530):
   ```javascript
   const API_BASE = 'https://your-render-url.onrender.com/api';
   ```
3. Replace with your actual Render URL. Example:
   ```javascript
   const API_BASE = 'https://portfolio-api-abc123.onrender.com/api';
   ```
4. **Save the file**

### 3b. Test the Connection
1. Open your portfolio in a browser
2. Go to the "Servicios" tab
3. Click "+ Add Service"
4. Fill in:
   - Service Name: "Test Service"
   - Price: "100"
   - Description: "Testing"
   - Features: "Feature 1, Feature 2"
5. Click **"Add Service"**
6. If it appears, your database is working! ✅

---

## STEP 4: Deploy Your Frontend

You have a few options:

### Option A: Netlify (Easiest, Free)
1. Go to **https://netlify.com**
2. Sign up with GitHub
3. Click **"Add new site"** → **"Deploy manually"**
4. Drag and drop `portfolio-frontend.html`
5. You'll get a live URL immediately!

### Option B: GitHub Pages
1. Create a GitHub repo: `username.github.io`
2. Upload `portfolio-frontend.html` as `index.html`
3. Your site is live at: `https://username.github.io`

### Option C: Render (Same service)
1. Add a Static Site in Render
2. Upload your HTML file
3. Get a live URL

### Option D: Keep Using Locally
1. Just open the HTML file in your browser
2. It will work with your MongoDB backend automatically

---

## TROUBLESHOOTING

### "Connection Error" or "Cannot reach server"
- Check that your Render URL is correct in the HTML file
- Make sure Render service is running (check status on Render dashboard)
- Wait 2-3 minutes for Render to fully deploy

### "MongoDB connection failed"
- Check that your MongoDB connection string is correct
- Make sure your IP is whitelisted in MongoDB (Network Access)
- Verify username and password in the connection string

### "Button doesn't save anything"
- Open browser Developer Tools (F12)
- Go to Console tab
- Check for error messages
- Make sure API_BASE URL is correct

### "Render service goes to sleep"
- Render's free tier puts services to sleep after 15 minutes of inactivity
- When you visit, it takes 30 seconds to wake up
- Upgrade to paid tier if you want it always running

---

## TESTING THE FULL WORKFLOW

1. **Add a Project:** Go to "Proyectos" → Click "+ Add Project"
2. **Add a Service:** Go to "Servicios" → Click "+ Add Service"
3. **Add a Portfolio Item:** Go to "Freelance" → Click "+ Add Website"
4. **Add a Course:** Go to "Cursos" → Click "+ Add Course"
5. **Add a Degree:** Go to "Diplomas" → Click "+ Add Degree"
6. **Refresh the page** → All your data should still be there! ✅

---

## NEXT STEPS

1. Add more content to your portfolio
2. Test all the features
3. Update the frontend URL in your portfolio's about section
4. Share the portfolio link with potential clients
5. (Optional) Add authentication if you want to password-protect the edit features

---

## QUICK REFERENCE

- **MongoDB Dashboard:** https://cloud.mongodb.com
- **Render Dashboard:** https://dashboard.render.com
- **Your Frontend:** (wherever you host it)
- **Your Backend API:** `https://portfolio-api-XXXXX.onrender.com/api`

---

Need help? Let me know what error you're seeing and I can help debug!
