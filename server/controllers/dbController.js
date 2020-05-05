const db = require("../models/dbmodel.js");
const dbController = {};
dbController.getPosts = (req, res, next) => {
  db.query(
    `
    SELECT p.post_content
          , p.post_time
          , u.username
    FROM public.users as u
      JOIN public.posts as p
        ON u.user_id = p.user_id
    `
    ,[]
    ,(err, sqlres) => {
      if (err) return next(err);
      res.locals.dbResults = sqlres.rows;
    }
  )
}

module.exports = dbController;