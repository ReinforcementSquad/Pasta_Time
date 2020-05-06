const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passportSetup');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const PORT = 3000;

const postRouter = require("./routes/posts.js");
const userRouter = require("./routes/user-routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, '../client')));

/* Cookie Session */
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000, // 24 hour cookie
//   keys:[keys.session.cookieKey]
// }));

/* Passport Initalize */
app.use(passport.initialize());
app.use(passport.session());

/* Endpoints */

app.use("/posts", postRouter);
app.use("/users", userRouter);
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});


/* Routes */

app.use('/auth', authRoutes, (req, res) => {
  res.send('hey')
});

/* Global error handlers */

app.use('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
    const defaultErr = {
        log: "An global error has occured",
        status: 400,
        err: { err: 'An error has occured in the server'}
    };
    Object.assign(defaultErr, err);
    return res.status(defaultErr.status).json(defaultErr);
});

/* Port Listener */
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;