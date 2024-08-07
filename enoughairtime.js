export function enoughAirtime(airtimeUsage, airtime) {
    const callCost = 1.88;
    const smsCost = 0.75;
    const dataCost = 12;
    var bill = airtimeUsage.split(',');
    var sum = 0;

    for (let i = 0; i < bill.length; i++) {
        var totalBill = bill[i].trim();
        if (totalBill === 'call') {
            sum += callCost;
        } else if (totalBill === 'data') {
            sum += dataCost;
        } else if (totalBill === 'sms') {
            sum += smsCost;
        }
    }

    var totalAirtime = airtime - sum;
    var finalTotalAirtime = 'R' + totalAirtime.toFixed(2);
    if (totalAirtime < 0.00) {
        return 'Insufficient Funds';
    }
    return finalTotalAirtime;
}

// const airtimeUsage = 'call,call,call,data,sms,sms,call,data';
// const availableAirtime = 50;
// console.log(enoughAirtime(airtimeUsage, availableAirtime));