const router = require('express').Router();
const dbController = require("../controllers/dbController.js");

router.get("/getPosts"
          , dbController.getPosts
          , dbController.cleanPosts
          , (req, res) => {
            res.status(200).send({"posts":res.locals.dbResults});
          }
)

module.exports = router;