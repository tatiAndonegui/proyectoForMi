const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { initDBInstance } = require('./db/connection');

const app = express();
const port = 5050;

const authenticationRoutes = require('./routes/authentication');
const recipiesRoutes = require('./routes/recipies');

app.use(cors());
app.use(bodyParser.json());
app.use(authenticationRoutes)
app.use(recipiesRoutes)

app.listen(port, () => {
    initDBInstance();
    console.log(`Api ready listen ${port}`)
  })