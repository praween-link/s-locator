const express = require('express');
const routers = require('./api/routers/routes');
const cors = require('cors');
const app = express();
const port = process.env.APP_PORT;
//
require('./api/models');
//
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
//
app.use(cors());
//
app.use('/api', routers);
app.listen(port, ()=>{
    console.log("App is listening at http://localhost:"+port+"/api.");
});