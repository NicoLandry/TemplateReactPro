import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();

// Use one CORS middleware (allowed origins from .env or defaults)
app.use(cors({
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

if (!MONGO_URI) {
  console.error("❌ ERROR: Missing MONGODB_URI in .env file!");
  process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas"))
  .catch(error => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Define User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true }
});
const User = mongoose.model("User", userSchema);

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value
      });
      await user.save();
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Authentication Routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    }

    // ✅ Generate JWT token for Google user
    const token = jwt.sign({ email: req.user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Redirect to frontend dashboard with token & email
    res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}&email=${req.user.email}`);
  }
);



// Signup API
app.post("/api/signup", async (req, res) => {
  try {
    console.log("➡️ Received signup request:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.error("❌ Missing fields:", { email, password });
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      console.error("❌ Invalid email format:", email);
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      console.error("❌ Weak password:", password);
      return res.status(400).json({
        message: "Password must be at least 8 characters, include uppercase & lowercase letters, a number, and a special character."
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("❌ Email already registered:", email);
      return res.status(409).json({ message: "Email already registered." });
    }

    // Hash password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed successfully");
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    console.log("✅ User saved to database:", email);

    // Generate JWT token
    const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });
    console.log("🔑 JWT Token generated");
    res.status(201).json({ message: "User created successfully.", token, user: { email } });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful.", token, user: { email } });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Verify Token API
app.get("/api/verify-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Invalid token" });
  }
});

// Logout Route
app.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Logout error" });
    res.redirect(process.env.CLIENT_URL || "http://localhost:5173");
  });
});

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
