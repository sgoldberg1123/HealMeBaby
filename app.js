var insert = function(){
    var firstName = $('#firstNameInsert')[0].value;
    var lastName = $('#lastNameInsert')[0].value;
    var email = $('#emailInsert')[0].value;
    var password = $('#passwordInsert')[0].value;
    var data = {
        firstName: firstName,
	email: email,
	lastName: lastName,
	password: password
    };
    $.post('http://192.168.56.101/api/user/insert',
    data,
    function(data, status){
        alert(data);
    });
};

var login = function(){
    var email = $('#emailLogin')[0].value;
    var password = $('#passwordLogin')[0].value;
    var data = {
	email: email,
	password: password
    };
    $.post('http://192.168.56.101/api/user/login',
    data,
    function(data, status){
        if(data.length > 0){
		alert('Found User');
	}else{
		alert('User Not Found');
	}
    });
};