const loanAmtInput = document.querySelector(".loan_amt");
const interestRateInput = document.querySelector(".interest_rate");
const loanPeriodInput = document.querySelector(".loan_period");

const loanEMIValue = document.querySelector(".loan_emi .value");
const totalInterestValue = document.querySelector(".total_interest .value");
const totalAmtValue = document.querySelector(".total_amt .value");

const calBtn = document.querySelector(".cal_btn");

let loanAmt = parseFloat(loanAmtInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanPeriod = parseFloat(loanPeriodInput.value);

let interest = interestRate / 12 / 100;

let myChart;

const checkValues = () => {
  let loanAmtValue = loanAmtInput.value;
  let interestRateValue = interestRateInput.value;
  let loanPeriodValue = loanPeriodInput.value;

  let regexNumber = /^[0-9]+$/;
  if (!loanAmtValue.match(regexNumber)) {
    loanAmtInput.value = "10000";
  }

  if (!loanPeriodValue.match(regexNumber)) {
    loanPeriodInput.value = "12";
  }

  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = "7.5";
  }
};

const displayChart = (totalInterestValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type : "pie",
    data: {
      labels: ["Total Interest", "Principal Loan Amount"],
      datasets: [
        {
          data: [totalInterestValue, loanAmt],
          backgroundColor: ["#e63946", "#14213d"],
          borderWidth: 0,
        },
      ],
    },
  });
};

const updateChart = (totalInterestValue) => {
  myChart.data.datasets[0].data[0] = totalInterestValue;
  myChart.data.datasets[0].data[1] = loanAmt;
  myChart.update();
};

const refreshInputValues = () => {
  loanAmt = parseFloat(loanAmtInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanPeriod = parseFloat(loanPeriodInput.value);
  interest = interestRate / 12 / 100;
};

const calEMI = () => {
  checkValues();
  refreshInputValues();
  let emi =
    loanAmt *
    interest *
    (Math.pow(1 + interest, loanPeriod) /
      (Math.pow(1 + interest, loanPeriod) - 1));

  return emi;
};

const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);

  let totalAmount = Math.round(loanPeriod * emi);
  totalAmtValue.innerHTML = totalAmount;

  let totalInterest = Math.round(totalAmount - loanAmt);
  totalInterestValue.innerHTML = totalInterest;

  if (myChart) {
    updateChart(totalInterest);
  } else {
    displayChart(totalInterest);
  }
};

const init = () => {
  let emi = calEMI();
  updateData(emi);
};

init();

calBtn.addEventListener("click", init);