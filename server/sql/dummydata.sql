INSERT INTO public.users (username, pwd, google_id)
VALUES ('raph', 'pwd', '3');

INSERT INTO public.posts (post_title, post_content, post_time, user_id)
VALUES ('recipe', 'this is recipe', NOW()::timestamp, 1);

INSERT INTO public.ingredients (ingredient_name)
VALUES ('ramen');

INSERT INTO public.recipe_ingredients (ingredient_id, post_id, amount)
VALUES (1, 1, '3 bags');