function eval() {
    // Do not use eval!!!
    return;
  }
  
  function expressionCalculator(expr) {
    let arr = [];
    if (/\s/.test(expr)) {
      arr = expr.split(/\s+/);
    } else {
      arr = expr.split('');
    }
    let final = [];
    let stack = [];
    let level = {
      '+': 2,
      '-': 2,
      '*': 3,
      '/': 3
    };
    arr.map(e => {
      // if number
      if (/\d+/gi.test(e)) {
        final.push(e);
        // if operator:
      } else if (/[\-+*/]/gi.test(e)) {
        while (
          level[stack[stack.length - 1]] >= level[e] &&
          stack[stack.length - 1] !== '('
        ) {
          final.push(stack.pop());
        }
        stack.push(e);
      } else if (e === '(') {
        stack.push(e);
      } else if (e === ')') {
        while (stack[stack.length - 1] !== '(') {
          final.push(stack.pop());
        }
        if (stack[stack.length - 1] === '(') {
          stack.pop();
        }
      }
    });
    while (stack.length !== 0) {
      final.push(stack.pop());
    }
  
    function changeNums(num) {
      calcRes.pop();
      calcRes.pop();
      calcRes.push(num);
    }
    let calcRes = [];
    let divByZero = final.some(e => {
      let calcNum;
      if (/\d+/gi.test(e)) {
        calcRes.push(e);
      }
      switch (e) {
        case '*':
          calcNum = calcRes[calcRes.length - 2] * calcRes[calcRes.length - 1];
          changeNums(calcNum);
          break;
        case '/':
          if (calcRes[calcRes.length - 1] == 0) {
            return 1;
          }
          calcNum = calcRes[calcRes.length - 2] / calcRes[calcRes.length - 1];
          changeNums(calcNum);
          break;
        case '-':
          calcNum = calcRes[calcRes.length - 2] - calcRes[calcRes.length - 1];
          changeNums(calcNum);
          break;
        case '+':
          calcNum =
            parseFloat(calcRes[calcRes.length - 2]) +
            parseFloat(calcRes[calcRes.length - 1]);
          changeNums(calcNum);
          break;
      }
    });
  
    if (isNaN(calcRes[0])) {
      throw 'ExpressionError: Brackets must be paired';
    } else if (divByZero) {
      throw 'TypeError: Division by zero.';
    } else {
      return calcRes[0];
    }
  }
  
  module.exports = {
    expressionCalculator
  };