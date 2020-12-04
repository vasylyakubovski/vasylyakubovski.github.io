const word = `cat`;

const help = [
	`Домашня тварина`,
	`Ворог Джері`,
	`Має вуса`,
]
let play = true;

let help_used = 0;

alert(`Слово на ${word.length} буква.${help[0]}.`);

while( play ){
	
	const new_word = prompt(`Відгадайте слово`)
	
	if(new_word === word){play = false }
	
if(help_used < 2 && play){

		const need_help = confirm(`Чи потрібна підказка?`)
		
		if(need_help ){
			
			alert(`${help[help_used + 1]}`)
			help_used++
		}
	
}
	
	


}
alert(`Перемога`);

