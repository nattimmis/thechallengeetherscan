import axios from "axios"
import moment from "moment"
import BigNumber from "bignumber.js"
const fs = require('fs');

export async function testWatch() {
    var successFlag = true;
    const url = "https://api-ropsten.etherscan.io/api?";
    const key = "apikey=HJ583R13XWNWUZVYB1H8J7XVGRDKEPJK9U";
    const address = "0x81b7e08f65bdf5648606c89998a9cc8164397647";
    const RequestURL = `${url}module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&${key}`;
    console.log("RequestURL:",RequestURL);
    await axios.get(RequestURL)
        .then(res => {
            console.log("res: " + res)
        const result = res.data.result;

        const input = [];
        const output = [];
        
        var stream = fs.createWriteStream("OUTPUT.txt", {flags:'a'});
        result.forEach((item:any) => {
            stream.write('MINT'+' '+item.value+' '+item.from+ "\n", async function (err:any) {
                if (err) {
                // append failed
                successFlag = false;
                console.log("Write in file failed",err)
                } else {
                // done
                 successFlag = true;
                console.log("Write in file Successful")
                }
            })
        });
        // return true;

    }).catch(err => console.log(err))

    return successFlag;
    
}