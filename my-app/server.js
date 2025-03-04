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
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5174", "http://localhost:3000"],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas"))
  .catch(error => console.error("❌ MongoDB connection error:", error));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true }
});
const User = mongoose.model("User", userSchema);

// Google Authentication Strategy
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

// Serialize & Deserialize User
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Login Route
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback Route
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5174/dashboard"); // Redirect frontend after login
  }
);

// Logout
app.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("http://localhost:5174/");
  });
});

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
