const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config({ path: "./config.env" });
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 7001;
app.use(cors({
  origin: 'http://localhost:3000'
}));





// -------------------------------- dynamic data build --------------------------------
const mongoURI = process.env.MONGO_URI; // MongoDB connection URI

const dbName = 'gw';

const client = new MongoClient(mongoURI)


client.connect()
.then(()=>{
  console.log('Monnected to MongoDB');


  app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`);
  });
})
.catch(error => {
  console.error("error connecting to database",error);
});



// query all data from the database
app.get("/alldata", async (req, res) => {
  try{


    const db = client.db("gw");
     //  Query documents from multiple collections
     const users = await db.collection("users").find({}).toArray();
     const npc = await db.collection("npc").find({}).toArray();
     const resources = await db.collection("resources").find({}).toArray();
     const levels = await db.collection("levels").find({}).toArray();
     const item = await db.collection("item").find({}).toArray();
     const factions = await db.collection("factions").find({}).toArray();
 

     // merges all collections into one json object
     const responseData = {
      users: users,
      npc: npc,
      resources: resources,
      levels: levels,
      item: item,
      factions:factions
     };
     res.json(responseData);
 
  } catch (error) {
    console.error("Error querying data", error)
    res.status(500).json({
      error: "Internal server error "
    })
  }});




app.get("/users", (req, res) => {
  const db = client.db("gw");

  db.collection("users").find({}).toArray()
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    console.error("Error querying data", error)
    res.status(500).json({
      error: "Internal server error "
    })
  })
})

app.get("/npc", (req, res) => {
  const db = client.db("gw");

  db.collection("npc").find({}).toArray()
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    console.error("Error querying data", error)
    res.status(500).json({
      error: "Internal server error "
    })
  })
})












// -------------------------------- static data build --------------------------------

app.get('/all', (req, res) => {
  res.json({ message: 'to make sure it is reading endpoints' });
});
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from your personal API!' });
});


app.get('/api/data/1-1', (req, res) => {
  res.json([
    { id: 1, name: 'Home', level: '1', health: '5000000', type: 'Building', content: 'Home'  },
    { id: 2, name: 'Workshop', level: '1', health: '50000000', type: 'Building', content: 'workshop' },
  ]);
});

app.get('/api/data/1-2', (req, res) => {
  res.json([
    { id: 1, name: 'Berry Bush', level: '1', health: '50', type: 'resource', 
    resources:
    [{ name: 'Berry', level: '1', health: '50', type: 'food', loot: 3,
      experience:[
      {name: 'Gathering', experience: 10 },
    ],}] },

    { id: 2, name: 'Tree', level: '1', health: '50', type: 'resource',
    resources:
     [{ name: 'Log', level: '1', health: '50', type: 'wood', loot: 1, 
      experience:[
        {name: 'Woodcutting', experience: 10 },
      ]}]}
])
});


app.get('/api/data/1-3', (req, res) => {
  res.json([]);
});

app.get('/api/data/1-4', (req, res) => {
  res.json([
    { id: 3, name: 'Iron Ore', level: '1', health: '50', type: 'resource', 
      
    resources:
     [{ name: 'Iron Ore', level: '1', health: '50', type: 'Iron Ore', loot: 1,
      experience:[
        {name: 'Mining', experience: 10 },
      ],
      }]
    },
  ]);
});

app.get('/api/data/1-5', (req, res) => {
  res.json([
    { id: 3, name: 'Deer', level: '1', health: '150', type: 'npc',
      
    resources: [
      { name: 'meat', level: '1', health: '50', type: 'food', loot: 5,
        experience:[
        {name: 'Attack', experience: 75 },
        {name: 'Defence', experience: 25 },
      ],
      },
    ] },
  ]);
});

app.get('/api/data/2-1', (req, res) => {
  res.json([
    { id: 1, name: 'Crafting shop', level: '1', health: '999999999999', type: 'resource',content: 'Crafting'},
    { id: 2, name: 'Smithing Shop', level: '1', health: '99999999999', type: 'resource', content: 'Smithing' },
    { id: 3, name: 'Fletching Shop', level: '1', health: '99999999999', type: 'resource', content: 'fletching' },
    { id: 4, name: 'Bank Shop', level: '1', health: '99999999999', type: 'resource', content: 'bank' },
  ]);
});

app.get('/api/data/2-2', (req, res) => {
  res.json([
    { id: 1, name: 'Berry Bush', level: '1', health: '50', type: 'resource',
    resources:
    [{ name: 'Berry', level: '1', health: '50', type: 'food', loot: 3,
      experience:[
      {name: 'Gathering', experience: 10 },
    ],
    }] }
  ]);
});

app.get('/api/data/2-3', (req, res) => {
  res.json([]);
});

app.get('/api/data/2-4', (req, res) => {
  res.json([]);
});

app.get('/api/data/2-5', (req, res) => {
  res.json([
    { id: 1, name: 'Pirate', level: '1', health: '100', type: 'npc',
      resources: [
        { name: 'Log', level: '1', health: '50', type: 'wood', loot: 1,
      experience:[
        {name: 'Attack', experience: 10 },
        {name: 'Defence', experience: 10 },
      ]},
        { name: 'Berry', level: '1', health: '50', type: 'food', loot: 3}
      ]
  },
  ]);
});

app.get('/api/data/3-1', (req, res) => {
  res.json([
    { id: 3, name: 'Deer', level: '1', health: '150', type: 'npc',
    resources: [
      { name: 'meat', level: '1', health: '50', type: 'food', loot: 5,
      experience:[
        {name: 'Attack', experience: 10 },
        {name: 'Defence', experience: 10 },
      ]},
    ] },
  ]);
});

app.get('/api/data/3-2', (req, res) => {
  res.json([]);
});

app.get('/api/data/3-3', (req, res) => {
  res.json([
    { id: 3, name: 'Deer', level: '1', health: '150', type: 'npc',
    resources: [
      { name: 'meat', level: '1', health: '50', type: 'food', loot: 5,
      experience:[
        {name: 'Attack', experience: 10 },
        {name: 'Defence', experience: 10 },
      ]},
    ] },
  ]);
});

app.get('/api/data/3-4', (req, res) => {
  res.json([
    { id: 2, name: 'Tree', level: '1', health: '50', type: 'resource',
    resources:
     [{ name: 'Log', level: '1', health: '50', type: 'wood', loot: 1, 
      experience:[
        {name: 'Woodcutting', experience: 10 },
      ]}]},
  ]);
});

app.get('/api/data/3-5', (req, res) => {
  res.json([]);
});

app.get('/api/data/4-1', (req, res) => {
  res.json([]);
});

app.get('/api/data/4-2', (req, res) => {
  res.json([
    { id: 1, name: 'Berry Bush', level: '1', health: '50', type: 'resource', 
    resources:
    [{ name: 'Berry', level: '1', health: '50', type: 'food', loot: 3}] }
  ]);
});

app.get('/api/data/4-3', (req, res) => {
  res.json([]);
});


app.get('/api/data/4-4', (req, res) => {
  res.json([]);
});

app.get('/api/data/4-5', (req, res) => {
  res.json([]);
});

app.get('/api/data/5-1', (req, res) => {
  res.json([
    { id: 2, name: 'Glaive', level: '1', health: '150', type: 'npc',
      
    resources: [
      { name: 'Iron Ore', level: '1', health: '50', type: 'Iron Ore', loot: 1,
        experience:[
        {name: 'Attack', experience: 10 },
        {name: 'Defence', experience: 10 },
      ],},
      { name: 'Log', level: '1', health: '50', type: 'wood', loot: 1},
    ] },
  ]);
});

app.get('/api/data/5-2', (req, res) => {
  res.json([]);
});

app.get('/api/data/5-3', (req, res) => {
  res.json([
    { id: 3, name: 'Iron Ore', level: '1', health: '50', type: 'resource',
    resources:
     [{ name: 'Iron Ore', level: '1', health: '50', type: 'Iron Ore', loot: 1, 
      experience:[
        {name: 'Mining', experience: 10 },
      ],}]}
  ]);
});

app.get('/api/data/5-4', (req, res) => {
  res.json([]);
});

app.get('/api/data/5-5', (req, res) => {
  res.json([
    { id: 1, name: 'Berry Bush', level: '1', health: '50', type: 'resource', 
    resources:
    [{ name: 'Berry', level: '1', health: '50', type: 'food', loot: 3}] }
  ]);
});




app.get('/api/data/resource', (req, res) => {
  res.json([
    { id: 1, name: 'Berry Bush', level: '1', health: '50', type: 'resource', 
    resources:
    [{ name: 'Berry', level: '1', health: '50', type: 'food', loot: 3}] },

    
    { id: 2, name: 'Tree', level: '1', health: '50', type: 'resource', 
      experience:[
        {type: 'Woodcutting', experience: 10 },
      ],
    resources:
     [{ name: 'Log', level: '1', health: '50', type: 'wood', loot: 1}]},

     
    { id: 3, name: 'Iron Ore', level: '1', health: '50', type: 'resource', 
      experience:[
        {type: 'Mining', experience: 10 },
      ],
    resources:
     [{ name: 'Iron Ore', level: '1', health: '50', type: 'Iron Ore', loot: 1}]}
  ]);
});

app.get('/api/data/npc', (req, res) => {
  res.json([
    { id: 1, name: 'Pirate', level: '1', health: '100', type: 'npc',
      resources: [
        { name: 'Log', level: '1', health: '50', type: 'wood', loot: 1},
        { name: 'Berry', level: '1', health: '50', type: 'food', loot: 3},
        { name: 'Attack', type: 'experience', loot: 10},
        { name: 'Defence', type: 'experience', loot: 10},
      ]
  },
    { id: 2, name: 'Glaive', level: '1', health: '150', type: 'npc',
    resources: [
      { name: 'Iron Ore', level: '1', health: '50', type: 'Iron Ore', loot: 1},
      { name: 'Log', level: '1', health: '50', type: 'wood', loot: 1},
      { name: 'Attack', type: 'experience', loot: 10},
      { name: 'Defence', type: 'experience', loot: 10},
    ] },

    { id: 3, name: 'Deer', level: '1', health: '150', type: 'npc',
    resources: [
      { name: 'meat', level: '1', health: '50', type: 'food', loot: 5},
      { name: 'Attack', type: 'experience', loot: 10},
      { name: 'Defence', type: 'experience', loot: 10},
    ] },
  ]);
});

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Sorry, I just dont want to work. Reach out to the dev on discord if you see this!!!!' });
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
