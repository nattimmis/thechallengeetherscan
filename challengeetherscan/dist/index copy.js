"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var app = express_1.default();
// const web3 = new Web3("https://ropsten.infura.io/erKFM1jCovzvFHE1wBah");
// BigNumber.config({ ERRORS: false });
function watch() {
    var url = "https://api-ropsten.etherscan.io/api?";
    var key = "apikey=HJ583R13XWNWUZVYB1H8J7XVGRDKEPJK9U";
    var address = "0x81b7e08f65bdf5648606c89998a9cc8164397647";
    axios_1.default.get(url + "module\t=account&action=txlist&address=" + address + "&startblock=0&endblock=99999999&sort=asc&" + key)
        .then(function (res) {
        var result = res.data.result;
        var input = [];
        var output = [];
        var balance = new bignumber_js_1.default(0);
        result.forEach(function (item) {
            console.log("item: " + item);
            var value = new bignumber_js_1.default(item.value);
            var gasUsed = +item.gasUsed;
            var gasPrice = +item.gasPrice;
            var cumGasUsed = +item.cumulativeGasUsed;
            if (item.isError === "0" && item.txreceipt_status !== "0") {
                if (item.to === address) {
                    input.push({
                        value: value,
                        gasUsed: 0,
                        time: moment_1.default.unix(item.timeStamp).format("DD-MM-YYYY").toString(),
                    });
                    balance = balance.plus(value);
                }
                if (item.from === address) {
                    output.push({
                        value: value,
                        gasUsed: gasUsed,
                        time: moment_1.default.unix(item.timeStamp).format("DD-MM-YYYY").toString(),
                    });
                    balance = balance.minus(value);
                    balance = balance.minus(gasUsed * gasPrice);
                }
                if (item.from === item.to) {
                    console.log("self", item.value);
                }
            }
        });
    });
}
app.get('/', function (req, res) {
    watch();
    res.send('Hello from express and typescript...');
});
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("App listening on PORT " + port); });
