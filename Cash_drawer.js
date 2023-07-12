const currUnitMul100 = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
}

function checkCashRegister(price, cash, cid) {

  let changeReturn = cash - price;
  let changeTotal = changeReturn;

  let change = [];
  let status = null;

  let cidTotal = 0;
  let filteredCid = cid.filter(value => value[1] > 0).reverse();
  //check if any remain unit value > 0, copy them to new array and sort from highest to lowest unit

  filteredCid.forEach(currency => {
    let currName = currency[0];
    let currValue = currency[1];
    let amountOfunit = 0;

    cidTotal += currValue;
    while (changeReturn >= currUnitMul100[currName] && currValue > 0) {
      amountOfunit += currUnitMul100[currName];
      changeReturn -= currUnitMul100[currName];
      currValue -= currUnitMul100[currName];
    }

    if (amountOfunit !== 0) {
      change.push([currName, amountOfunit]);
    }
  });

  if (changeReturn > 0) {
    status = 'INSUFFICIENT_FUNDS';
    change = [];
  } else if (changeReturn == 0 && changeTotal == cidTotal) {
    status = 'CLOSED';
    change = cid;
  } else {
    status = 'OPEN';
  }
  return { 'status': status, 'change': change };
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));