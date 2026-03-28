# 🚀 QUICK START GUIDE - SPRINT 1 COMPLETE

## Setup in 3 Steps

### 1️⃣ Copy Environment File

```bash
cp .env.sample .env
```

### 2️⃣ Add Your Credentials

Edit `.env` and replace:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_32+_char_secret
STRIPE_SECRET_KEY=your_stripe_key
EMAIL_USER=your_brevo_email
EMAIL_PASS=your_brevo_password
```

### 3️⃣ Start Server

```bash
npm start
```

---

## What Changed

| File                                   | Change                                        | Why                  |
| -------------------------------------- | --------------------------------------------- | -------------------- |
| `app.js`                               | Added error middleware & express-async-errors | Catch all errors     |
| `server.js`                            | Added env var validation                      | Fail fast on startup |
| `.env.sample`                          | Standardized var names                        | Consistency          |
| `src/config/stripe.js`                 | Proper Stripe init                            | Was empty!           |
| `src/controllers/paymentController.js` | Added validation                              | Prevent bad requests |
| `src/middlewares/errorMiddleware.js`   | NEW global error handler                      | Crash-proof          |

---

## Key Features

✅ **No more manual try/catch needed** - express-async-errors catches them
✅ **Startup validation** - Missing env vars? Server exits immediately
✅ **Clean errors** - All responses are JSON with success/status/message
✅ **Proper HTTP codes** - 400, 401, 402, 404, 409, 500
✅ **Logging** - All errors logged with timestamp
✅ **Production safe** - Stack traces hidden in production

---

## Environment Variables (All Required)

```
PORT=5000
MONGO_URI=mongodb://...
JWT_SECRET=...
STRIPE_SECRET_KEY=...
STRIPE_PUBLISHABLE_KEY=...
EMAIL_USER=...
EMAIL_PASS=...
NODE_ENV=development
```

---

## Test It Works

```bash
# Should see startup banner:
# ==================================================
# 🚀 Gym Backend Server Running
# 📍 http://localhost:5000
# 🔐 Environment: development
# ==================================================
```

---

## Common Errors & Fixes

### ❌ Error: "STRIPE_SECRET_KEY is not defined"

**Fix**: Add `STRIPE_SECRET_KEY` to `.env` file

### ❌ Error: "Missing required environment variables"

**Fix**: Copy `.env.sample` → `.env` and fill in values

### ❌ Error: "MongoDB Connected" but then immediate exit

**Fix**: Check `MONGO_URI` is correct and MongoDB is running

### ❌ Payload returns error as object instead of JSON

**Fix**: This is now fixed - check server logs for details

---

## Making Requests

All error responses now follow format:

```json
{
  "success": false,
  "status": 400,
  "message": "Error description",
  "errors": ["field1: error", "field2: error"] // Optional
}
```

---

## Next: Sprint 2

- Input validation on all routes
- Rate limiting
- Request logging
- Full error recovery

See: `SPRINT1_IMPLEMENTATION.md` for full details
