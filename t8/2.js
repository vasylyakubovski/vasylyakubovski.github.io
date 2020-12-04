let total = 0;

let produkts = 0;

let buy = true;

while( buy ){
	
	
	const price = Number ( prompt(`Введіть ціну товару.`));
	
	total += price;
	
	produkts++;
	buy = confirm(`Продовжити покупки?`)
	
}
const mod = total / produkts;

console.log(`Ви придбали ${produkts} товарів на загальну вартість - ${total} грн. Середня ціна  ${mod}`);



