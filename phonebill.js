let callCost = 2.75; // these constants tell us that these values will not change as it is given
let smsCost = 0.65;

function totalPhoneBill(billList) {
    const bill = billList.split(', ');
    let total = 0;
    
    for (let i = 0; i < bill.length; i++) {
        const totalBillList = bill[i].trim();
        if (totalBillList.includes('call')) { // The 2 'calls' are added to the 'callCost' of the 'total' then the rest is added to the total 'smsCost'
            total += callCost;
        } else {
            total += smsCost;
        }
    }
    return 'R' + total.toFixed(2); // We want our string to return in the 'Rand' currency format with 2 decimal places put in
}

function getPrices() { // returns current  prices for making a call and sending an SMS
    return {
        call: callCost, // call property is the current cost of the calls made and they are stored in the callCost variable
        sms: smsCost // sms property is the current cost of the sms' made and they are stored in the smsCost variable
    };
}

function setPrice(type, price) { // updates the price of a call or SMS based on the type and price provided
    if (type.includes('call')) {
        callCost = price;
    } else if (type.includes('sms')) {
        smsCost = price;
    } // if the type string includes call or sms, it updates the respective variables to the price that is provided
}

export { totalPhoneBill, getPrices, setPrice }

// const totalBillList = 'call, sms, call, sms, sms';

//   console.log(totalPhoneBill(totalBillList));