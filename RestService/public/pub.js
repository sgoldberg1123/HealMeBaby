//Insert a user into the database
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

//Login and create a session with the given information
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

//Get all meals for a given user
var getAllUserMeals = function(){
  $.get('/user/meals', function(res, status){
    if(res.status == 'FAILED'){
      console.log("Get meals failed");
    }
    else{
      $("#mealTableBody").empty();
      for(var i = 0; i<res.data.length; i++){
        $("#mealTableBody").append(
          /*"<tr>"+
            "<td>"+*/
            `
            <tr>
              <td>${res.data[i].food_name}</td>
              <td>${res.data[i].calories}</td>
              <td>${res.data[i].sugar}</td>
              <td>${res.data[i].fat}</td>
              <td>${res.data[i].carb}</td>
              <td>${res.data[i].protein}</td>
              <td>${res.data[i].meal_type}</td>
              <td>${res.data[i].timestamp}</td>
            </tr>
            `
        );
      }
    }
  });
};
