'use strict';
let stack = [];

document.onkeyup = (keyUpEvent) => {
  const readout = document.getElementById('readout');
  switch (keyUpEvent.key) {
    case '0':
      test_for_leading_zero();
      break;
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
      break;
    case 'e':
      test_for_exp();
      break;
    case 'd':
    case 'Backspace':
      readout.value = readout.value.slice(0, -1);
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
      if (readout.value != '') {
        stack.unshift(readout.value);
        add_stack();
        readout.value = '';
      }
      break;
    default:
  }
};

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
  } else if (readout.value.indexOf('.') > 0) {
    return false;
  } else {
    readout.value = readout.value += '.';
    return true;
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

function add_stack() {
  if (stack.length > 0) {
    for (let i = 0; i < stack.length; i++) {
      let slot = document.getElementById(`stack${i}`);
      slot.innerText = stack[i];
    }
  }
}

function clear_stack() {
  for (let i = 0; i < stack.length; i++) {
    stack.pop(i);
  }
  for (let i = 0; i < 4; i++) {
    let slot = document.getElementById(`stack${i}`);
    slot.innerText = '';
  }
}
