let admin = JSON.parse( localStorage.getItem('admin'));

if( admin === true ){
    window.location = 'admin-edit.html';
}

function adminLogin(){

    const adminPassword = document.getElementById('adminPassword').value;
    
    if(adminPassword === "12345"){
        displayMessage('message-success', 'Admin', 'Успішний вхід!', 4000);
        document.getElementById('adminPassword').value = "";

        localStorage.setItem('admin', JSON.stringify(true));

        setTimeout(function(){
            window.location = 'admin-edit.html'
        }, 4500);
       
    }else{
        displayMessage('message-error', 'Admin', 'НЕ вірний пароль!', 4000);
        document.getElementById('adminPassword').value = "";
    }
}