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
    $.post('/signup',
    data,
    function(data, status){
        console.log(data);
    });
};

var login = function(){
    var email = $('#emailLogin')[0].value;
    var password = $('#passwordLogin')[0].value;
    var data = {
	email: email,
	password: password
    };
    $.post('/login',
    data,
    function(data, status){
        if(data.length > 0){
		console.log('Found User');
	}else{
		console.log('User Not Found');
	}
    });
};
