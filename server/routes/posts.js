const router = require('express').Router();
const dbController = require("../controllers/dbController.js");

router.get("/getPosts"
          , dbController.getPosts
          , dbController.cleanPosts
          , (req, res) => {
            return res.status(200).send({"posts":res.locals.dbResults});
          }
)
router.post("/makePost"
            , dbController.makePost
            , (req, res) => {
              return res.status(200).send({"message":"posted"});
            }
)
router.delete("/deletePost"
              , dbController.deletePost
              , (req, res) => {
                return res.status(200).send({"message":"deleted"});
              }
)
module.exports = router;