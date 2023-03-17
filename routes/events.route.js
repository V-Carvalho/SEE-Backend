const router = require("express").Router();
const event = require("../controller/events.controller.js"); 

router.post("/saveEvent", event.saveEvent);

module.exports = router;