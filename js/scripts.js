'use strict';
let stack = [0, 0, 0, 0, 0];
let expFlag = false;
let degFlag = true;
let normTrigFlag = true;

const themeButton = document.getElementById('theme-icon');
const themeCss = document.getElementById('theme-css');

window.onload = () => {
  refresh_stack();
  const checkUserTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const themeHistory = localStorage.getItem('storedTheme');

  if (themeHistory != null) {
    themeCss.setAttribute('href', `css/styles-${themeHistory}.css`);
  } else if (checkUserTheme.matches) {
    themeCss.setAttribute('href', 'css/styles-dark.css');
    localStorage.setItem('storedTheme', 'dark');
  } else {
    localStorage.setItem('storedTheme', 'light');
  }

  if (themeCss.getAttribute('href') === 'css/styles-dark.css') {
    themeButton.innerText = 'dark_mode';
    themeButton.style.color = 'goldenrod';
  } else {
    themeButton.innerText = 'light_mode';
    themeButton.style.color = 'tomato';
  }
};

themeButton.addEventListener('click', () => {
  if (themeCss.getAttribute('href') === 'css/styles-dark.css') {
    themeCss.setAttribute('href', 'css/styles-light.css');
    themeButton.innerText = 'light_mode';
    themeButton.style.color = 'tomato';
    localStorage.setItem('storedTheme', 'light');
  } else {
    themeCss.setAttribute('href', 'css/styles-dark.css');
    themeButton.innerText = 'dark_mode';
    themeButton.style.color = 'goldenrod';
    localStorage.setItem('storedTheme', 'dark');
  }
});

document.onkeyup = (keyUpEvent) => {
  const readout = document.getElementById('readout');
  switch (keyUpEvent.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      readout.value += keyUpEvent.key;
      break;
    case '.':
      test_for_decimal();
      break;
    case 'Delete':
      clear_stack();
      readout.value = '';
      expFlag = false;
      break;
    case 'ArrowDown':
      cycle_stack_down();
      break;
    case 'ArrowUp':
      cycle_stack_up();
      break;
    case 'e':
      readout.value += 'e';
      break;
    case 'd':
    case 'Backspace':
    case 'ArrowLeft':
      readout.value = readout.value.slice(0, -1);
      // if (readout.value.length <= 0 && expFlag === true) {
      //   toggle_eex();
      // }
      break;
    case '+':
      xy_sum();
      break;
    case '-':
      xy_diff();
      break;
    case '/':
      xy_div();
      break;
    case '*':
    case 'x':
      xy_times();
      break;
    case '=':
    case 'Enter':
      add_to_stack();
      // reset_eex();
      break;
      xy_sum();
    default:
  }
};

function refresh_stack() {
  for (let i = 0; i < stack.length; i++) {
    const cell = document.getElementById(`stack${i}`);
    cell.innerText = stack[i];
  }
}

function clear_stack() {
  stack = [0, 0, 0, 0, 0];
  refresh_stack();
}

function add_to_stack() {
  const readout = document.getElementById('readout');
  if (readout.value != '') {
    let x = Number(readout.value);
    stack.push(x);
    stack.shift();
    refresh_stack();
    readout.value = '';
    console.log(stack);
  }
}

function pull_from_stack() {
  const readout = document.getElementById('readout');
  let to_readout = stack.shift();
  refresh_stack();
  if (to_readout !== undefined) {
    readout.value = to_readout;
  } else {
    readout.value = '';
  }
}

function cycle_stack_down() {
  const readout = document.getElementById('readout');
  let from_readout = '0';
  if (readout.value.length != 0) {
    from_readout = readout.value;
  }
  let to_readout = stack.pop();
  stack.unshift(from_readout);
  refresh_stack();
  if (to_readout !== undefined) {
    readout.value = to_readout;
  } else {
    readout.value = '';
  }
}

function cycle_stack_up() {
  const from_stack0 = document.getElementById('stack0').innerText;
  const from_readout = document.getElementById('readout').value;
  stack.shift();
  stack.push(from_readout);
  document.getElementById('readout').value = from_stack0;
  refresh_stack();
}

function swap_xy() {
  const readout = document.getElementById('readout');
  const history = document.getElementById('stack4');
  readout.value.length === 0 ? (readout.value = 0) : readout.value;
  history.innerText.length === 0 ? (history.innerText = 0) : history.innerText;
  let temp = readout.value;
  readout.value = history.innerText;
  history.innerText = temp;
}

// function test_for_leading_zero() {
//   const readout = document.getElementById('readout');
//   const history = document.getElementById('history');
//   if (readout.value.length === 0 && history.value.length === 0) {
//     return false;
//   } else {
//     readout.value = readout.value += '0';
//     return true;
//   }
// }

function test_for_decimal() {
  const readout = document.getElementById('readout');
  if (readout.value.length === 0) {
    readout.value += '0.';
    return true;
  } else if (readout.value.indexOf('.') >= 0) {
    return false;
  } else {
    readout.value = readout.value += '.';
    return true;
  }
}

function toggle_eex() {
  const btn = document.getElementById('eex');
  const readout = document.getElementById('readout');
  if (readout.value.length > 0) {
    readout.value += 'e';
  } else {
    readout.value = 1;
  }
  expFlag = !expFlag;
  if (expFlag) {
    btn.classList.add('warning');
    btn.classList.remove('secondary');
  } else {
    btn.classList.add('secondary');
    btn.classList.remove('warning');
  }
  if (readout.value.length > 0 && readout.value.indexOf('e') < 1) {
    readout.value += 'e';
  } else {
  }
}

function reset_eex() {
  expFlag = false;
  const btn = document.getElementById('eex');
  btn.classList.add('secondary');
  btn.classList.remove('warning');
}

function change_sign() {
  const readout = document.getElementById('readout');
  if (expFlag) {
    let vals = readout.value.split('e');
    let pow = vals[1];
    if (pow.indexOf('-') >= 0) {
      pow = pow.replace('-', '');
    } else {
      pow = '-' + pow;
    }
    readout.value = vals[0] + 'e' + pow;
  } else {
    if (readout.value.indexOf('-') === 0) {
      readout.value = readout.value.replace('-', '');
    } else {
      readout.value = '-' + readout.value;
    }
  }
}

function add_to_history(arg) {
  const readout = document.getElementById('readout');
  const history = document.getElementById('history');
  if (history.value.length === 0) {
    history.value += readout.value + ' ' + arg;
    readout.value = '';
  } else {
    history.value += ' ' + readout.value + ' ' + arg;
    readout.value = '';
  }
}

// Basic Operations
function xy_sum() {
  readout.value = Number(stack4.innerText) + Number(readout.value);
}
function xy_diff() {
  readout.value = Number(stack4.innerText) - Number(readout.value);
}
function xy_times() {
  readout.value = Number(stack4.innerText) * Number(readout.value);
}
function xy_div() {
  readout.value = Number(stack4.innerText) / Number(readout.value);
}

function reciprocal() {
  readout.value = 1 / Number(readout.value);
}

function get_pi() {
  readout.value = Math.PI;
}

function get_e() {
  readout.value = Math.E;
}

function exp_y(power = undefined) {
  const from_readout = Number(readout.value);
  const from_stack = Number(stack4.innerText);

  readout.value = from_readout ** (power || from_stack);
}

function e_x() {
  const from_readout = Number(readout.value);
  readout.value = Math.E ** from_readout;
}

function ln_x() {
  const from_readout = Number(readout.value);
  readout.value = Math.log(from_readout);
}

function log_x() {
  const from_readout = Number(readout.value);
  readout.value = Math.log10(from_readout);
}

function y_root(power = undefined) {
  const from_readout = Number(readout.value);
  const from_stack = Number(stack4.innerText);

  readout.value = from_readout ** (1 / (power || from_stack));
}

function y_mod_x() {
  const from_readout = Number(readout.value);
  const from_stack = Number(stack4.innerText);

  readout.value = from_stack % from_readout;
}

function div_int() {
  const from_readout = Number(readout.value);
  const from_stack = Number(stack4.innerText);

  readout.value = Math.trunc(from_stack / from_readout);
}

function div_dec() {
  const from_readout = Number(readout.value);
  const from_stack = Number(stack4.innerText);

  readout.value =
    from_stack / from_readout - Math.trunc(from_stack / from_readout);
}

function toggle_deg() {
  const degBtn = document.getElementById('degBtn');
  degFlag = !degFlag;
  if (!degFlag) {
    degBtn.classList.remove('info');
    degBtn.classList.add('warning');
    degBtn.value = 'RAD';
  } else {
    degBtn.classList.remove('warning');
    degBtn.classList.add('info');
    degBtn.value = 'DEG';
  }
}

function toggle_reciprocal() {
  const normTrigBtn = document.getElementById('normTrigBtn');

  const sinBtn = document.getElementById('sin');
  const cosBtn = document.getElementById('cos');
  const tanBtn = document.getElementById('tan');
  const asinBtn = document.getElementById('asin');
  const acosBtn = document.getElementById('acos');
  const atanBtn = document.getElementById('atan');
  const btns = [sinBtn, cosBtn, tanBtn, asinBtn, acosBtn, atanBtn];
  normTrigFlag = !normTrigFlag;
  if (!normTrigFlag) {
    normTrigBtn.classList.remove('info');
    normTrigBtn.classList.add('warning');
    normTrigBtn.value = '1/TRIG';
    sinBtn.value = 'CSC';
    cosBtn.value = 'SEC';
    tanBtn.value = 'COT';
    asinBtn.value = 'ACSC';
    acosBtn.value = 'ASEC';
    atanBtn.value = 'ACOT';
    btns.forEach((element) => {
      element.classList.remove('secondary');
      element.classList.add('primary');
    });
  } else {
    normTrigBtn.classList.remove('warning');
    normTrigBtn.classList.add('info');
    normTrigBtn.value = 'TRIG';
    sinBtn.value = 'SIN';
    cosBtn.value = 'COS';
    tanBtn.value = 'TAN';
    asinBtn.value = 'ASIN';
    acosBtn.value = 'ACOS';
    atanBtn.value = 'ATAN';
    btns.forEach((element) => {
      element.classList.remove('primary');
      element.classList.add('secondary');
    });
  }
}
function trig(func) {
  const funcs = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
  };
  const x =
    degFlag === false
      ? Number(readout.value)
      : (Number(readout.value) * Math.PI) / 180;
  readout.value = normTrigFlag === true ? funcs[func](x) : 1 / funcs[func](x);
}
function aTrig(func) {
  const funcs = {
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
  };
  let x = readout.value;
  x = normTrigFlag === true ? funcs[func](x) : 1 / funcs[func](x);
  readout.value = degFlag === false ? x : (x * 180) / Math.PI;
}

function to_deg() {
  const x = readout.value;
  readout.value = (x * 180) / Math.PI;
}
function to_rad() {
  const x = readout.value;
  readout.value = (x * Math.PI) / 180;
}

function factorial() {
  let x = Math.floor(readout.value);
  if (x === 0 || x === 1) {
    readout.value = x;
  }
  for (let i = x - 1; i > 0; i--) {
    x *= i;
  }
  readout.value = x;
}
function factorialize(x) {
  if (x === 0 || x === 1) {
    readout.value = x;
  }
  for (let i = x - 1; i > 0; i--) {
    x *= i;
  }
  return x;
}

function perm() {
  const y = Number(readout.value);
  const x = Number(stack4.innerHTML);
  readout.value = factorialize(x) / factorialize(x - y);
}

function comb() {
  const y = Number(readout.value);
  const x = Number(stack4.innerText);
  readout.value = factorialize(x) / (factorialize(y) * factorialize(x - y));
}
