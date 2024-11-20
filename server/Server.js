const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;
const { MongoClient } = require("mongodb");
const User = require('./model/user');
const Token = require('./model/token');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(require("./routes/projects"));
app.use(require("./routes/map"));
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// get driver connection
const dbo = require("./db/conn");
const locatiionId = '1-1'
const corsOptions = {
  origin: 'http://localhost:3000', // or the specific origin you want to allow
  credentials: true, // this is important for cookies/session to be sent and received
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};



app.get('/api/test', (req, res) => {
  res.send('You did it!');
});


app.use(cors(corsOptions));
// Configure the session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.REDIRECT_URL,
},
function(accessToken, refreshToken, profile, done) {
  
  User.findOneAndUpdate(
    // console.log('this failed work'),
    // console.log(profile.id),
    { googleId: profile.id },
    {
      $set: {
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        location: '1-1'
      },
    },
    { new: true, upsert: true, runValidators: true }
  )
  .then(user => {
    console.log(user); // Logging the user

    const token = new Token({
      // userId: user.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiration: new Date(Date.now() + 3600000),
    });

    token.save()
      .then(() => {
        return done(null, user);
      })
      .catch(err => {
        console.error("Error during token saving:", err);
        return done(err);
      });
  })
  .catch(err => {
    console.error("Error during user fetch or update:", err);
    return done(err);
  });
}));

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send('Something broke!');
});


app.get('/api/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: {
        id: req.user._id, // Make sure this matches the property you want to send for the user ID.
        name: req.user.name,
        avatar: req.user.picture // Correctly using 'picture' from the user model.
      }
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});

app.use((req, res, next) => {
  // console.log("Request Headers:", req.headers);
  // console.log("Request Body:", req.body);
  // console.log('uncomment for header and body at this location');
  next();
});

  

// Serialize user into the sessions
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

// Deserialize user from the sessions
passport.deserializeUser(function(_id, done) {
  // Use promises with .then and .catch
  User.findById(_id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});


// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  function(req, res) {
    console.log('this worked')
    // Successful authentication, redirect home.
    // console.log(req.user.googleId)
  res.redirect(`http://localhost:3000/home?userId=${req.user.googleId}`);
});


// Logout route
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
      res.redirect('http://localhost:3000/');
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});



// ---------- route to pull player information --------------------

app.get('/api/user/profile/:userId', async (req, res) => {
  // console.log('accessed endpoint');
// });

  try {
    // Retrieve the user ID from the URL parameters
    const userId = req.params.userId;

    // Log the user ID to the console
    // console.log('User ID:', userId);

    // Query the database to find the user by user ID
    const user = await User.findOne({ googleId: userId });


    if (!user) {
      return res.status(404).json({ error: 'User not found this failed completely' });
    }

    // If user is found, return the user object
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







// =================================================================
//                     Inventroy
// =================================================================




app.post('/api/:user/update-inventory', async (req, res) => {
  const { user } = req.params; // Extract the user parameter from the URL
  const { inventory } = req.body; // Extract the inventory from the request body

  // Validate the input data
  if (!user || !Array.isArray(inventory)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    // Find the user document in the database by googleId
    const userDoc = await User.findOne({ googleId: user });

    // If user is not found, return a 400 status with an error message
    if (!userDoc) {
      return res.status(400).json({ error: 'User not found' });
    }
console.log('id ', user)
console.log('inventory', inventory);
    // Update the user's inventory in the database
    const result = await User.updateOne(
      { googleId: user }, // Filter: find the document with this googleId
      { $set: { inventory: inventory } } // Update operation: set the inventory field to the new value
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      throw new Error('Failed to update inventory');
    }

    // Send a success response
    res.status(200).send('Inventory updated successfully');
  } catch (error) {
    // Log any errors and send a 500 status with an error message
    console.error('Error updating inventory:', error);
    res.status(500).send('Failed to update inventory');
  }
});



// =================================================================
//                     Initial Levels
// =================================================================


app.post('/api/:user/update-levels', async (req, res) => {
  const { user } = req.params; // Extract the user parameter from the URL
  const { level } = req.body; // Extract the level from the request body


  // Validate the levels data
  if (!Array.isArray(level) || level.length === 0) {
    return res.status(400).send('Invalid levels data');
  }

  try {
    // Find the user document in the database by googleId
    const userDoc = await User.findOne({ googleId: user });

    // If user is not found, return a 400 status with an error message
    if (!userDoc) {
      return res.status(400).json({ error: 'User not found' });
    }
// console.log('id ', user)
console.log('level', level);
    // Update the user's level in the database
    const result = await User.updateMany(
      { googleId: user }, // Filter: find the document with this googleId
      { $set: { level: level } } // Update operation: set the level field to the new value
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      throw new Error('Failed to update level');
    }

    // Send a success response
    res.status(200).send('level updated successfully');
  } catch (error) {
    // Log any errors and send a 500 status with an error message
    console.error('Error updating level:', error);
    res.status(500).send('Failed to update level');
  } 
});


// =================================================================
//                     Location Update
// =================================================================

app.post('/api/:user/:location', async (req, res) => {
  const { user } = req.params; // Extract the user parameter from the URL
  const { location } = req.body; // Extract the location from the request body

  // Validate the input data
  if (!location) {
    return res.status(400).send('Invalid location data');
  }

  try {
    // Update the user's location in the database
    const result = await User.updateOne(
      { googleId: user }, // Filter: find the document with this googleId
      { $set: { location: location } } // Update operation: set the location field to the new value
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      return res.status(400).send('Failed to update location');
    }

    // Send a success response
    res.status(200).send('Location updated successfully');
  } catch (error) {
    // Log any errors and send a 500 status with an error message
    console.error('Error updating location:', error);
    res.status(500).send('Failed to update location');
  }
});





// else{
//   try {
//     await updateUserInventory(userId, inventory);
//     res.status(200).send('Inventory updated successfully');
// } catch (error) {
//     console.error('Error updating inventory:', error);
//     res.status(500).send('Failed to update inventory');
// }
// }






//  -----------------format to post --------------------
// A POST route to submit a comment and rating
// app.post('/api/comment-rating', async (req, res, next) => {
//   // Ensure the user is authenticated
 

//   if (!req.isAuthenticated()) {
//     return res.status(401).send('User not authenticated');
//   }
  
//  try {
//     // Create a new CommentRating and save it to the database
//     const newCommentRating = new CommentRating({
//       user: req.user._id, // Assuming req.user is the authenticated user
//       comment: req.body.comment,
//       rating: req.body.rating
//     });

//     const savedCommentRating = await newCommentRating.save();
    
//     // Optionally, you might want to save the reference of the commentRating to the User model
//     // by pushing the savedCommentRating._id into the user's comments array if you have such a field.

//     res.status(201).json(savedCommentRating);
//   } catch (error) {
//     next(error);
//   }
// });
//  -----------------format to post --------------------


app.post('/levels/add', async (req, res) => {
  const { name, type, startingLevel } = req.body;
  
  try {
    // Validate request body data
    if (!name || !type || !startingLevel) {
      return res.status(400).send('Missing required fields in request body');
    }
    
    // Parse startingLevel to ensure it's a valid number
    const startingLevelNumber = parseInt(startingLevel);
    if (isNaN(startingLevelNumber)) {
      return res.status(400).send('Starting level must be a valid number');
    }
    
    const db = client.db("gw");
    const collection = db.collection('levels');
    
    // Insert a document into the collection
    const result = await collection.insertOne({
      name: name,
      type: type,
      starting: startingLevelNumber, // Use parsed startingLevel
    });
    
    if (result && result.ops && result.ops.length > 0) {
      // Respond with the inserted document
      res.status(201).json(result.ops[0]);
    } else {
      console.log('Successfully inserted');
      res.status(200).send('Data transferred successfully');
    }
  } catch (error) {
    console.log('Error inserting data:', error);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});



  


const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/gw";
client = new MongoClient(mongoURI)
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connection Established");

    // Now you can define the 'db' variable
    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log("App listening on port " + port));
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });



// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });