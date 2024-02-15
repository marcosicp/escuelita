//Install express server
const express = require('express');
const path = require('path');
const app = express();
// const cors = require('cors')({origin: true});

// Automatically allow cross-origin requests
// cors(req, res, () => {});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/'));

app.get('/*', function(req,res) {
    // res.set("Connection", "close");
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);