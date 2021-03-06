var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger");

// Create all our routes and set up logic within those routes where required.
// get route -> index
router.get("/", function (req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
  // render index using burger data
  burger.all(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers/create", function (req, res) {
  const { burger_name } = req.body;
  burger.create(['burger_name', 'devoured'], [burger_name, 0], function (result) {
    console.log(result);
    res.redirect("/burgers")
  })
})

router.post('/burgers/update', function (req, res) {
  const { id, devoured } = req.body;
  var condition = "id = " + id;
  burger.update({
    devoured,
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.redirect("/burgers")
    }
  });
})

router.post("/api/burgers", function (req, res) {
  // save new burger and redirect to '/'
  console.log('body', req.body)
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, parseInt(req.body.devoured)
  ], function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  // save modified burger and redirect to '/'
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: true,
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;


