//get all activites for a given user and load
//get all the meals for a user
var getAllUserLifts = function(){
    var data = {
    JWT: sessionStorage.token
    };
    $.post('/api/lift/all', data, function(res, status){
    if(res.status == 'FAILED'){
        console.log("Get lifts failed");
    }
    else{
        console.info(res.data);
        $("#LiftTableBody").empty();
        for(var i = 0; i<res.data.length; i++){
        var lift = res.data[i];
        var gymactivity_id = lift.gym_activity_id;
        var name = (lift.name) ? lift.name : "N/a";
        var reps = (lift.reps) ? lift.reps : "N/a";
        var weight = (lift.weight) ? lift.weight : "N/a";
        var days = (lift.days) ? lift.days : "N/a";
        var length = (lift.length) ? lift.length : "N/a";
        $("#LiftTableBody").append(
            `
            <tr>
                <td>${name}</td>
                <td>${reps}</td>
                <td>${weight}</td>
                <td>${days}</td>

                <td><button class="btn btn-warning btn-sm" data-toggle="tooltip" title="Edit This Lift" onclick="editLift(${gymactivity_id})"><span class="glyphicon glyphicon-pencil"></span></button></td>
                <td><button class="btn btn-danger btn-sm" data-toggle="tooltip" title="Delete This Meal" onclick="deleteLift(${gymactivity_id})"><span class="glyphicon glyphicon-remove"></span></button></td>
            </tr>
            `
        );
        }
    }
    });
};

//add a new activity item
var newLiftSubmit = function(){
  var data = {
    JWT: sessionStorage.token,
    name: $('#liftName')[0].value,
    reps: $('#reps')[0].value,
    weight: $('#weight')[0].value,
    days: $('#days')[0].value
  };
  if(days == 1){
      days = "Sunday";
  }
  else if (days == 2) {
      days = "Monday";
  } 
  else if(days == 3) {
      days = "Tuesday";
  }
  else if(days == 4){
      days = "Wednesday";
  }
  else if(days == 5){
      days = "Thursday";
  }
  else if(days == 6){
      days = "Friday";
  }
  else if(days == 7){
      days = "Saturday";
  }
  $.post('/api/lift/insert', data, function(res, status){
    if(res.status == 'FAILED'){
        console.log(data);
        console.log(res.error);
        console.log("Insert lift failed(liftScript.js)");
    }
    else{
        console.info(data);
      $('#addLiftModal').modal('hide');
      getAllUserLifts();
    }
  });
};

var editLift = function(gymactivity_id){
    $.post('/api/lift',
    {
        gymactivity_id: gymactivity_id,
        JWT: sessionStorage.token
    },
    function(res, status){
        var gymactivity = res.data;
        var id = gymactivity.gym_activity_id;
        var name = (gymactivity.name) ? gymactivity.name : "";
        var reps = (gymactivity.reps) ? gymactivity.reps : "";
        var weight = (gymactivity.weight) ? gymactivity.weight : "";
        var days = (gymactivity.days) ? gymactivity.days : "";
        console.info("id", id);
        $("#editName").val(name);
        $("#editReps").val(reps);
        $("#editWeight").val(weight);
        $("#editDays").val(days);
        $("#editLiftId").val(id);
        $("#editLiftModal").modal('show');
    });
};

//Submit the edited activity form
var editLiftSubmit = function(){
  var data = {
    JWT: sessionStorage.token,
    gymactivity_id: parseInt($('#editLiftId')[0].value),
    name: $('#editName')[0].value,
    reps: $('#editReps')[0].value,
    weight: $('#editWeight')[0].value,
    days: $('#editDays')[0].value
  };
  if(data.days == "Sunday"){
      data.days = parseInt("1");
  }
  console.info(data);
  $.post('/api/lift/update', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Update lift failed");
      console.info(res.error);
    }
    else{
      $('#editLiftModal').modal('hide');
      getAllUserLifts();
    }
  });
};

//delete a meal
var deleteLift = function(gymactivityId){
    $.post('/api/lift/delete',
    {
      gymactivity_id: gymactivityId,
      JWT: sessionStorage.token
    },
    function(res, status){
      if(res.status == 'FAILED'){
        console.log("Get Lifts failed");
        console.log(res.error);
      }
      else{
          getAllUserLifts();
        
      }
    });
};

var liftCalendar = function(){
    var data = {
    JWT: sessionStorage.token
    };
    $.post('/api/lift/all', data, function(res, status){
    if(res.status == 'FAILED'){
        console.log("Get lifts failed");
    }
    else{
        console.info(res.data);
        for(var i = 0; i<res.data.length; i++){
            var lift = res.data[i];
            var gymactivity_id = lift.gym_activity_id;
            var name = (lift.name) ? lift.name : "N/a";
            var days = (lift.days) ? lift.days : "N/a";
            if( days == "Sunday"){
                $("#SunCal").append(`<h3>${name}</h3>`);
            }
            if( days == "Monday"){
                $("#MonCal").append(`<h3>${name}</h3>`);
            }
            if( days == "Tuesday"){
                $("#TuesCal").append(`<h3>${name}</h3>`);
            }
            if( days == "Wednesday"){
                $("#WedCal").append(`<h3>${name}</h3>`);
            }
            if( days == "Thursda"){
                $("#ThursCal").append(`<h3>${name}</h3>`);
            }
            if( days == "Friday"){
                $("#fridCal").append(`<h3>${name}</h3>`);
            }
            if( days == "Saturday"){
                $("#SatCal").append(`<h3>${name}</h3>`);
            }
        }
    }
    });
};