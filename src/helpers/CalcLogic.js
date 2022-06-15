function isOperand(input){
    if(input === "+" || input === "-" || input === "*" || input === "/"){
    return true;
    }
    return false;
}

function isDecimalPoint(input){
    if(input === "."){
    return true;
    }
    return false;
}


function clearContent(){
  document.getElementById("calc-result").innerText = "0";
}

function identifyOperand(equation){
    if(equation.includes("+")) return "+";
    else if(equation.includes("-")) return "-";
    else if(equation.includes("*")) return "*";
    else if(equation.includes("/")) return "/";
    return "";
}

function getLeftNumber(operand){
  return document.getElementById("calc-result").innerText.split(operand)[0];
}

function getRightNumber(operand){
  return document.getElementById("calc-result").innerText.split(operand)[1];
}

function calculateResult(){
    const result = document.getElementById("calc-result");
    const output = result.innerText;
    if(output === null || output.length < 1){
      return;
    }
    const getOperand = identifyOperand(output);
    if(!getOperand){
      return;
    }
    let newResult = 0;
    const leftNumber = getLeftNumber(getOperand);
    const rightNumber = getRightNumber(getOperand);
    if(!leftNumber || !rightNumber) {
      return;
    }
    switch(getOperand){
      case "+": 
        newResult = parseFloat(leftNumber) + parseFloat(rightNumber);
        break; 
      case "-":
        newResult = parseFloat(leftNumber) - parseFloat(rightNumber); 
        break; 
      case "*": 
        newResult = parseFloat(leftNumber) * parseFloat(rightNumber);
        break; 
      case "/": 
        newResult = parseFloat(leftNumber) / parseFloat(rightNumber);
        break;
      default: break; 
    }
    if(isNaN(newResult) || newResult > Number.MAX_SAFE_INTEGER){
      result.innerText = "0";
      return;
    }
    // round number to 3 decimals
    newResult = +(Math.round(newResult + "e+3") + "e-3");
    result.innerText = newResult;
}

  
  function addToResult(inputKey){
    //to simplify getting variable result.innerText
    const result = document.getElementById("calc-result");
    const output = result.innerText;
    /**
     * initialize output with 0 in case output is a null
     */
    if(output === null || output.length < 1){
      result.innerText = "0" + inputKey;
      return;
    }
    /**
     * replace 0 with the input number
     */
    if(output === "0" && !isNaN(inputKey)){
      result.innerText = inputKey;
      return;
    }

    /**
     * if last letter is an operand then replace it with the input operand
     */
    if(
      (isOperand(output[output.length - 1]) && 
      isOperand(inputKey))) {
        result.innerText = output.slice(0, -1) + inputKey;
      return;
    }

    if(isDecimalPoint(inputKey) && isOperand(output[output.length - 1])){
      return;
    }

    const getOperand = identifyOperand(output);
    if(!getOperand && output.includes(".") && inputKey ==="."){
      return;
    }
    const leftNumber = getLeftNumber(getOperand);
    const rightNumber = getRightNumber(getOperand);
    //if user is trying to add more decimal point to the left number then return; 
    const leftNumberMoreDecimalPoint = !rightNumber && leftNumber.includes(".") && inputKey ===".";
    //if user is trying to add more decimal point to the right number then return; 
    const rightNumberMoreDecimalPoint = rightNumber && rightNumber.includes(".") && inputKey ===".";
    if(leftNumberMoreDecimalPoint || rightNumberMoreDecimalPoint){
      return;
    }


    /**
     * if operand exists in the equation and the input key is an operand then calculate the result before concatenating the operand.
     */
    if(getOperand && isOperand(inputKey)){
      calculateResult();
    }
    result.innerText += inputKey;
  }

  // function clickedBackspace(){
  //   const result = document.getElementById("calc-result");
  //   if(result.innerText.length === 1) {
  //     result.innerHTML = "0";
  //     return;
  //   }
  //   result.innerText =  result.innerText.slice(0, -1);
  // }

  // function keyPress(event){
  //   switch(event.keyCode){
  //     case 48: 
  //       addToResult("0");
  //       break;
  //     case 49: 
  //       addToResult("1");
  //       break;
  //     case 50: 
  //       addToResult("2");
  //       break;
  //     case 51: 
  //       addToResult("3");
  //       break;
  //     case 52: 
  //       addToResult("4");
  //       break;
  //     case 53: 
  //       addToResult("5");
  //       break;
  //     case 54: 
  //       addToResult("6");
  //       break;
  //     case 55: 
  //       addToResult("7");
  //       break;
  //     case 56: 
  //       addToResult("8");
  //       break;
  //     case 57: 
  //       addToResult("9");
  //       break;
  //     case 191: 
  //       addToResult("/");
  //       break;
  //     case 106: 
  //       addToResult("*");
  //       break;
  //     case 107: 
  //       addToResult("+");
  //       break;
  //     case 109: 
  //       addToResult("-");
  //       break;
  //     case 13: 
  //       calculateResult();
  //       break;
  //     case 8: 
  //       clickedBackspace();
  //       break;
  //     case 46: 
  //       clearContent();
  //       break;
  //     default: 
  //       break;
  //   }
  // }

export {clearContent, calculateResult, addToResult }