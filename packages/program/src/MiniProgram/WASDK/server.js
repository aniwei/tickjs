const express = require('express');
const cors = require('cors');

const app = express()

app.listen(8081);

app.use(cors());

app.use('/breakpoint', (req, res) => {
  res.end();
})