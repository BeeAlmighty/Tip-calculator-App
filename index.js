const $ = (selector) => document.querySelector(selector);
const bill = $('.bill--amount');
const buttons = document.querySelectorAll('#select--tip');
const resetBtn = $('.disabled');
const errorMsg = $('.error-msg');
const tipAmount = $('.tip--amount');
const totalAmount = $('.total--amount');
const customTipPercentage = $('.custom');
const personQty = $('#person--qty');

const handleClick = (e) => {
  e.preventDefault()
  e.target.classList.add('active')
  generateButtonData(e)
}

buttons.forEach(button => {
  button.addEventListener('click', handleClick)
})

// Handle possible Errors
const handleError = () => {
  if(bill.value && personQty.value){
    resetBtn.classList.remove('disabled')
  }
  if(!personQty.value || personQty.value == 0) {
    errorMsg.style.display = 'flex'
    personQty.classList.add('error')
  } else if(personQty.value > 0) {
    errorMsg.style.display = 'none'
    personQty.classList.remove('error')
  }
}

// Extract the percentage  value from the buttons.
const generateButtonData = (e) => {
  let textCon  = e.target.textContent;
  e.target.textContent.length < 3 ? (
    textCon = e.target.textContent.padStart(3,"0").slice(0, 2)
  ) : (
    textCon = e.target.textContent.slice(0, 2)
  ) 
  generateBill(textCon)
}

//Calculate the amount generated per button click. 
const generateBill = (textCon) => {
  handleError()
  const tip = bill.value * Number(textCon / 100) / personQty.value;
  const billAmount = bill.value / personQty.value;
  const total = Number(billAmount.toFixed(2)) + Number(tip.toFixed(2));
  if(!total || !personQty.value) {
    tipAmount.textContent = '$0.00'
    totalAmount.textContent = '$0.00'
  } else {
    tipAmount.textContent = `$${tip.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`
  }
}
// Generate Custom tip percentage
customTipPercentage.addEventListener('dblclick', (e) => {
  let textCon  = e.target.value >= 0;
  generateBill(textCon)
})

// Reset form.
resetBtn.addEventListener('click', (e) => {
  e.preventDefault()
  tipAmount.textContent = `$0.00`
  totalAmount.textContent = `$0.00`
  personQty.value = '';
  bill.value = '';
  buttons.forEach(button => {
    button.classList.remove('active');
  })
  e.target.classList.add('disabled');
})