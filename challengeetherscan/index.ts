import express from "express"
import axios from "axios"
import moment from "moment"
import BigNumber from "bignumber.js"
const app = express();
var {watch} = require('./helper')



app.get('/', async (req, res) => {
   var address  = process.argv.splice(2, 3);
    var result = await watch(address[0]);
    console.log("result:",result)
    // res.send('Hello from express and typescript...');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));