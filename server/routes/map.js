const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/map").get(function (req, res) {
    let db_connect = dbo.getDb("map");
    db_connect
      .collection("map")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});
   

// This section will help you get a single record by id
recordRoutes.route("/map/:id").get(function (req, res) {
    let db_connect = dbo.getDb("gw");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("map")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});
   

// This section will help you create a new record.
recordRoutes.route("/create/map").post(function (req, response) {
    let db_connect = dbo.getDb("gw");
    let myobj = {
        map: req.body.name,
        sectors: {
            1.1: {
                npcs: [],
                resources: []
            },
            1.2: {
                npcs: [],
                resources: []
            },
            1.3: {
                npcs: [],
                resources: []
            },
            1.4: {
                npcs: [],
                resources: []
            },
            1.5: {
                npcs: [],
                resources: []
            },
            1.6: {
                npcs: [],
                resources: []
            },
            1.7: {
                npcs: [],
                resources: []
            },
            2.1: {
                npcs: [],
                resources: []
            },
            2.2: {
                npcs: [],
                resources: []
            },
            2.3: {
                npcs: [],
                resources: []
            },
            2.4: {
                npcs: [],
                resources: []
            },
            2.5: {
                npcs: [],
                resources: []
            },
            2.6: {
                npcs: [],
                resources: []
            },
            2.7: {
                npcs: [],
                resources: []
            },
            3.1: {
                npcs: [],
                resources: []
            },
            3.2: {
                npcs: [],
                resources: []
            },
            3.3: {
                npcs: [],
                resources: []
            },
            3.4: {
                npcs: [],
                resources: []
            },
            3.5: {
                npcs: [],
                resources: []
            },
            3.6: {
                npcs: [],
                resources: []
            },
            3.7: {
                npcs: [],
                resources: []
            },
            4.1: {
                npcs: [],
                resources: []
            },
            4.2: {
                npcs: [],
                resources: []
            },
            4.3: {
                npcs: [],
                resources: []
            },
            4.4: {
                npcs: [],
                resources: []
            },
            4.5: {
                npcs: [],
                resources: []
            },
            4.6: {
                npcs: [],
                resources: []
            },
            4.7: {
                npcs: [],
                resources: []
            },
            5.1: {
                npcs: [],
                resources: []
            },
            5.2: {
                npcs: [],
                resources: []
            },
            5.3: {
                npcs: [],
                resources: []
            },
            5.4: {
                npcs: [],
                resources: []
            },
            5.5: {
                npcs: [],
                resources: []
            },
            5.6: {
                npcs: [],
                resources: []
            },
            5.7: {
                npcs: [],
                resources: []
            },
            6.1: {
                npcs: [],
                resources: []
            },
            6.2: {
                npcs: [],
                resources: []
            },
            6.3: {
                npcs: [],
                resources: []
            },
            6.4: {
                npcs: [],
                resources: []
            },
            6.5: {
                npcs: [],
                resources: []
            },
            6.6: {
                npcs: [],
                resources: []
            },
            6.7: {
                npcs: [],
                resources: []
            },
            7.1: {
                npcs: [],
                resources: []
            },
            7.2: {
                npcs: [],
                resources: []
            },
            7.3: {
                npcs: [],
                resources: []
            },
            7.4: {
                npcs: [],
                resources: []
            },
            7.5: {
                npcs: [],
                resources: []
            },
            7.6: {
                npcs: [],
                resources: []
            },
            7.7: {
                npcs: [],
                resources: []
            },
        },
        npcs: [],
        items: [req.body.map],
        resources: [req.body.map]
    //   npc: req.body.npc,
    //   player: req.body.player,
    //   loot: req.body.loot,// might need to array object
    //   spawns: req.body.spawns//fill with npcs and resources to spawn
    };
    db_connect.collection("map").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("Created sector");
      response.json(res);
    });
});
   
// This section will help you update a record by id.
recordRoutes.route("/map/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb("gw");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
            name: req.body.name,
            type: req.body.type,
            location: req.body.location,
            map: req.body.map,
          
      },
    };
    db_connect
      .collection("map")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("updated map");
        response.json(res);
      });
});
   

// This section will help you delete a record
recordRoutes.route("/:id/map").delete((req, response) => {
    let db_connect = dbo.getDb("gw");
     let myquery = { _id: ObjectId(req.params.id) };
     
    db_connect.collection("map").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
});
   


module.exports = recordRoutes;