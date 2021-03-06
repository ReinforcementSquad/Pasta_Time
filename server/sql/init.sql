CREATE TABLE public.users (
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  username VARCHAR NOT NULL UNIQUE,
  pwd VARCHAR NOT NULL
);
CREATE TABLE public.posts (
  post_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_title VARCHAR NOT NULL,
  post_content VARCHAR NOT NULL,
  post_time TIMESTAMP NOT NULL,
  user_id INT REFERENCES public.users (user_id)
);
CREATE TABLE public.ingredients (
  ingredient_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  ingredient_name VARCHAR NOT NULL,
  UNIQUE (ingredient_name)
);
CREATE TABLE public.recipe_ingredients (
  ingredient_id INT REFERENCES public.ingredients (ingredient_id),
  post_id INT REFERENCES public.posts,
  amount VARCHAR NOT NULL
);
CREATE TABLE IF NOT EXISTS public.google (
    user_id         INT REFERENCES public.users (user_id),
    google_id       VARCHAR(100),
    email           VARCHAR(100),
    name            VARCHAR(100),
    PRIMARY KEY (google_id),
    UNIQUE (google_id)
);
