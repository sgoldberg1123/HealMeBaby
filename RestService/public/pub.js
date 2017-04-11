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

var fastLogin = function(){
  var email = 'Shortcut@shortcut.com';
  var password = 'Shortcut';
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
    }
  );
};

//Get user profile informtion and populate UI
var getUserInfo = function(){
  $.get('/user', function(res, status){
    if(res.status == 'FAILED'){
      console.log("Failed to get user info");
    }
    else{
      $("#email").val(res.data.email);
      $("#firstName").val(res.data.first_name);
      $("#lastName").val(res.data.last_name);
    }
  });
};

var getRecentUserSnapshot = function(){
  $.get('/user/healthsnapshot/recent', function(res, status){
    if(res.status == 'FAILED'){
      console.log("Get recent health snapshot failed!");
    }
    else{
      $("#weight").val(res.data[0].weight);
      $("#height").val(res.data[0].height);
      $("#bloodPressureSys").val(res.data[0].blood_pressure_systolic);
      $("#bloodPressureDist").val(res.data[0].blood_pressure_distolic);
      $("#heartRate").val(res.data[0].heart_rate);
    }
  });
};

//Delete a meal based on id then reload the meals table
var deleteMeal = function(meal_id){
  $.post('/user/meal/delete',
  {
    meal_id: meal_id
  },
  function(res, status){
    getAllUserMeals();
  });
};

var editMeal = function(meal_id){
  $.get('/meal',
  {
    meal_id: meal_id
  },
  function(res, status){
    var meal = res.data[0];
    var foodName = (meal.food_name) ? meal.food_name : "";
    var timestamp = (meal.timestamp) ? meal.timestamp : "";
    var calories = (meal.calories) ? meal.calories : 0;
    var sugar = (meal.sugar) ? meal.sugar : 0;
    var fat = (meal.fat) ? meal.fat : 0;
    var carb = (meal.carb) ? meal.carb : 0;
    var protein = (meal.protein) ? meal.protein : 0;
    var mealType = (meal.meal_type) ? meal.meal_type : "Snack";
    $("#editFoodName").val(foodName);
    $("#editCalories").val(calories);
    $("#editSugar").val(sugar);
    $("#editProtein").val(protein);
    $("#editFat").val(fat);
    $("#editMealType").val(mealType);
    $("#editCarb").val(carb);
    $("#editDate").val(timestamp);
    $("#editMealModal").modal('show');
  });
};

//Get all meals for a given user and populate the meals table with them
var getAllUserMeals = function(){
  $.get('/user/meal/all', function(res, status){
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
              <td><button class="btn btn-warning btn-sm" data-toggle="tooltip" title="Edit This Meal" onclick="editMeal(${meal.meal_id})"><span class="glyphicon glyphicon-pencil"></span></button></td>
              <td><button class="btn btn-danger btn-sm" data-toggle="tooltip" title="Delete This Meal" onclick="deleteMeal(${meal.meal_id})"><span class="glyphicon glyphicon-remove"></span></button></td>
            </tr>
            `
        );
      }
    }
  });
};

//Get all health snapshots for a user and populate the health history table with them
var getAllUserHealthSnapshots = function(){
  $.get('/user/healthsnapshot/all', function(res, status){
    if(res.status == 'FAILED'){
      console.log("Get healthsnapshots failed");
    }
    else{
      $("#healthHistoryTableBody").empty();
      for(var i = 0; i<res.data.length; i++){
        var snapshot = res.data[i];
        var height = (snapshot.height) ? snapshot.height : "N/a";
        var weight = (snapshot.weight) ? snapshot.weight : "N/a";
        var bloodPressureSys = (snapshot.blood_pressure_systolic) ? snapshot.blood_pressure_systolic : "N/a";
        var bloodPressureDist = (snapshot.blood_pressure_distolic) ? snapshot.blood_pressure_distolic : "N/a";
        var heartRate = (snapshot.heart_rate) ? snapshot.heart_rate : "N/a";

        $("#healthHistoryTableBody").append(
            `
            <tr>
              <td>${weight}</td>
              <td>${height}</td>
              <td>${bloodPressureSys}</td>
              <td>${bloodPressureDist}</td>
              <td>${heartRate}</td>
            </tr>
            `
        );
      }
    }
  });
};
