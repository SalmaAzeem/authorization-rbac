const express = require('express');
const connection = require('./config/db');
const dotenv = require('dotenv');
const { initDB } = require('./utils/lowdb');

dotenv.config();
connection();
initDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// routes
const access = require("./routes/access.routes");
const auth = require("./routes/auth.routes");
const user = require("./routes/user.routes");

app.use('/api/auth', auth);
app.use('/api', user);
app.use('/api', access);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
