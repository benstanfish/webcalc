'use strict';
let stack = [];
let expFlag = false;

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
      readout.value = '';
      expFlag = false;
      break;
    case 'ArrowDown':
      pull_from_stack();
      break;
    case 'e':
      toggle_eex();
      break;
    case 'd':
    case 'Backspace':
    case 'ArrowLeft':
      readout.value = readout.value.slice(0, -1);
      if (readout.value.length <= 0 && expFlag === true) {
        toggle_eex();
      }
      break;
    case '+':
      // if (readout.value.length !== 0) add_to_history('+');
      break;
    case '-':
      // if (readout.value.length !== 0) add_to_history('-');
      break;
    case '/':
      // if (readout.value.length !== 0) add_to_history('/');
      break;
    case '*':
    case 'x':
      // if (readout.value.length !== 0) add_to_history('*');
      break;
    case '=':
    case 'Enter':
    case 'ArrowUp':
      add_to_stack();
      reset_eex();
      break;
    default:
  }
};

function clear_stack() {
  stack = [];
  for (let i = 0; i < 5; i++) {
    let slot = document.getElementById(`stack${i}`);
    slot.innerText = '';
  }
}

function refresh_stack() {
  for (let i = 0; i < 5; i++) {
    const cell = document.getElementById(`stack${i}`);
    cell.innerText = '';
  }
  if (stack.length > 0) {
    for (let i = 0; i < stack.length; i++) {
      const cell = document.getElementById(`stack${i}`);
      cell.innerText = stack[i];
    }
  }
}

function add_to_stack() {
  if (readout.value != '') {
    stack.unshift(readout.value);
    refresh_stack();
    readout.value = '';
    console.log(stack);
  }
}

function pull_from_stack() {
  let to_readout = stack.shift();
  refresh_stack();
  if (to_readout !== undefined) {
    readout.value = to_readout;
  } else {
    readout.value = '';
  }
}

function swap_xy() {
  const readout = document.getElementById('readout');
  const stack0 = document.getElementById('stack0');
  readout.value.length === 0 ? (readout.value = 0) : readout.value;
  stack0.innerText.length === 0 ? (stack0.innerText = 0) : stack0.innerText;
  let temp = readout.value;
  readout.value = stack0.innerText;
  stack0.innerText = temp;
}

function test_for_leading_zero() {
  const readout = document.getElementById('readout');
  const history = document.getElementById('history');
  if (readout.value.length === 0 && history.value.length === 0) {
    return false;
  } else {
    readout.value = readout.value += '0';
    return true;
  }
}

function test_for_decimal() {
  const readout = document.getElementById('readout');
  if (readout.value.length === 0) {
    return false;
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
