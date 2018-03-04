const express = require('express');
const app = express();

app.listen(3001, () => {
    console.log('Express server listening on port 3001');
});

app.get('/api', (req, res) => {
    res.send({'response': 'API is running'});
});