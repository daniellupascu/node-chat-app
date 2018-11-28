const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

// const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/public');
// console.log(publicPath);