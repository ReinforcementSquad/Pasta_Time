const db = require("../models/dbmodel.js");
userController = {};

userController.deleteUser = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    let allPosts = await db.query(
      `
      SELECT post_id
      FROM public.posts
      WHERE user_id = $1
      `
      , [user_id]
    )
    allPosts = allPosts.rows;
    for (let i = 0; i < allPosts.length; i ++) {
      const data = allPosts[i];
      const { post_id } = data;
      let ingredientId = await db.query(
        `
        SELECT ingredient_id
        FROM public.recipe_ingredients
        WHERE post_id = $1
        `
        , [post_id]
      );
      ingredientId = ingredientId.rows;
      await db.query(
        `
        DELETE FROM public.recipe_ingredients
        WHERE post_id = $1
        `
        , [post_id]
      );
      for (let j = 0; j < ingredientId.length; j ++) {
        const ingredient_id = ingredientId[j].ingredient_id;
        await db.query(
          `
          DELETE FROM public.ingredients
          WHERE ingredient_id = $1
          `
          , [ingredient_id]
        );
      }
      await db.query(
        `
        DELETE FROM public.posts
        WHERE post_id = $1
        `
        , [post_id]
      );
    }
    await db.query(
      `
      DELETE FROM public.google
      WHERE user_id = $1
      `
      , [user_id]
    );
    await db.query(
      `
      DELETE FROM public.users
      WHERE user_id = $1
      `
      , [user_id]
    );
    return next();
  } catch(err) {
    return next(err);
  }
 
}
module.exports = userController;