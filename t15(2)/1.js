function sayHi(){
	alert("Привіт!");
}

sayHi();

function greeting(name){

alert(`Привіт я ${name}!`);
}
greeting("Іван");

function showGreeting(name){
	
	const test = document.getElementById("test");
	
	test.innerText = `Привіт  ${name}`;
}

showGreeting("Тарас");