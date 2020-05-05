const db = require("../models/dbmodel.js");
const dbController = {};
dbController.getPosts = async (req, res, next) => {
  try {
    let dbResults = await db.query(
      `
      SELECT
       users.username
      ,posts.post_id
      ,posts.post_title
      ,posts.post_content
      ,posts.post_time
      ,ingredients.ingredient_name
      ,recipe_ingredients.amount
      FROM public.users
      JOIN public.posts ON users.user_id = posts.post_id
      JOIN public.recipe_ingredients ON recipe_ingredients.post_id = posts.post_id
      JOIN public.ingredients ON ingredients.ingredient_id = recipe_ingredients.ingredient_id
      `
      , []
    );
    dbResults = dbResults.rows;
    res.locals.dbResults = dbResults;
    return next();
  } catch(err) {
    return next(err);
  }
}
dbController.cleanPosts = (req, res, next) => {
  const { dbResults } = res.locals;
  const cleanedOutput = {};
  for (let i = 0; i < dbResults.length; i ++) {
    const data = dbResults[i];
    if (cleanedOutput[data.post_id]) {
      const { ingredient_name, amount } = data;
      cleanedOutput[data.post_id].ingredients[ingredient_name] = amount;
    } else {
      const { username
            , post_title
            , post_content
            , post_time 
            , ingredient_name
            , amount
          } = data;
      cleanedOutput[data.post_id] = {
          username
        , post_title
        , post_content
        , post_time
        , ingredients: {}
      }
      cleanedOutput[data.post_id].ingredients[ingredient_name] = amount;
    }
  }
  res.locals.dbResults = cleanedOutput;
  return next();
}
dbController.makePost = async (req, res, next) => {
  const { username, postTitle, postContent, ingredients } = req.body;
  try {
    let userId = await db.query(
      `
      SELECT *
      FROM public.users
      WHERE users.username = username;
      `
      , [username]
    );
    userId = userId.rows[0].user_id;
    let postId = await db.query(
      `
      INSERT INTO public.posts (post_title, post_content, post_time, user_id)
      VALUES ($1, $2, NOW()::timestamp, $3)
      RETURNING post_id;
      `
      , [postTitle, postContent, userId]
    );
    postId = postId.rows[0].post_id;
    for (let i = 0; i < ingredients.length; i ++) {
      let ingredientId = await db.query(
        `
        WITH insert_cte AS (
          INSERT INTO public.ingredients (ingredient_name)
          VALUES ($1)
          ON CONFLICT (ingredient_name) DO NOTHING
          RETURNING ingredient_id
        )
        SELECT ingredient_id FROM insert_cte
        UNION ALL
        SELECT ingredient_id FROM public.ingredients
        WHERE ingredient_name = $2
        LIMIT 1;
        `
        , [ingredients[i].name, ingredients[i].name]
      );
      ingredientId = ingredientId.rows[0].ingredient_id;
      await db.query(
        `
        INSERT INTO public.recipe_ingredients (ingredient_id, post_id, amount)
        VALUES ($1, $2, $3)
        `
        , [ingredientId, postId, ingredients[i].amount]
      );
    }
    return next();
  } catch(err) {
    return next(err);
  };
}
module.exports = dbController;