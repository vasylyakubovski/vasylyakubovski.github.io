const arr_1 = [];

let i = 0;

while( arr_1.length < 5){
	const num = Number ( prompt(`Введіть число.`));
	
	arr_1.push(num)
	
	
};

console.log(`Початковий масив - [ ${arr_1} ]`);

arr_1.sort()

console.log(`Масив в зростаючому порядку [${arr_1}]`);

arr_1.reverse()

console.log(`Масив в спадаючому порядку [${arr_1}]`);

