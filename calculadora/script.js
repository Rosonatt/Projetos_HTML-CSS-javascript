const display = document.getElementById("display");
let currentCalculation = "";
let lastResult = 0;
let memoryValue = 0;

function updateDisplay(value) {
  display.value = value;
}

document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    switch(value) {
      case 'ON/C/CE':
        currentCalculation = "";
        updateDisplay("");
        break;

      case 'MRC':
        updateDisplay(memoryValue);
        currentCalculation = memoryValue.toString();
        break;

      case 'M+':
        memoryValue += parseFloat(display.value || 0);
        break;

      case 'M-':
        memoryValue -= parseFloat(display.value || 0);
        break;

      case '=':
        try {
          currentCalculation = currentCalculation.replace('×', '*').replace('÷', '/');
          const result = eval(currentCalculation);
          lastResult = result;
          updateDisplay(Number.isInteger(result) ? result : result.toFixed(2));
          currentCalculation = result.toString();
        } catch(e) {
          updateDisplay("ERROR");
          setTimeout(() => updateDisplay(""), 1500);
          currentCalculation = "";
        }
        break;

      case '%':
        if (currentCalculation) {
          const current = parseFloat(currentCalculation);
          const percentage = current / 100;
          updateDisplay(percentage);
          currentCalculation = percentage.toString();
        }
        break;

      case 'GT':
        updateDisplay(lastResult);
        currentCalculation = lastResult.toString();
        break;

      default:
        if ('0123456789.'.includes(value)) {
          if (value === '.' && currentCalculation.includes('.')) return;
          if (value === '0' && currentCalculation === '0') return;
          if (currentCalculation === '0' && value !== '.') {
            currentCalculation = value;
          } else {
            currentCalculation += value;
          }
        } else if ('+-×÷'.includes(value)) {
          if (currentCalculation.match(/[+\-×÷]$/)) {
            currentCalculation = currentCalculation.slice(0, -1) + value;
          } else {
            currentCalculation += value;
          }
        }
        updateDisplay(currentCalculation);
    }
  });
});
