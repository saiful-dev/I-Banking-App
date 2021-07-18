'use strict';
// I Banking App

// Initial Data 
const account1 = {
  owner: 'Saiful Islam',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Sabbir Ahmed',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Hridoy Khan',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Will Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const ControlMovements=function(movements){

  containerMovements.innerHTML=''; // for remove the date test of html 
  movements.forEach(function(value,index){
    const type=value>0? 'deposit':'withdrawal';
    const html=`
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
      <div class="movements__value"> ${value}</div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin',html);
    //beforeend: means 1....10, afterends means: 10...1
      
  });

}; // closeing controlMovements


// current Balance calculation part

const displaybanlance=function(movement){
    const balance=movement.reduce((acc=0,value) => acc+value);
    labelBalance.textContent=`${balance}€`;
};


// display summary of balance in

const displaySummary=function(account){
  const Incomes=account.movements
                        .filter(val=> val>0)
                        .reduce((acc=0,val) => acc +=val); //acc= accumulator
  labelSumIn.textContent=`${Incomes}€`;

  const outComes=account.movements
                          .filter(val=> val<0)
                          .reduce((acc=0,val) => acc +=val);
  labelSumOut.textContent=`${Math.abs(outComes)}€`;
  //for interest
  const interest=account.movements.filter(val=> val>0)
            .map(val =>(val*account.interestRate)/100)
            .filter(val =>{// only count interest>1
                  return  val>1;
            })
            .reduce((acc=0,val) => acc +=val);
labelSumInterest.textContent=`${interest}€`;

};


//Computing Usernames
// console.log('Computing Username');
// const user='Md Saiful Islam'; //we need=>msi

// const CreateUsernames=function(user){
//   const username=user.toLowerCase()
//   .split(' ')
//   .map(name=>name[0]).join(''); //Arrow Callback Function
//   return username;
// }
// console.log(CreateUsernames(user));

//replacing code for this program

const CreateUsernames=function(account){
  account.forEach(function(acc){
    acc.username=acc.owner
    .toLowerCase()
    .split(' ')
    .map(name=>name[0])
    .join(''); 
    
  });
};
CreateUsernames(accounts);
//console.log(accounts);

// Login Controller
let currentAccount; //need currentacount to hold current user to display other data
btnLogin.addEventListener('click',function(e){ //e means events arguments
  //prevent default form from submitting
  e.preventDefault();
  currentAccount= accounts.find(val => val.username === inputLoginUsername.value)
  console.log(currentAccount);

  //pin check
  // ? is optional chaining, bcz when user not exit..then handle the error 
  if(currentAccount?.pin === Number(inputLoginPin.value)){
      //display UI and welcome message
      labelWelcome.textContent=`Welcome, ${currentAccount.owner.split(' ')[0]}`;
      containerApp.style.opacity=100;

      //clean input fields
      inputLoginUsername.value=inputLoginPin.value='';
      //inputLoginPin.blur(); //The blur() method is used to remove focus from an element.

      //display movement
      ControlMovements(currentAccount.movements);

      //display balance
      displaybanlance(currentAccount.movements);

      //display summary
      displaySummary(currentAccount);
  }


});













