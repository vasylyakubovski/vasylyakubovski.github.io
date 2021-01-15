const user ={
	name:"Петро",
	lastName:"Іванов",
	age:17,
	email:"PetroIvanov@gmail.com",
	city:"Львів",
}
function shovUser(){
	
	const user_data = document.getElementById("user_data");
	
	user_data.innerHTML = `
	
	<tr>
		<td>${user.name}</td>
		<td>${user.lastName}</td>
		<td>${user.age}</td>
		<td>${user.email}</td>
		<td>${user.city}</td>
	</tr>
	`;
}

shovUser();

function changeName(new_name){
	
	user.name = new_name;
	shovUser();
}

function changeLastName(new_LastName){
	
	user.LastName = new_LastName;
	shovUser();
}
function changeAge(new_age){
	
	user.age = new_age;
	shovUser();
}
function changeEmail(new_email){
	
	user.email = new_email;
	shovUser();
}
function changeCity(new_city){
	
	user.city = new_city;
	shovUser();
}
function changeUserData(new_name, new_LastName, new_age, new_email, new_city){
	
	user.name = new_name;
	user.lastName = new_LastName;
	user.age = new_age;
	user.email = new_email;
	user.city = new_city;
	shovUser();
}
changeUserData("Оля","Шевчишин",40,"olia@gmail.com","Київ");