//==============================================================================
// runs on every page then determined by the url
$(document).ready(function(){
  var url = document.URL.replace(/^(?:\/\/|[^\/]+)*\//, "");
  var isLoggedin = checkLogin();
  if(isLoggedin) {
    var start = document.getElementById('loginButtonArea');
    clearInner(start);
    var logoutList = document.createElement('LI');
    start.appendChild(logoutList);
    var logoutButton = document.createElement('A');
    var thref = document.createAttribute('HREF');
    thref.value = '/';
    logoutButton.setAttributeNode(thref);
    var tonclick = document.createAttribute('onclick');
    tonclick.value = 'return logout();';
    logoutButton.setAttributeNode(tonclick);
    var txt = document.createTextNode('Logout');
    logoutButton.appendChild(txt);
    logoutList.appendChild(logoutButton);
  }

  if(url === ''){
    if(isLoggedin){
      sessionStorage.prevpage = '/';
      var welcome = document.getElementById('welcomeMessage');
      welcome.innerHTML = 'Welcome ' + sessionStorage.name;

      document.getElementById('loginButton').remove();
      document.getElementById('signupButton').remove();
    }
  } else if(url == 'login'){
    if(isLoggedin){
      window.location.href = '/';
    }
  } else if(url == 'signup'){
    if(isLoggedin){
      window.location.href = '/';
    }
  } else if(url == 'profile'){
    if(!isLoggedin){
      sessionStorage.prevpage = '/profile';
      window.location.href = '/login';
    }
  } else if(url == 'health'){
    if(!isLoggedin){
      sessionStorage.prevpage = '/profile';
      window.location.href = '/login';
    }
  } else if(url == 'meals'){
    if(!isLoggedin){
      sessionStorage.prevpage = '/profile';
      window.location.href = '/login';
    }
  } else if(url == 'activities'){
    if(!isLoggedin){
      sessionStorage.prevpage = '/profile';
      window.location.href = '/login';
    }
  }
});

//=============================================================================
//helper functions
var clearInner = function(node) {
  while (node.hasChildNodes()) {
    clear(node.firstChild);
  }
};

var clear = function(node) {
  while (node.hasChildNodes()) {
    clear(node.firstChild);
  }
  node.parentNode.removeChild(node);
};

var checkLogin = function(){
  if(sessionStorage.token && sessionStorage.name){
    return true;
  } else{
    return false;
  }
};

var logout = function(){
  sessionStorage.clear();
  return true;
};

//==============================================================================
// Data getters/setters
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
  $.post('/api/user/signup',
  data,
  function(data, status){
    if(data.status){
      sessionStorage.name = data.firstName;
      sessionStorage.token = data.token;
      window.location.href = '/';
    } else{
      $('#warningDiv')[0].innerHTML = 'Warning: Not using SSL/TLS<br />' + data.error;
    }
  });
};

//Login and create a session with the given information
var login = function(){
  var email = $('#emailLogin')[0].value;
  var password = $('#passwordLogin')[0].value;
  console.log('its running');
  var data = {
    email: email,
    password: password
  };
  $.post('/api/user/login',
  data,
  function(data, status){
    if(data.status){
      sessionStorage.name = data.firstName;
      sessionStorage.token = data.token;
      if(sessionStorage.prevpage){
        window.location.href = sessionStorage.prevpage;
      } else {
        window.location.href = '/';
      }
    } else{
      $('#warningDiv')[0].innerHTML = 'Warning: Not using SSL/TLS<br />' + data.error;
      return false;
    }
  });
};

//fast login for development
var fastLogin = function(){
  var email = 'Shortcut@shortcut.com';
  var password = 'Shortcut';
  var data = {
    email: email,
    password: password
  };
  $.post('/api/user/login',
  data,
  function(data, status){
    if(data.status){
      console.log(data);
      sessionStorage.name = data.firstName;
      sessionStorage.token = data.token;
      if(sessionStorage.prevpage){
        window.location.href = sessionStorage.prevpage;
      } else {
        window.location.href = '/';
      }
    } else{
      console.log('Failed to log in');
    }
  });
};

//Get user profile informtion and populate UI
var getUserInfo = function(){
  var data = {
    JWT: sessionStorage.token
  };
  $.post('/api/user', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Failed to get user info");
    } else if (res.error){
      console.log(res.error);
    } else{
      $("#email").val(res.data.email);
      $("#firstName").val(res.data.first_name);
      $("#lastName").val(res.data.last_name);
      sessionStorage.name = res.data.first_name;
    }
  });
};

//update user info
var updateUserInfo = function(){
  var email = $('#email')[0].value;
  var fName = $('#firstName')[0].value;
  var lName = $("#lastName")[0].value;

  var data = {
    JWT: sessionStorage.token,
    email: email,
    firstName: fName,
    lastName: lName
  };
  $.post('/api/user/update', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Failed to get user info");
    }
    else{
      getUserInfo();
    }
  });
};

//get the most recent snapshot for a user
var getRecentUserSnapshot = function(){
  var data = {
    JWT: sessionStorage.token
  };
  $.post('/api/snapshot/recent', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Get recent health snapshot failed!");
    } else if (res.error){
      console.log("Didn't find user snapshot")
    } else{
      $("#weight").val(res.data.weight);
      $("#height").val(res.data.height);
      $("#bloodPressureSys").val(res.data.blood_pressure_systolic);
      $("#bloodPressureDist").val(res.data.blood_pressure_distolic);
      $("#heartRate").val(res.data.heart_rate);
    }
  });
};

//insert a new snapshot
var insertSnapshot = function(){
  var weight = $('#weight')[0].value;
  var height = $('#height')[0].value;
  var bloodPressureSys = $("#bloodPressureSys")[0].value;
  var bloodPressureDist = $("#bloodPressureDist")[0].value;
  var heartRate = $("#heartRate")[0].value;
  var data = {
    JWT: sessionStorage.token,
    weight: weight,
    height: height,
    bloodPressureSys: bloodPressureSys,
    bloodPressureDist: bloodPressureDist,
    heartRate: heartRate
  };
  $.post('/api/snapshot/insert', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Failed to get user info");
    }
    else{
      getRecentUserSnapshot();
    }
  });
};

//get all snapshots for a user
var getAllUserHealthSnapshots = function(){
  var data = {
    JWT: sessionStorage.token
  };
  $.post('/api/snapshot/all', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Get healthsnapshots failed");
    }
    else{
      $("#healthHistoryTableBody").empty();
      for(var i = 0; i<res.data.length; i++){
        var snapshot = res.data[i];
        var id = snapshot.health_snapshot_id
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
              <td><button class="btn btn-warning btn-sm" data-toggle="tooltip" title="Edit This Health Snapshot" onclick="editSnapshot(${id})"><span class="glyphicon glyphicon-pencil"></span></button></td>
              <td><button class="btn btn-danger btn-sm" data-toggle="tooltip" title="Delete This Health Snapshot" onclick="deleteSnapshot(${id})"><span class="glyphicon glyphicon-remove"></span></button></td>
            </tr>
            `
        );
      }
    }
  });
};

//get all the meals for a user
var getAllUserMeals = function(){
  var data = {
    JWT: sessionStorage.token
  };
  $.post('/api/meal/all', data, function(res, status){
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

//edit a meal item - retrieve info
var editMeal = function(meal_id){
  $.post('/api/meal',
  {
    meal_id: meal_id,
    JWT: sessionStorage.token
  },
  function(res, status){
    var meal = res.data;
    var id = (meal.meal_id);
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
    $("#editMealId").val(id);
    $("#editMealModal").modal('show');
  });
};

//edit a meal - submit new data
var editMealSubmit = function(){
  var data = {
    JWT: sessionStorage.token,
    meal_id: $('#editMealId')[0].value,
    calories: $('#editCalories')[0].value,
    foodName: $('#editFoodName')[0].value,
    sugar: $('#editSugar')[0].value,
    date: $('#editDate')[0].value,
    protein: $('#editProtein')[0].value,
    fat: $('#editFat')[0].value,
    mealType: $('#editMealType')[0].value,
    carb: $('#editCarb')[0].value
  };
  $.post('/api/meal/update', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Get meals failed");
    }
    else{
      $('#editMealModal').modal('hide');
      getAllUserMeals();
    }
  });
};

//add a new food item
var newMealSubmit = function(){
  var data = {
    JWT: sessionStorage.token,
    calories: $('#calories')[0].value,
    foodName: $('#foodName')[0].value,
    sugar: $('#sugar')[0].value,
    date: $('#date')[0].value,
    protein: $('#protein')[0].value,
    fat: $('#fat')[0].value,
    mealType: $('#mealType')[0].value,
    carb: $('#carb')[0].value
  };
  $.post('/api/meal/insert', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Get meals failed");
    }
    else{
      $('#addMealModal').modal('hide');
      getAllUserMeals();
    }
  });
};

//delete a meal
var deleteMeal = function(meal_id){
  var r = confirm("Are you sure you want to delete this meal?");
  if(r){
    $.post('/api/meal/delete',
    {
      meal_id: meal_id,
      JWT: sessionStorage.token
    },
    function(res, status){
      if(res.status == 'FAILED'){
        console.log("Get meals failed");
      }
      else{
        if(r){
          getAllUserMeals();
        }
      }
    });
  }
};


var getMealsForCharting = function(){
    var data = {
      JWT: sessionStorage.token
    };
  $.post('/api/meal/all', data, function(res, status){
    if(res.status == 'FAILED'){
      console.info("Get meals failed");
    }
    else{
        TESTER = document.getElementById('tester');
        var x_date = [];
        var y_cal = [];
        var y_sugar = [];
        var y_fat = [];
        var y_carb = [];
        var y_protein = [];

        for(var i = 0; i<res.data.length; i++){
            var meal = res.data[i];
            var test = false;
            for(var j =0; j<x_date.length; j++){
                if(x_date[j] == JSON.stringify(meal.timestamp)){
                    test = true;
                    y_cal[j] += meal.calories;
                    y_sugar[j] += meal.sugar;
                    y_fat[j] += meal.fat;
                    y_carb[j] += meal.carb;
                    y_protein[j] += meal.protein;
                    break;
                }
            }
            if(test){
                continue;
            }
            x_date.push(JSON.stringify(meal.timestamp));
            y_cal.push(meal.calories);
            y_sugar.push(meal.sugar);
            y_fat.push(meal.fat);
            y_carb.push(meal.carb);
            y_protein.push(meal.protein);


        }
        console.info(x_date);
        var calories = {
            x: x_date,
        	y: y_cal,
            name: 'calories',
            type: 'scatter'
        };
        var sugar = {
            x: x_date,
        	y: y_sugar,
            name: 'sugar',
            type: 'scatter'
        };
        var carbs = {
            x: x_date,
        	y: y_carb,
            name: 'carbs',
            type: 'scatter'
        };
        var fat = {
            x: x_date,
        	y: y_fat,
            name: 'fat',
            type: 'scatter'
        };
        var protein = {
            x: x_date,
        	y: y_protein,
            name: 'protein',
            type: 'scatter'
        };
        var data = [calories, sugar, carbs, fat, protein];
    	Plotly.plot( TESTER, data );
    }
  });
};

//Delete a health snapshot by id
var deleteSnapshot = function(snapshot_id){
  var r = confirm("Are you sure you want to delete this health snapshot");
  if(r){
    $.post('/api/snapshot/delete',
    {
      snapshot_id: snapshot_id,
      JWT: sessionStorage.token
    },
    function(res, status){
      if(res.status == 'FAILED'){
        console.log('Snapshot deletion failed');
      }
      else{
        if(r){
          getAllUserHealthSnapshots();
        }
      }
    });
  }
};

//edit a snapshot - retrieve info
var editSnapshot = function(snapshot_id){
  $.post('/api/snapshot',
  {
    snapshot_id: snapshot_id,
    JWT: sessionStorage.token
  },
  function(res, status){
    var snapshot = res.data;
    var id = snapshot.health_snapshot_id
    var height = (snapshot.height) ? snapshot.height : "N/a";
    var weight = (snapshot.weight) ? snapshot.weight : "N/a";
    var bloodPressureSys = (snapshot.blood_pressure_systolic) ? snapshot.blood_pressure_systolic : "N/a";
    var bloodPressureDist = (snapshot.blood_pressure_distolic) ? snapshot.blood_pressure_distolic : "N/a";
    var heartRate = (snapshot.heart_rate) ? snapshot.heart_rate : "N/a";
    $("#editSnapshotHeight").val(height);
    $("#editSnapshotWeight").val(weight);
    $("#editSnapshotBloodPressureSys").val(bloodPressureSys);
    $("#editSnapshotBloodPressureDist").val(bloodPressureDist);
    $("#editSnapshotHeartRate").val(heartRate);
    $("#editSnapshotId").val(id);
    $("#editSnapshotModal").modal('show');
  });
};

//edit a meal - submit new data
var editSnapshotSubmit = function(){
  var data = {
    JWT: sessionStorage.token,
    snapshot_id: $('#editSnapshotId')[0].value,
    height: $('#editSnapshotHeight')[0].value,
    weight: $('#editSnapshotWeight')[0].value,
    blood_pressure_systolic: $('#editSnapshotBloodPressureSys')[0].value,
    blood_pressure_distolic: $('#editSnapshotBloodPressureDist')[0].value,
    heart_rate: $('#editSnapshotHeartRate')[0].value,
  };
  $.post('/api/snapshot/update', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Update snapshot failed");
    }
    else{
      $('#editSnapshotModal').modal('hide');
      getAllUserHealthSnapshots();
    }
  });
};

//Gets all sport options and sets autocomplete for the activity name add and edit modals
var getAllSports = function(){
  var data = {
    JWT: sessionStorage.token
  };
  $.post('/api/sport/all', data, function(res, status){
    $( "#editActivityName" ).autocomplete({
      source: res.data
    });
    $( "#activityName" ).autocomplete({
      source: res.data
    });
  });
};

//get all activites for a given user and load
//get all the meals for a user
var getAllUserActivities = function(){
  var data = {
    JWT: sessionStorage.token
  };
  $.post('/api/workout/all', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Get meals failed");
    }
    else{
      $("#activityTableBody").empty();
      for(var i = 0; i<res.data.length; i++){
        var activity = res.data[i];
        var id = activity.workout_id;
        var name = (activity.name) ? activity.name : "N/a";
        var intensity = (activity.intensity) ? activity.intensity : "N/a";
        var caloriesBurnt = (activity.calorie_burn) ? activity.calorie_burn : "N/a";
        var timestamp = (activity.timestamp) ? activity.timestamp : "N/a";
        var length = (activity.length) ? activity.length : "N/a";
        $("#activityTableBody").append(
            `
            <tr>
              <td>${name}</td>
              <td>${intensity}</td>
              <td>${caloriesBurnt}</td>
              <td>${timestamp}</td>
              <td>${length}</td>
              <td><button class="btn btn-warning btn-sm" data-toggle="tooltip" title="Edit This Activity" onclick="editActivity(${id})"><span class="glyphicon glyphicon-pencil"></span></button></td>
              <td><button class="btn btn-danger btn-sm" data-toggle="tooltip" title="Delete This Meal" onclick="deleteActivity(${id})"><span class="glyphicon glyphicon-remove"></span></button></td>
            </tr>
            `
        );
      }
    }
  });
};

//add a new activity item
var newActivitySubmit = function(){
  var data = {
    JWT: sessionStorage.token,
    name: $('#activityName')[0].value,
    intensity: $('#intensity')[0].value,
    calorieBurn: $('#caloriesBurnt')[0].value,
    timestamp: $('#date')[0].value,
    length: $('#length')[0].value,
  };
  $.post('/api/workout/insert', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Insert activity failed");
    }
    else{
      $('#addActivityModal').modal('hide');
      getAllUserActivities();
    }
  });
};

//edit a activity- retrieve info
var editActivity = function(workout_id){
  $.post('/api/workout',
  {
    workout_id: workout_id,
    JWT: sessionStorage.token
  },
  function(res, status){
    var activity = res.data;
    var id = activity.workout_id;
    var name = (activity.name) ? activity.name : "N/a";
    var intensity = (activity.intensity) ? activity.intensity : "N/a";
    var caloriesBurnt = (activity.calorie_burn) ? activity.calorie_burn : "N/a";
    var timestamp = (activity.timestamp) ? activity.timestamp : "N/a";
    var length = (activity.length) ? activity.length : "N/a";
    $("#editActivityName").val(name);
    $("#editIntensity").val(intensity);
    $("#editCaloriesBurnt").val(caloriesBurnt);
    $("#editLength").val(length);
    $("#editDate").val(timestamp);
    $("#editActivityId").val(id);
    $('#editActivityModal').modal('show');
  });
};

//Submit the edited activity form
var editActivitySubmit = function(){
  var data = {
    JWT: sessionStorage.token,
    workout_id:$('#editActivityId')[0].value,
    name: $('#editActivityName')[0].value,
    intensity: $('#editIntensity')[0].value,
    calorieBurn: $('#editCaloriesBurnt')[0].value,
    timestamp: $('#editDate')[0].value,
    length: $('#editLength')[0].value
  };
  $.post('/api/workout/update', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Update activity failed");
    }
    else{
      $('#editActivityModal').modal('hide');
      getAllUserActivities();
    }
  });
};

//Delete an activity by id
var deleteActivity = function(activity_id){
  var r = confirm("Are you sure you want to delete this activity");
  if(r){
    $.post('/api/workout/delete',
    {
      workout_id: activity_id,
      JWT: sessionStorage.token
    },
    function(res, status){
      if(res.status == 'FAILED'){
        console.log('Activity deletion failed');
      }
      else{
        if(r){
          getAllUserActivities();
        }
      }
    });
  }
};

