const express = require('express');

const app = express();

app.listen(3001);
app.get('/abc', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ data: 'Hello' });
});
