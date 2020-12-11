let user_name = 'Володя Зеленський';

let user_mail = 'vova2019@gmail.com';

let name = document.getElementById("name");

let block_1 = document.getElementById("block_1");

let login = true;

let hello ='';


if(login === true){
	hello = `Вітаю ${user_name}. На ваш email - <span class="red">${user_mail}</span> відправлено лист із підтверденням.`;
}else{
	
	hello	= `Будь ласка увійдіть у свій аккаунт, або створіть новий.`
	user_name = `<a href="#">Увійдіть</a>`; 
}
console.log(name);

name.innerHTML = user_name;
block_1.innerHTML = hello;