function calculate() {
    const expression = document.getElementById("expression").value;
    const outputQueue = shuntingYardAlgorithm(expression);
    const result = evaluateRPN(outputQueue);

    if (result === undefined) {
      document.getElementById("expression").classList.add("invalid");
  } else {
      document.getElementById("expression").classList.remove("invalid");
      document.getElementById("result").innerHTML = result;
  }
  }
  document.getElementById("expression").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      document.getElementById("enter-button").click();
    }
  });

  function isNumber(token) {
    return !isNaN(parseFloat(token)) && isFinite(token);
  }
  
  function hasHigherPrecedence(op1, op2) {
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '^': 3,
    };
    return precedence[op1] > precedence[op2];
  }
  
  function isLeftAssociative(op) {
    return ['+', '-', '*', '/'].includes(op);
  }
  
  function shuntingYardAlgorithm(expression) {
    const tokens = expression.match(/(?<!\d)\d+(?:\.\d+)?|[+\-*/^(),]/g);
    const outputQueue = [];
    const operatorStack = [];
    try{
        tokens.length
    }catch{
        return undefined
    }
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (isNumber(token)) {
        outputQueue.push(token);
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        while (operatorStack[operatorStack.length - 1] !== '(') {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop(); // Discard the left parenthesis
  
        if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          outputQueue.push(operatorStack.pop());
        }
      } else if (token === ',') {
        while (operatorStack[operatorStack.length - 1] !== '(') {
          outputQueue.push(operatorStack.pop());
        }
      } else { // token is an operator
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== '(' &&
          (hasHigherPrecedence(operatorStack[operatorStack.length - 1], token) ||
          (operatorStack[operatorStack.length - 1] === token && isLeftAssociative(token)))
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      }
    }
  
    while (operatorStack.length > 0) {
      if (operatorStack[operatorStack.length - 1] === '(') {
        throw new Error("Mismatched parentheses.");
      }
      outputQueue.push(operatorStack.pop());
    }
  
    return outputQueue;
  }
  
  function evaluateRPN(expression) {
    const stack = [];
    try{
        expression.length
    }catch{
        return undefined
    }
    for (let i = 0; i < expression.length; i++) {
      const token = expression[i];
      if (isNumber(token)) {
        stack.push(parseFloat(token));
      } else if (['+', '-', '*', '/', '^'].includes(token)) {
        if (stack.length < 2) {
            return undefined
          // throw new Error("Invalid expression.");
        }
        const operand2 = stack.pop();
        const operand1 = stack.pop();
        let result;
        switch (token) {
          case '+':
            result = operand1 + operand2;
            break;
          case '-':
            result = operand1 - operand2;
            break;
          case '*':
            result = operand1 * operand2;
            break;
          case '/':
            result = operand1 / operand2;
            break;
          case '^':
            result = Math.pow(operand1, operand2);
            break;
          // Add more functions as needed
        }
        stack.push(result);
      }
    }
  
    if (stack.length !== 1) {
      throw new Error("Invalid expression.");
    }
    return stack[0];
  }
  
  
