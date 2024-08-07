import express from 'express';
import { longestWord, shortestWord, wordLengths } from './wordgame.js';
import { totalPhoneBill, getPrices, setPrice } from './phonebill.js';
import { enoughAirtime } from './enoughairtime.js';
const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/api/word_game/', function (httpRequest, httpResponse) {
    const sentence = httpRequest.query.sentence;
    const longest = longestWord(sentence);
    const shortest = shortestWord(sentence);
    const sum = wordLengths(sentence);
    httpResponse.json({
        longestWord: longest,
        shortestWord: shortest,
        sum: sum
    });
});

app.post('/api/word_game/longest', function (httpRequest, httpResponse) {
    const sentence = httpRequest.body.sentence;
    const message = longestWord(sentence);
    httpResponse.json({
        message: message ? message : "Please write the sentence that needs to be assessed."
    });
});

app.post('/api/word_game/shortest', function (httpRequest, httpResponse) {
    const sentence = httpRequest.body.sentence;
    const message = shortestWord(sentence)
    httpResponse.json({
        message: message ? message : "Please write the sentence that needs to be assessed."
    });
});

app.post('/api/word_game/length', function (httpRequest, httpResponse) {
    const sentence = httpRequest.body.sentence;
    const message = wordLengths(sentence)
    httpResponse.json({
        message: message ? message : "Please write the sentence that needs to be assessed."
    });
});

app.get('/api/phonebill/prices', function (httpRequest, httpResponse) {
    const prices = getPrices();
    httpResponse.json(prices);
});

app.post('/api/phonebill/total', function (httpRequest, httpResponse) {
    const bill = httpRequest.body.bill;
    const total = totalPhoneBill(bill);
    httpResponse.json({
        total: total
    });
});

app.post('/api/phonebill/price', function (httpRequest, httpResponse) {
    const { type, price } = httpRequest.body;
    setPrice(type, parseFloat(price));
    httpResponse.json({
        status: 'success',
        message: `The price for ${type} was set to ${price}` 
    });
});

app.get('/api/enough', function (httpRequest, httpResponse) {
    const usage = 'call,sms,call';
    const available = 54;
    const result = enoughAirtime(usage, available);
    httpResponse.json({
        result: result
    });
});

app.post('/api/enough', function (httpRequest, httpResponse) {
    const { usage, available } = httpRequest.body;
    const result = enoughAirtime(usage, available);
    httpResponse.json({
        result: result
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`App live http://localhost:${PORT}`);
})