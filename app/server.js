const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const MESSAGE =
  process.env.MESSAGE || "Default Message";

app.get('/', (req, res) => {
  res.send(`<h1>${MESSAGE}</h1>`);
});

app.get('/health', (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
