const express = require('express');
const path = require('path');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = expressHandlebars.create({ helpers });

const sess = {
  secret: 'Super secret',
  cookie: {
    maxAge: 30000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.use(routes);

// Database synchronization
sequelize.sync({ force: false }).then(() => {
  // Start the server
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
