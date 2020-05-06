const router = require('express').Router();
const userController = require("../controllers/userController.js");

router.delete("/deleteUser"
              , userController.deleteUser
              , (req, res) => {
                return res.status(200).send({"user":"deleted"});
              }
)

module.exports = router;