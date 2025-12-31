# GoDaddy Upload Guide

## 📤 Upload via File Manager

### Step 1: Upload Frontend
1. Login to GoDaddy cPanel → File Manager
2. Go to `public_html/`
3. Upload from `dist/` folder:
   - index.html
   - assets/ (entire folder)
   - .htaccess

### Step 2: Upload Backend
1. Create folder: `public_html/api/`
2. Upload from `api/` folder:
   - server.py
   - requirements.txt

### Step 3: Create .env
1. In `public_html/api/`, create file: `.env`
2. Add:
```
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_ENV=production
PORT=8000
```

### Step 4: Start Python Backend
SSH into server:
```bash
cd public_html/api
pip install -r requirements.txt
python server.py
```

## ✅ Done!
Visit: https://quickedu.co.in
