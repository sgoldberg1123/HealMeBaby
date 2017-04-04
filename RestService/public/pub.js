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
        var meal = res.data[i];
        var foodName = (meal.food_name) ? meal.food_name : "N/a";
        var timestamp = (meal.timestamp) ? meal.timestamp : "N/a";
        var calories = (meal.calories) ? meal.calories : "N/a";
        var sugar = (meal.sugar) ? meal.sugar : "N/a";
        var fat = (meal.fat) ? meal.fat : "N/a";
        var carb = (meal.carb) ? meal.carb : "N/a";
        var protein = (meal.protein) ? meal.protein : "N/a";
        var mealType = (meal.meal_type) ? meal.meal_type : "N/a";
        $("#mealTableBody").append(
            `
            <tr>
              <td>${foodName}</td>
              <td>${calories}</td>
              <td>${sugar}</td>
              <td>${fat}</td>
              <td>${carb}</td>
              <td>${protein}</td>
              <td>${mealType}</td>
              <td>${timestamp}</td>
            </tr>
            `
        );
      }
    }
  });
};
