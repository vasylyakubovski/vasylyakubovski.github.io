const user =`Vasyl`;

const email =`vasyl@gmail.com`;

const password =12345678;

const new_email = prompt(`Введіть свій email`);

if( new_email == email ) {
	
const new_password = prompt(`Введіть пароль для акаунту корстувача Vasyl`);

if( new_password == password ){
alert(`Вітаю ${user}`);}
	else{
		
		alert(`Невірний пароль`)
	}
	
}else{
	
	alert(`Користувача з таким email не інсує`);
	
}

