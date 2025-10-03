const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = 5100;

app.use(express.json());
app.use(cors());

const MONGODB_URI =  "mongodb+srv://<user>:<pass>@cluster0.dd.mongodb.net/?retryWrites=true&w=majority&appName=xx";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(" Connected to  DB");
    console.log("Database:", mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error(" DB   connection error:", err);
    console.log("Please check your connection string and network access settings");
    process.exit(1);
  });

mongoose.connection.on('disconnected', () => {
  console.log('  MongoDB Atlas disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(' MongoDB Atlas error:', err);
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  savedQuotes: [{ type: String }]
}, {
  timestamps: true
});


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

app.post("/register", async (req, res) => {
  try {
    console.log(" Registration attempt:", { username: req.body.username });
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    if (username.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const newUser = new User({ username, password });
    await newUser.save();
    
    console.log(" User registered successfully:", username);
    res.status(201).json({ 
      message: "User registered successfully",
      user: { 
        id: newUser._id,
        username: newUser.username 
      }
    });
    
  } catch (error) {
    console.error(" Registration error:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("🔐 Login attempt:", { username: req.body.username });
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    const user = await User.findOne({ username });
    if (!user) {
      console.log(" User not found:", username);
      return res.status(400).json({ message: "Invalid username or password" });
    }
    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log(" Invalid password for user:", username);
      return res.status(400).json({ message: "Invalid username or password" });
    }
    
    console.log(" Login successful for:", username);
    res.json({ 
      message: "Login successful", 
      user: { 
        id: user._id,
        username: user.username 
      }
    });
    
  } catch (error) {
    console.error(" Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); 
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.get("/test", (req, res) => {
  res.json({ 
    message: " Server is running!",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

app.post("/api/save-quote", async (req, res) => {
  const { username, quote } = req.body;
  if (!username || !quote) {
    return res.status(400).json({ message: "Username and quote are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.savedQuotes.includes(quote)) {
      return res.status(400).json({ message: "Quote already saved" });
    }

    user.savedQuotes.push(quote);
    await user.save();
    res.json({ message: "Quote saved successfully", savedQuotes: user.savedQuotes });
  } catch (err) {
    console.error("Error saving quote:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/get-saved-quotes", async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ savedQuotes: user.savedQuotes });
  } catch (err) {
    console.error("Error fetching saved quotes:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use((err, req, res, next) => {
  console.error(" Unhandled error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

process.on('SIGINT', async () => {
  console.log('\n  Shutting down server...');
  await mongoose.connection.close();
  console.log(' DB connection closed');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Database: ${mongoose.connection.db?.databaseName || 'connecting...'}`);
});