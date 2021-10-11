//Витягуємо дані
const users = [];
db.collection("users").get().then( function(res){
    res.forEach( function(dok){
        const user = dok.data();
        users.push(user)
    })
    console.log(users);
})

//Зберігаємо дані
function saveUser(){
    const new_user = {
        name: document.getElementById('name').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value
    };

    if(new_user.name.length == 0 || new_user.lastName.length == 0 || new_user.email.length == 0 ){ alert('Помилка'); return}

    db.collection("users").add(new_user).then( function(){
        console.log('user save');
    })
}