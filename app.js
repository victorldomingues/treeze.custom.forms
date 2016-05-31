var express = require('express');
var app = express();

app.use(express.static(__dirname ));

app.get('/', function (req, res) {
    res.send('Hello World!');
});



app.listen(8087, function () {
    console.log('Example app listening on port 8087!');
});
