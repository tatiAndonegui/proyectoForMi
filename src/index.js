const express = require('express')
const app = express()
const port = 3000
const urlPublic = require('./endpoints/urlPublic');
// const urlPrivate = require('./endpoints/urlPrivate');
// app.use(urlPrivate);
app.use(urlPublic);

app.listen(port, () => {
  console.log(`estoy leesto`)
})