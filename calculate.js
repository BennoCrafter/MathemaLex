function calculate() {
    var calculation = document.getElementById("calculation").value;
    var result;
    tokens = [];
    validOperators = ["+", "-", "*", "/"];
    var currentToken = "";
    
    function little_calculate(num1, op, num2){
        if (op === "+"){
            return num1 + num2
        }
        if (op === "-"){
            return num1 - num2
        }
        if (op === "*"){
            return num1 * num2
        }
        if (op === "/"){
            return num1 / num2
        }
    }
    lexer(calculation);
    function lexer(calculation){
        for (let i = 0; i < calculation.length; i++) {
            let char = calculation[i];
            if (!isNaN(char)) {
              currentToken += char;
            } else if (validOperators.includes(char)) {
              if (currentToken !== "") {
                tokens.push(["INTEGER", parseInt(currentToken)]);
                currentToken = "";
              }
              tokens.push(["OP", char]);
            } else if (char.match(/[a-z]/i)) {
              tokens.push(["VAR", char]);
            }
          }
          
          // Add the last number if it exists
          if (currentToken !== "") {
            tokens.push(["INTEGER", parseInt(currentToken)]);
          }
    }

    while (tokens.length !== 1){
        let num1 = tokens[0][1];
        let op = tokens[1][1];
        let num2 = tokens[2][1];
        tokens = tokens.slice(3);
        tokens.unshift(["INTEGER", little_calculate(num1, op, num2)]);    
    }
    result = tokens[0][1];
    if (result === undefined) {
      document.getElementById("calculation").classList.add("invalid");
  } else {
      document.getElementById("calculation").classList.remove("invalid");
      document.getElementById("result").innerHTML = result;
  }
  
  }
  document.getElementById("calculation").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      document.getElementById("add-button").click();
    }
  });
