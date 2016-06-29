var input = process.argv;
var operand = input[2];
var num1 = input[3];
var num2 = input[4];

if (operand === 'add'){
	console.log(parseInt(num1) + parseInt(num2));
}

if (operand === 'multiply'){
	console.log(parseInt(num1) * parseInt(num2));
}

if (operand === 'divide'){
	console.log(parseInt(num1) / parseInt(num2));
}

if (operand === 'subtract'){
	console.log(parseInt(num1) - parseInt(num2));
}

if (operand === 'exp'){
	console.log(Math.pow(parseInt(num1),parseInt(num2)));
}

if (operand === 'algebra'){
	var total = num1.split('x').split('+').split('=');
	console.log(total);
}
