const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// This will help us connect to the database
const recordRoutes = express.Router();

// The router will be added as a middleware and will take control of requests starting with path /record.
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 

// --- db call for all npcs ----------start
// This section will help you get a list of all the records.
recordRoutes.get("/npc").get(function (req, res) {
  let db_connect = dbo.getDb("gw");
  db_connect
    .collection("npc")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
// --- db call for all npcs ----------end


// --- db call for all items npc ----------start


recordRoutes.get("/item").get(function (req, res) {
  // Assuming dbo is properly initialized elsewhere
  let db_connect = dbo.getDb("gw");

  // Check if db_connect is valid
  if (!db_connect) {
    // If db_connect is not valid, send an error response
    return res.status(500).json({ error: "Database connection failed" });
  }

  // Attempt to access the collection and perform the query
  db_connect.collection("item").find({}).toArray(function (err, result) {
    if (err) {
      // If there's an error during the query, send an error response
      console.error("Error fetching items:", err);
      return res.status(500).json({ error: "Error fetching items from database" });
    }
    // If query is successful, send the result
    res.json(result);
  });
});
// recordRoutes.route("/item").get(function (req, res) {
//   let db_connect = dbo.getDb("gw");
//   db_connect
//     .collection("item")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//  });
// --- db call for all items npc ----------end
 

// --- db call for all resources ----------start
recordRoutes.route("/res").get(function (req, res) {
  let db_connect = dbo.getDb("gw");
  db_connect
    .collection("resources")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
// --- db call for all resources ----------end
 





// This section will help you get a single record by id
// -------- npc by id -------start
recordRoutes.route("/npc/:id").get(function (req, res) {
  let db_connect = dbo.getDb("gw");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("npc")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
// -------- npc by id -------end


// -------- item by id -------start
recordRoutes.route("/item/:id").get(function (req, res) {
  let db_connect = dbo.getDb("gw");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("item")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
// -------- item by id -------end 


// -------- resource by id -------start
recordRoutes.route("/res/:id").get(function (req, res) {
  let db_connect = dbo.getDb("gw");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("resources")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
// -------- resource by id -------end 









 
// This section will help you create a new record.
// ------ adds npc to db ------- start 
recordRoutes.route("/create/npc").post(function (req, response) {
 let db_connect = dbo.getDb("gw");
 let myobj = {
   name: req.body.name,
   type: req.body.type,
   health: Number(req.body.health),
   map: req.body.map
 };
 db_connect.collection("npc").insertOne(myobj, function (err, res) {
   if (err) throw err;
   console.log("NPC Create");
   response.json(res);
 });
});
// ------ adds npc to db ------- end


// ------ adds item to db ------- start 
recordRoutes.route("/create/item").post(function (req, response) {
  let db_connect = dbo.getDb("gw");
  let myobj = {
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
  };
  db_connect.collection("item").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("Item Create");
    response.json(res);
  });
 });
 // ------ adds item to db ------- end 

// ------ adds resource to db ------- start 
recordRoutes.route("/create/res").post(function (req, response) {
 let db_connect = dbo.getDb("gw");
 let myobj = {
   name: req.body.name,
   type: req.body.type,
   health: Number(req.body.health),
 };
 db_connect.collection("resources").insertOne(myobj, function (err, res) {
   if (err) throw err;
   console.log("Resource Create");
   response.json(res);
 });
});
// ------ adds resource to db ------- end  










// This section will help you update a record by id.
// ------ updates npc --------start
recordRoutes.route("/update/npc/:id").post(function (req, response) {
 let db_connect = dbo.getDb("gw");
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     type: req.body.type,
     health: Number(req.body.health),
     map: req.body.map,
   },
 };
 db_connect
   .collection("npc")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("updated npc");
     response.json(res);
   });
});
// ------ updates npc --------end


// ------ updates item --------start
recordRoutes.route("/update/item/:id").post(function (req, response) {
 let db_connect = dbo.getDb("gw");
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     type: req.body.type,
     description: req.body.description,
   },
 };
 db_connect
   .collection("item")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log(`updated item `);
     response.json(res);
   });
});
// ------ updates item --------end


// ------ updates resources --------start
recordRoutes.route("/update/res/:id").post(function (req, response) {
 let db_connect = dbo.getDb("gw");
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     type: req.body.type,
     health: req.body.health,
   },
 };
 db_connect
   .collection("resources")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("updated resource");
     response.json(res);
   });
});
// ------ updates resources --------end
















 
// This section will help you delete a record
// -------- delete npc -------start
recordRoutes.route("/:id/npc").delete((req, response) => {
 let db_connect = dbo.getDb("gw");
  let myquery = { _id: ObjectId(req.params.id) };
  
 db_connect.collection("npc").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
// -------- delete npc -------start

// -------- delete item -------start
recordRoutes.route("/:id/item").delete((req, response) => {
 let db_connect = dbo.getDb("gw");
  let myquery = { _id: ObjectId(req.params.id) };
  
 db_connect.collection("item").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
// -------- delete item -------start

// -------- delete resource -------start
recordRoutes.route("/:id/res").delete((req, response) => {
 let db_connect = dbo.getDb("gw");
  let myquery = { _id: ObjectId(req.params.id) };
  
 db_connect.collection("resources").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
// -------- delete resource -------start






module.exports = recordRoutes;