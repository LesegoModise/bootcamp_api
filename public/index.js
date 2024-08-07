document.addEventListener('alpine:init', () => {
    Alpine.data('bootcampAPIWidget', () => ({
        sentence: '',
        warning: '',
        result: null,
        bill: '',
        callPrice: 2.75,
        smsPrice: 0.65,
        initialCallPrice: 2.75,
        initialSmsPrice: 0.65,
        newCallPrice: null,
        newSmsPrice: null,
        total: null,
        prices: {},
        message: '',
        timeoutId: null,
        usage: '',
        available: null,
        airtimeResult: null,
        airtimeMessage: '',

        async analyseSentence() { //asynchronous method that will handle operations that return a promise

            if (this.sentence.trim() === '') {
                this.warning = 'Please enter the sentence you want to analyse.';
                this.result = null;
                setTimeout(() => {
                    this.warning = '';
                }, 5000);
                return;
            }

            const response = await fetch(`http://localhost:3000/api/word_game?sentence=${encodeURIComponent(this.sentence)}`);
            this.result = await response.json();
            // if fetch input is valid, it will send a network request to the url I have specified to fetch data and await just pauses the execution until the request is complete and returns a response
            // fetch function is used to make an HTTP request and the URL is dynamically constructed with the user's sentence whis is URL-encoded to handle special characters properly
            // once the response is received, it is parsed as JSON and the resulting data from the response is assigned to the result property where it will be stored.
        },
        clearSentence() {
            this.sentence = '';
            this.result = null; //this removes the previous analysis result that way making the clear method resets all related data.
            this.warning = '';
        },

        async getPrices() {
            const response = await axios.get('http://localhost:3000/api/phonebill/prices');
            // axios is used to make a GET request for the endpoint in the URL so that it can retrieve phone bill prices.
            this.callPrice = response.data.call;
            this.smsPrice = response.data.sms;
            // sets the call and sms price to the value obtained from the API response (current price)
        },
        async updatePrice(type, price) { //updates the price and takes two param
            if (price > 10) {
                this.message = `The ${type} price cannot exceed R10.`;
                setTimeout(() => {
                    this.message = '';
                }, 5000);
                return; // exit method if the price is invalid
            }

            const response = await axios.post('http://localhost:3000/api/phonebill/price', {
                type,
                price
                // sends POST request to update the prices
            });
            this.message = response.data.message;
            setTimeout(() => {
                this.message = '';
            }, 5000);
            await this.getPrices(); // this ensures that the new prices are up-to-date
        },
        async calculateTotal() {
            if (this.bill.trim() === '') {
                this.message = 'Please enter the bill you wish to calculate.';
                setTimeout(() => {
                    this.message = '';
                }, 5000);
                return;
            }

            const response = await axios.post('http://localhost:3000/api/phonebill/total', {
                bill: this.bill
                // sends POST request to calculate total amount based on the bill given
            });
            this.total = response.data.total; // updates the total property with the result from the API response
        },
        clearBill() {
            this.bill = '';
            this.total = null;
            this.message = '';
        },
        resetPrices() {
            // this.newCallPrice = null;
            // this.newSmsPrice = null;
            this.callPrice = this.initialCallPrice;
            this.smsPrice = this.initialSmsPrice;
            this.message = 'Prices reset to initial values.';
            setTimeout(() => {
                this.message = '';
            }, 5000);
        },
        clearNewPrices() {
            this.newCallPrice = null;
            this.newSmsPrice = null;
            this.message = 'New prices cleared.';
            setTimeout(() => {
                this.message = '';
            }, 5000);
        },
        init() {
            this.getPrices();
        },

        async checkAirtime() {
            if (this.usage.trim() === '' || this.available === null) {
                this.airtimeMessage = 'Please enter the usage and available airtime.';
                this.airtimeResult = null;
                setTimeout(() => {
                    this.airtimeMessage = '';
                }, 5000);
                return;
            }

            const response = await axios.post('http://localhost:3000/api/enough', {
                usage: this.usage,
                available: this.available
                // sends POST request to the API endpoint and waits for the request to be completed before it returns a response
            });
            this.airtimeResult = response.data.result; // updates the property with the result obtained from the API which indicated whether the airtime available is sufficient for the usage.
        },
        clearAirtime() {
            this.usage = '';
            this.available = null;
            this.airtimeResult = null;
            this.airtimeMessage = '';
        }
        // updateCallPrice() {
        //     this.updatePrice('call', parseFloat(this.newCallPrice));
        // },
        // updateSmsPrice() {
        //     this.updatePrice('sms', parseFloat(this.newSmsPrice));
        // }
    }));
});