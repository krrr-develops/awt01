const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongoose-demo')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Error:", err));

// 2. Create User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// 3. Create Model
const User = mongoose.model("User", userSchema);

// 4. Register User API
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({
        username,
        password
    });

    await newUser.save();

    res.send("User registered successfully!");
});

// 5. Login User API
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
        res.send("Login successful!");
    } else {
        res.send("Invalid username or password");
    }
});

// 6. Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
