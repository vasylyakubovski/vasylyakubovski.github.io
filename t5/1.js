const name = prompt(`Як вас звати?`)

let total = 0;

let corect = 0;

const answer_1 = prompt(`2+2*2`);

if(answer_1 == 6 || answer_1 == '6.'){
	total ++
	corect ++
}
const answer_2 = prompt('Як звати мера Львова?')

if(answer_2 == 'Андрій' || answer_2 == 'андрій'){
	total ++
	corect ++
}
const answer_3 = prompt('Як звати призедента України?')

if(answer_3 == 'Володимир' || answer_3 == 'володимир'){
	total ++
	corect ++
}	
const answer_4 = prompt('Скільки мені років?')

if(answer_4 == 11 || answer_4 == '11.'){
	total ++
	corect ++
}	
const answer_5 = prompt('Скільки Messi років?')

if(answer_5 == 34 || answer_5 == '34.'){
	total ++
	corect ++
}	
const answer_6 = prompt('Яка найдовша річка Україна?')
	
if(answer_6 == 'Дніпро' || answer_6 == 'дніпро'){
	total = total + 2
	corect ++
}	
const answer_7 = prompt('Скільки областей в Україні?')

if(answer_7 == 24 || answer_7 == '24.'){
	total = total + 2
	corect ++
}	
const answer_8 = prompt('скільки днів в жовтні?')
	
if(answer_8 == 31 || answer_8 == '31.'){
	total ++
}
const answer_9 = confirm(`100*100=10000`)

if(answer_9 == true ){
	total ++
	corect ++
}	
const answer_10 = confirm(`6+6*6=36`)

if(answer_10 == false ){
	total ++
	corect ++
}	
if( total < 6 ){	
	alert(`Нажаль ${name} тест провалено.Ваш результат - ${total} ви відповіли на ${corect} запитань`)
}

else if( total >=6 && total <=9 ){	
	alert(`Вітаю ${name} задовільно.Ваш результат - ${total} ви відповіли на ${corect} запитань`)
}

else if( total >=10 ){
	alert(`Вітаю ${name} відмінно.ваш результат - ${total} ви відповіли на ${corect} запитань`)
}

else{
	alert(`Нажаль ${name} Помилка`)
}
